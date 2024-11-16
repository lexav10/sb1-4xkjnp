export type DishType = 'Starter' | 'Main Course' | 'Dessert' | 'Drinks' | 'To Share' | 'Side';
export type Quantity = 'Light' | 'Normal' | 'Well-served';

export interface Dish {
  id: string;
  name: string;
  description: string;
  type: DishType;
  ingredients: string;
  allergens: string;
  price: string;
  image?: string;
  quantity: Quantity;
  createdAt: Date;
}