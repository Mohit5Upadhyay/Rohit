// src/hooks/useNewsletter.ts
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { newsletterService } from '../services/newsletter.services';

export const useNewsletter = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);

  const subscribe = async (email: string) => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }

    setIsSubscribing(true);
    try {
      const response = await newsletterService.subscribe(email);
      if (response.success) {
        toast.success(response.message);
        return true;
      } else {
        toast.error(response.message);
        return false;
      }
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      toast.error('Failed to subscribe. Please try again later.');
      return false;
    } finally {
      setIsSubscribing(false);
    }
  };

  return {
    isSubscribing,
    subscribe
  };
};