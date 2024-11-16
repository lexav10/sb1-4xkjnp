import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'pricing-table-id': string;
        'publishable-key': string;
      };
    }
  }
}

export function SubscriptionPage() {
  React.useEffect(() => {
    // Load Stripe.js
    loadStripe('pk_test_51QLlORHVXxWzIKSKKWp0TIts8zL9GKZl9yQhHXm1bIwVW6WuOeQGe4c0pgWgtEqhjrRtqbnhi72j4myZuloL9ZJH0047V2jlH9');

    // Load Stripe Pricing Table script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/pricing-table.js"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="py-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Subscription Plans</h1>
        <p className="mt-2 text-sm text-gray-700">
          Choose the perfect plan for your restaurant
        </p>
      </div>

      <div id="stripe-pricing-table-container">
        <stripe-pricing-table
          pricing-table-id="prctbl_1QLmX7HVXxWzIKSKFCE92GPi"
          publishable-key="pk_test_51QLlORHVXxWzIKSKKWp0TIts8zL9GKZl9yQhHXm1bIwVW6WuOeQGe4c0pgWgtEqhjrRtqbnhi72j4myZuloL9ZJH0047V2jlH9"
        />
      </div>
    </div>
  );
}