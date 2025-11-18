import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export interface Dish {
  id: string;
  name: string;
  weight: string;
  price: string;
  category: string;
  description?: string;
  prepTime?: string;
  imageUrl: string;
}

interface DishCardProps {
  dish: Dish;
}

export default function DishCard({ dish }: DishCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(dish);
    toast({
      title: "Added to cart",
      description: `${dish.name} has been added to your cart`,
    });
  };
  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2" data-testid={`card-dish-${dish.id}`}>
      <div className="relative aspect-square overflow-hidden">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          data-testid={`img-dish-${dish.id}`}
        />
        <Badge
          className="absolute top-3 right-3"
          variant="secondary"
          data-testid={`badge-category-${dish.id}`}
        >
          {dish.category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-serif text-2xl font-medium mb-2" data-testid={`text-dish-name-${dish.id}`}>
          {dish.name}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground" data-testid={`text-weight-${dish.id}`}>
            {dish.weight}
          </span>
          <span className="text-xl font-semibold text-primary" data-testid={`text-price-${dish.id}`}>
            {dish.price}
          </span>
        </div>
        {dish.prepTime && (
          <div className="flex items-center gap-1 mb-2 text-sm text-muted-foreground" data-testid={`text-preptime-${dish.id}`}>
            <Clock className="w-4 h-4" />
            <span>{dish.prepTime}</span>
          </div>
        )}
        {dish.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4" data-testid={`text-description-${dish.id}`}>
            {dish.description}
          </p>
        )}
        <Button 
          onClick={handleAddToCart}
          className="w-full mt-4" 
          data-testid={`button-add-to-cart-${dish.id}`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
