import React, { useState } from 'react';

export interface MediaItem {
  src: string;
  type?: 'image' | 'video';
  alt?: string;
}

interface GalleryProps {
  items: MediaItem[];
}

const ProjectGallery: React.FC<GalleryProps> = ({ items }) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="focus:outline-none"
          >
            {m.type === 'video' ? (
              <video src={m.src} className="w-full h-full rounded" />
            ) : (
              <img src={m.src} alt={m.alt || ''} className="w-full h-full rounded" />
            )}
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setActive(null)}
          >
            ×
          </button>
          {items[active].type === 'video' ? (
            <video
              controls
              src={items[active].src}
              className="max-h-full max-w-full"
            />
          ) : (
            <img
              src={items[active].src}
              alt={items[active].alt || ''}
              className="max-h-full max-w-full"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
