import React from 'react';

interface MoodBoardProps {
  images: string[];
  title: string;
}

export const MoodBoard: React.FC<MoodBoardProps> = ({ images, title }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <div className="grid grid-cols-3 gap-1 bg-gray-100 p-2 rounded-lg">
        {images.slice(0, 9).map((imageUrl, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-200 rounded overflow-hidden"
          >
            <img
              src={imageUrl}
              alt={`Mood board item ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};