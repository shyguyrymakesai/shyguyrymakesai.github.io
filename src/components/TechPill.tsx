import React from 'react';

interface TechPillProps {
  name: string;
}

const TechPill: React.FC<TechPillProps> = ({ name }) => (
  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2 py-1 rounded-full">
    {name}
  </span>
);

export default TechPill;
