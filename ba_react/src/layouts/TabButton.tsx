import React from 'react'

type TabButtonProps = {
  name: string;
  text: string;
  selected: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ name, text, selected, onClick }) => {

  return (
    <button
      name={name}
      onClick={onClick}
      className={`px-4 py-2 border-b-4 font-semibold w-20
        ${name === selected 
          ? 'border-sky-600 text-sky-600' 
          : 'border-transparent text-gray-600'
      }`}
    >{text}
    </button>
  )
}

export default TabButton;