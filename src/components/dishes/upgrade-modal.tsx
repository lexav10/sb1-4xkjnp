import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
}

export function UpgradeModal({ isOpen, onClose, currentPlan }: UpgradeModalProps) {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/subscription');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upgrade Your Plan"
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          {currentPlan === 'OMQ Free' ? (
            "You've reached the limit of 5 dishes on the Free plan."
          ) : (
            "You've reached the limit of 25 dishes on the Plus plan."
          )}
        </p>
        
        <p className="text-gray-600">
          Upgrade your plan to add more dishes to your menu.
        </p>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpgrade}>
            View Plans
          </Button>
        </div>
      </div>
    </Modal>
  );
}