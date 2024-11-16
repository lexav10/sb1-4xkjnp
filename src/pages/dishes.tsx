import React from 'react';
import { Plus } from 'lucide-react';
import { DishForm } from '@/components/dishes/dish-form';
import { DishesTable } from '@/components/dishes/dishes-table';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { useDishes } from '@/lib/hooks/use-dishes';
import { UpgradeModal } from '@/components/dishes/upgrade-modal';

export function DishesPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const {
    dishes,
    addDish,
    deleteDish,
    deleteSelectedDishes,
    duplicateDish,
    showUpgradeModal,
    closeUpgradeModal,
    currentPlan
  } = useDishes();

  const handleAddDish = (data: any) => {
    const success = addDish(data);
    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Dishes</h1>
          <p className="mt-2 text-sm text-gray-700">
            Add and manage your restaurant's dishes
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Dish
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Dish"
      >
        <DishForm onSubmit={handleAddDish} />
      </Modal>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={closeUpgradeModal}
        currentPlan={currentPlan}
      />

      <DishesTable 
        dishes={dishes}
        onDelete={deleteDish}
        onDeleteSelected={deleteSelectedDishes}
        onDuplicate={duplicateDish}
        currentPlan={currentPlan}
      />
    </div>
  );
}