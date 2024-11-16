import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const profileSchema = z.object({
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

type ProfileForm = z.infer<typeof profileSchema>;

export function SettingsPage() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = React.useState(false);
  const [savedMessage, setSavedMessage] = React.useState('');
  const saveTimeout = React.useRef<NodeJS.Timeout>();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: async () => {
      const savedProfile = localStorage.getItem('user_profile');
      return savedProfile ? JSON.parse(savedProfile) : {};
    },
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    setIsSaving(true);
    setSavedMessage('');

    saveTimeout.current = setTimeout(async () => {
      const formData = new FormData(e.target.form!);
      const data = Object.fromEntries(formData.entries());
      
      // In a real app, this would be an API call
      localStorage.setItem('user_profile', JSON.stringify(data));
      
      setIsSaving(false);
      setSavedMessage('Changes saved');
      
      setTimeout(() => {
        setSavedMessage('');
      }, 3000);
    }, 500);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would be an API call
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_profile');
      navigate('/login');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your profile and account settings
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <form onChange={handleChange} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register('firstName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register('lastName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">
                Restaurant Name
              </label>
              <input
                type="text"
                id="restaurantName"
                {...register('restaurantName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
              {errors.restaurantName && (
                <p className="mt-1 text-sm text-red-600">{errors.restaurantName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="restaurantUrl" className="block text-sm font-medium text-gray-700">
                Restaurant URL (Optional)
              </label>
              <input
                type="url"
                id="restaurantUrl"
                {...register('restaurantUrl')}
                placeholder="https://example.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              />
              {errors.restaurantUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.restaurantUrl.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                Cover Image (Optional)
              </label>
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                {...register('coverImage')}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
              {errors.coverImage && (
                <p className="mt-1 text-sm text-red-600">{errors.coverImage.message}</p>
              )}
            </div>

            {isSaving && (
              <p className="text-sm text-gray-500">Saving changes...</p>
            )}
            {savedMessage && (
              <p className="text-sm text-green-600">{savedMessage}</p>
            )}
          </form>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>
          <p className="mt-1 text-sm text-gray-500">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <div className="mt-4">
            <Button
              variant="danger"
              onClick={handleDeleteAccount}
              className="flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}