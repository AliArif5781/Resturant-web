import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { getAllDishes, addDish } from "./firebase";
import cloudinary from "./cloudinary";
import { insertDishSchema } from "@shared/schema";

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all dishes
  app.get("/api/dishes", async (req, res) => {
    try {
      const dishes = await getAllDishes();
      res.json(dishes);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      res.status(500).json({ error: "Failed to fetch dishes" });
    }
  });

  // Upload dish with image
  app.post("/api/dishes", upload.single("image"), async (req, res) => {
    try {
      // Check for image first
      if (!req.file) {
        return res.status(400).json({ error: "Image is required" });
      }

      const { name, weight, price, category, description, prepTime } = req.body;

      // Convert buffer to base64 and upload to Cloudinary
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "restaurant_dishes",
        resource_type: "auto",
      });

      if (!result.secure_url) {
        return res.status(500).json({ error: "Failed to upload image to Cloudinary" });
      }

      // Now validate with the actual Cloudinary URL
      const validatedData = insertDishSchema.parse({
        name,
        weight,
        price,
        category,
        description: description || undefined,
        prepTime: prepTime || undefined,
        imageUrl: result.secure_url,
      });

      // Save to Firebase
      const newDish = await addDish(validatedData);
      res.status(201).json(newDish);
    } catch (error) {
      console.error("Error creating dish:", error);
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({ error: "Invalid dish data", details: error });
      }
      res.status(500).json({ error: "Failed to create dish" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
