import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const dishFormSchema = z.object({
  name: z.string().min(1, "Dish name is required"),
  weight: z.string().min(1, "Weight/serving size is required"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  prepTime: z.string().optional(),
});

type DishFormValues = z.infer<typeof dishFormSchema>;

export default function UploadDish() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<DishFormValues>({
    resolver: zodResolver(dishFormSchema),
    defaultValues: {
      name: "",
      weight: "",
      price: "",
      category: "",
      description: "",
      prepTime: "",
    },
  });

  const uploadDishMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/dishes", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload dish");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dishes"] });
      toast({
        title: "Success!",
        description: "Dish uploaded successfully",
      });
      form.reset();
      setImagePreview(null);
      setSelectedFile(null);
      setTimeout(() => {
        setLocation("/");
      }, 1000);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to upload dish. Please try again.",
        variant: "destructive",
      });
      console.error("Upload error:", error);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
  };

  const onSubmit = (data: DishFormValues) => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", data.name);
    formData.append("weight", data.weight);
    formData.append("price", data.price);
    formData.append("category", data.category);
    if (data.description) {
      formData.append("description", data.description);
    }
    if (data.prepTime) {
      formData.append("prepTime", data.prepTime);
    }

    uploadDishMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 bg-background">
        <div className="max-w-2xl mx-auto px-6">
          <div className="mb-8">
            <Link href="/" data-testid="link-back-home">
              <span className="text-primary hover-elevate active-elevate-2 px-3 py-2 rounded-md inline-block">
                ← Back to Menu
              </span>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-4xl">Add New Dish</CardTitle>
              <p className="text-muted-foreground">Upload a new dish to your restaurant menu</p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <FormLabel>Dish Image *</FormLabel>
                    <div className="mt-2">
                      {!imagePreview ? (
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover-elevate active-elevate-2"
                          data-testid="label-image-upload"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, JPEG (Square 1:1 ratio recommended)</p>
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                            data-testid="input-image"
                          />
                        </label>
                      ) : (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-lg"
                            data-testid="img-preview"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2"
                            onClick={removeImage}
                            data-testid="button-remove-image"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dish Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Chicken Biryani" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight/Serving Size *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 500g or 1 Plate" {...field} data-testid="input-weight" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Rs. 450" {...field} data-testid="input-price" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Appetizer">Appetizer</SelectItem>
                            <SelectItem value="Main Course">Main Course</SelectItem>
                            <SelectItem value="Bread">Bread</SelectItem>
                            <SelectItem value="Dessert">Dessert</SelectItem>
                            <SelectItem value="Beverage">Beverage</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preparation Time (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 30 mins or 1 hour" {...field} data-testid="input-preptime" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of the dish..."
                            className="resize-none h-32"
                            {...field}
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="flex-1" 
                      data-testid="button-publish"
                      disabled={uploadDishMutation.isPending}
                    >
                      {uploadDishMutation.isPending ? "Uploading..." : "Publish Dish"}
                    </Button>
                    <Link href="/">
                      <Button 
                        type="button" 
                        size="lg" 
                        variant="outline" 
                        data-testid="button-cancel"
                        disabled={uploadDishMutation.isPending}
                      >
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
