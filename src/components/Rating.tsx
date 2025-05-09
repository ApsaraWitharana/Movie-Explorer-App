import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
}

const Rating: React.FC<RatingProps> = ({ value }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'bg-green-600';
    if (rating >= 6) return 'bg-yellow-500';
    if (rating >= 4) return 'bg-orange-500';
    return 'bg-accent-600';
  };

  return (
    <div className={`flex items-center px-2 py-1 rounded-md ${getRatingColor(value)} text-white text-xs font-bold`}>
      <Star className="w-3 h-3 mr-1" fill="white" />
      {value.toFixed(1)}
    </div>
  );
};

export default Rating;