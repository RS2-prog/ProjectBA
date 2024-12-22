import React from 'react'
import SwapVertIcon from '@mui/icons-material/SwapVert';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

type SortButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  order: string;
};

const SortButton: React.FC<SortButtonProps> = ({ onClick, order }) => {

  const renderIcon = (order: string) => {
    switch (order) {
      case "asc":
        return <NorthIcon fontSize='small' className='pointer-events-none'/>;
      case "desc":
        return <SouthIcon fontSize='small' className='pointer-events-none'/>
      default:
        return <SwapVertIcon fontSize='small' className='pointer-events-none'/>
    }
  };

  return (
    <button
      type='button'
      name={order}
      onClick={onClick}
      className='items-center'
    >
      {renderIcon(order)}
    </button>
  )
}

export default SortButton