
import React, { useState } from 'react';

interface GalleryProps {
  images: string[];
  columns?: number;
}

const Gallery: React.FC<GalleryProps> = ({ images, columns = 2 }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <>
      <div className={`grid grid-cols-${columns} md:grid-cols-3 lg:grid-cols-4 gap-4`}>
        {images.map((src, idx) => (
          <div 
            key={idx} 
            className="relative aspect-square overflow-hidden rounded-xl cursor-pointer hover:scale-[1.02] transition-transform duration-300 shadow-sm"
            onClick={() => setSelectedImg(src)}
          >
            <img 
              src={src} 
              alt={`Resultado ${idx + 1}`} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors"></div>
          </div>
        ))}
      </div>

      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-6 right-6 text-white text-3xl">&times;</button>
          <img src={selectedImg} alt="Preview" className="max-w-full max-h-[85vh] object-contain rounded-lg" />
        </div>
      )}
    </>
  );
};

export default Gallery;
