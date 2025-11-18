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
      const { name, weight, price, category, description } = req.body;
      
      // Validate input
      const validatedData = insertDishSchema.parse({
        name,
        weight,
        price,
        category,
        description: description || undefined,
        imageUrl: "", // Will be set after Cloudinary upload
      });

      // Upload image to Cloudinary
      if (!req.file) {
        return res.status(400).json({ error: "Image is required" });
      }

      // Convert buffer to base64
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "restaurant_dishes",
        resource_type: "auto",
      });

      // Save to Firebase with Cloudinary URL
      const dishData = {
        ...validatedData,
        imageUrl: result.secure_url,
      };

      const newDish = await addDish(dishData);
      res.status(201).json(newDish);
    } catch (error) {
      console.error("Error creating dish:", error);
      res.status(500).json({ error: "Failed to create dish" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
