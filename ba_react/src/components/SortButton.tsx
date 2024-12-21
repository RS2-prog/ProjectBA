import React from 'react'

type SortButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  order: string;
};

const SortButton: React.FC<SortButtonProps> = ({ onClick, order }) => {

  let text: string;
  if (order === 'asc') {
    text = '🔼';  
  } else if (order === 'desc') {
    text = '🔽';
  } else {
    text = '🔀';
  }

  return (
    <button
      type='button'
      name={order}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default SortButton