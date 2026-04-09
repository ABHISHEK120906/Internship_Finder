import { useEffect } from 'react';

export const usePageLoadAnimation = () => {
  useEffect(() => {
    // Add page load animation class
    document.body.classList.add('page-loading');
    
    // Remove after animation completes
    const timer = setTimeout(() => {
      document.body.classList.remove('page-loading');
      document.body.classList.add('page-loaded');
    }, 800);

    return () => clearTimeout(timer);
  }, []);
};
