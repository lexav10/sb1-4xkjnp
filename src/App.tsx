import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/app-layout';
import { AuthLayout } from './components/layout/auth-layout';
import { LoginPage } from './pages/auth/login';
import { SignupPage } from './pages/auth/signup';
import { OnboardingPage } from './pages/auth/onboarding';
import { DishesPage } from './pages/dishes';
import { ProfilePage } from './pages/profile';
import { SubscriptionPage } from './pages/subscription';
import { QrCodePage } from './pages/qr-code';
import { SettingsPage } from './pages/settings';
import { RestaurantView } from './pages/restaurant-view';

function RequireAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = localStorage.getItem('auth_token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>
        
        <Route element={<RequireAuth><AppLayout /></RequireAuth>}>
          <Route path="/" element={<Navigate to="/dishes" replace />} />
          <Route path="/dishes" element={<DishesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/qr-code" element={<QrCodePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Restaurant view route outside of authenticated routes */}
        <Route path="restaurant/:id" element={<RestaurantView />} />
      </Routes>
    </Router>
  );
}

export default App;