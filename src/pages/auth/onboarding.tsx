import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const onboardingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  restaurantName: z.string().min(1, 'Restaurant name is required'),
  restaurantUrl: z.string().url().optional().or(z.literal('')),
  coverImage: z
    .any()
    .refine((files) => !files[0] || files[0].size <= MAX_FILE_SIZE, 'Max file size is 3MB.')
    .refine(
      (files) => !files[0] || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
});

type OnboardingForm = z.infer<typeof onboardingSchema>;

export function OnboardingPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (data: OnboardingForm) => {
    // In a real app, you would make an API call here
    // For now, we'll just store in localStorage
    localStorage.setItem('user_profile', JSON.stringify(data));
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Complete your profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Tell us about you and your restaurant
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">
                Restaurant Name
              </label>
              <div className="mt-1">
                <input
                  id="restaurantName"
                  type="text"
                  {...register('restaurantName')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                />
                {errors.restaurantName && (
                  <p className="mt-1 text-sm text-red-600">{errors.restaurantName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="restaurantUrl" className="block text-sm font-medium text-gray-700">
                Restaurant URL (Optional)
              </label>
              <div className="mt-1">
                <input
                  id="restaurantUrl"
                  type="url"
                  {...register('restaurantUrl')}
                  placeholder="https://example.com"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                />
                {errors.restaurantUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.restaurantUrl.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                Cover Image (Optional)
              </label>
              <div className="mt-1">
                <input
                  id="coverImage"
                  type="file"
                  accept="image/*"
                  {...register('coverImage')}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
                {errors.coverImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.coverImage.message}</p>
                )}
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                isLoading={isSubmitting}
              >
                Complete Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}