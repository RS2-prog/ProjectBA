import React from 'react'
import { useLocation } from 'react-router-dom';

type TabButtonProps = {
  path: string;
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ path, label, onClick }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <button
      name={path}
      onClick={onClick}
      className={`px-4 py-2 border-b-4 font-semibold w-20
        ${currentPath.startsWith(path) 
          ? 'border-sky-600 text-sky-600' 
          : 'border-transparent text-gray-600'
      }`}
    >{label}
    </button>
  )
}

export default TabButton;