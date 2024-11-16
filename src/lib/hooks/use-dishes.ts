import { useState, useEffect } from 'react';
import type { Dish } from '@/lib/types';

const PLAN_LIMITS = {
  'OMQ Free': 5,
  'OMQ Plus': 25,
  'OMQ Premium': 150,
};

type PlanType = keyof typeof PLAN_LIMITS;

export function useDishes() {
  const [dishes, setDishes] = useState<Dish[]>(() => {
    const saved = localStorage.getItem('dishes');
    return saved ? JSON.parse(saved) : [];
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  const getCurrentPlan = (): PlanType => {
    return (localStorage.getItem('current_plan') as PlanType) || 'OMQ Free';
  };

  const canAddDish = () => {
    const currentPlan = getCurrentPlan();
    const limit = PLAN_LIMITS[currentPlan];
    return dishes.length < limit;
  };

  const addDish = (dish: Omit<Dish, 'id' | 'createdAt'>) => {
    if (!canAddDish()) {
      setShowUpgradeModal(true);
      return false;
    }

    const newDish: Dish = {
      ...dish,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setDishes(prev => [...prev, newDish]);
    return true;
  };

  const duplicateDish = (id: string) => {
    if (!canAddDish()) {
      setShowUpgradeModal(true);
      return;
    }

    const dishToDuplicate = dishes.find(dish => dish.id === id);
    if (dishToDuplicate) {
      const duplicatedDish: Dish = {
        ...dishToDuplicate,
        id: crypto.randomUUID(),
        name: `${dishToDuplicate.name} (Copy)`,
        createdAt: new Date(),
      };
      setDishes(prev => [...prev, duplicatedDish]);
    }
  };

  const deleteDish = (id: string) => {
    setDishes(prev => prev.filter(dish => dish.id !== id));
  };

  const deleteSelectedDishes = (ids: string[]) => {
    setDishes(prev => prev.filter(dish => !ids.includes(dish.id)));
  };

  const closeUpgradeModal = () => {
    setShowUpgradeModal(false);
  };

  return {
    dishes,
    addDish,
    deleteDish,
    deleteSelectedDishes,
    duplicateDish,
    showUpgradeModal,
    closeUpgradeModal,
    currentPlan: getCurrentPlan(),
  };
}