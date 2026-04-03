import { useEffect } from 'react';
import { 
  createParticles, 
  initSpotlightCards, 
  initScrollProgress, 
  initCustomCursor 
} from '../utils/effects';

export const useGlobalEffects = () => {
  useEffect(() => {
    // Initialize all global effects
    createParticles();
    initSpotlightCards();
    initScrollProgress();
    initCustomCursor();
  }, []);
};

export const useMagneticButtons = () => {
  useEffect(() => {
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
      const element = el as HTMLElement;
      
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = (e as MouseEvent).clientX - rect.left - rect.width/2;
        const y = (e as MouseEvent).clientY - rect.top - rect.height/2;
        element.style.transform = 
          `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
        element.style.transition = 'transform 0.5s ease';
      });
    });
  }, []);
};
