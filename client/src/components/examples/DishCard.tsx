import DishCard from '../DishCard';
import karahiImage from '@assets/generated_images/Karahi_chicken_dish_c0bc5d4e.png';

export default function DishCardExample() {
  const mockDish = {
    id: '1',
    name: 'Chicken Karahi',
    weight: '500g',
    price: 'Rs. 850',
    category: 'Main Course',
    description: 'Traditional chicken karahi cooked with tomatoes, green chilies, and aromatic spices',
    imageUrl: karahiImage
  };

  return (
    <div className="p-8 max-w-sm">
      <DishCard dish={mockDish} />
    </div>
  );
}
