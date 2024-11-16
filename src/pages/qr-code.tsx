import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export function QrCodePage() {
  // Get the restaurant ID from localStorage or context
  const userProfile = localStorage.getItem('user_profile');
  const profile = userProfile ? JSON.parse(userProfile) : {};
  const restaurantId = profile.restaurantId || crypto.randomUUID();

  // Save the restaurant ID if it doesn't exist
  if (!profile.restaurantId) {
    localStorage.setItem('user_profile', JSON.stringify({
      ...profile,
      restaurantId
    }));
  }

  const restaurantUrl = `${window.location.origin}/restaurant/${restaurantId}`;

  const handlePreviewClick = () => {
    window.open(restaurantUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">My Restaurant Link</h1>
        <p className="mt-2 text-sm text-gray-700">
          Share this QR code with your customers to let them access your menu
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col items-center space-y-4">
          {/* QR Code would be generated here */}
          <div className="w-64 h-64 bg-gray-100 rounded flex items-center justify-center">
            QR Code Placeholder
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Restaurant URL</p>
            <p className="text-sm font-mono bg-gray-50 p-2 rounded">{restaurantUrl}</p>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => {}}>
              Download PDF
            </Button>
            <Button onClick={() => {}}>
              Download PNG
            </Button>
            <Button onClick={handlePreviewClick} variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Preview Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}