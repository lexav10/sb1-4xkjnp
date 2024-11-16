import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import type { Dish } from '@/lib/types';

const dishTypes = ['Starter', 'Main Course', 'Dessert', 'Drinks', 'To Share', 'Side'] as const;
const quantities = ['Light', 'Normal', 'Well-served'] as const;

const dishSchema = z.object({
  name: z.string().min(1, 'Dish name is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(dishTypes),
  ingredients: z.string().min(1, 'Ingredients are required'),
  allergens: z.string().min(1, 'Allergens information is required'),
  price: z.string().min(1, 'Price is required'),
  image: z.any().optional(),
  quantity: z.enum(quantities),
});

type DishForm = z.infer<typeof dishSchema>;

interface DishFormProps {
  onSubmit: (data: DishForm) => void;
  isSubmitting?: boolean;
}

export function DishForm({ onSubmit, isSubmitting }: DishFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DishForm>({
    resolver: zodResolver(dishSchema),
    defaultValues: {
      type: 'Main Course',
      quantity: 'Normal',
    },
  });

  const handleFormSubmit = (data: DishForm) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Dish Name
          </label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          >
            {dishTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
            Ingredients
          </label>
          <textarea
            {...register('ingredients')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          />
          {errors.ingredients && (
            <p className="mt-1 text-sm text-red-600">{errors.ingredients.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="allergens" className="block text-sm font-medium text-gray-700">
            Allergens
          </label>
          <input
            type="text"
            {...register('allergens')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          />
          {errors.allergens && (
            <p className="mt-1 text-sm text-red-600">{errors.allergens.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            {...register('price')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <select
            {...register('quantity')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
          >
            {quantities.map((quantity) => (
              <option key={quantity} value={quantity}>{quantity}</option>
            ))}
          </select>
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image (Max 3MB)
          </label>
          <input
            type="file"
            accept="image/png,image/jpeg"
            {...register('image')}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting}>
          Add Dish
        </Button>
      </div>
    </form>
  );
}