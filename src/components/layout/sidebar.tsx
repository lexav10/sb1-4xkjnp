import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  ChefHat,
  Settings,
  CreditCard,
  QrCode,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'My Dishes', href: '/dishes', icon: ChefHat },
  { name: 'My Restaurant Link', href: '/qr-code', icon: QrCode },
  { name: 'My Subscription', href: '/subscription', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens/state
    localStorage.removeItem('auth_token');
    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-14 items-center border-b border-gray-200 px-4">
        <span className="text-xl font-bold">OnMangeQuoi</span>
      </div>
      
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            <item.icon
              className="mr-3 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          className="flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}