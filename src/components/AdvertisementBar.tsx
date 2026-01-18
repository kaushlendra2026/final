import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const AdvertisementBar = () => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('adBarClosed');
    }
    return true;
  });

  useEffect(() => {
    if (!isVisible) {
      localStorage.setItem('adBarClosed', 'true');
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <p className="text-sm font-medium text-center flex-1">
          🎉 Free Shipping on Orders Over $50! Shop Now and Save Big
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
          aria-label="Close advertisement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdvertisementBar;
