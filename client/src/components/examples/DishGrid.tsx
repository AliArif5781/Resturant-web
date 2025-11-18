import DishGrid from '../DishGrid';
import karahiImage from '@assets/generated_images/Karahi_chicken_dish_c0bc5d4e.png';
import biryaniImage from '@assets/generated_images/Chicken_biryani_bowl_77698c6f.png';
import butterChickenImage from '@assets/generated_images/Butter_chicken_dish_11e4ba93.png';
import kebabsImage from '@assets/generated_images/Seekh_kebabs_plate_a2552ef8.png';
import naanImage from '@assets/generated_images/Fresh_naan_bread_5feb09ee.png';
import dessertImage from '@assets/generated_images/Gulab_jamun_dessert_3b38aae9.png';

export default function DishGridExample() {
  const mockDishes = [
    {
      id: '1',
      name: 'Chicken Karahi',
      weight: '500g',
      price: 'Rs. 850',
      category: 'Main Course',
      description: 'Traditional chicken karahi cooked with tomatoes, green chilies, and aromatic spices',
      imageUrl: karahiImage
    },
    {
      id: '2',
      name: 'Chicken Biryani',
      weight: '1 Plate',
      price: 'Rs. 450',
      category: 'Main Course',
      description: 'Fragrant basmati rice layered with tender chicken and traditional spices',
      imageUrl: biryaniImage
    },
    {
      id: '3',
      name: 'Butter Chicken',
      weight: '400g',
      price: 'Rs. 750',
      category: 'Main Course',
      description: 'Creamy tomato-based curry with tender chicken pieces',
      imageUrl: butterChickenImage
    },
    {
      id: '4',
      name: 'Seekh Kebabs',
      weight: '6 Pieces',
      price: 'Rs. 650',
      category: 'Appetizer',
      description: 'Chargrilled minced meat skewers with herbs and spices',
      imageUrl: kebabsImage
    },
    {
      id: '5',
      name: 'Garlic Naan',
      weight: '2 Pieces',
      price: 'Rs. 120',
      category: 'Bread',
      description: 'Freshly baked flatbread with garlic and butter',
      imageUrl: naanImage
    },
    {
      id: '6',
      name: 'Gulab Jamun',
      weight: '3 Pieces',
      price: 'Rs. 200',
      category: 'Dessert',
      description: 'Sweet milk dumplings soaked in rose-flavored syrup',
      imageUrl: dessertImage
    }
  ];

  return <DishGrid dishes={mockDishes} />;
}
