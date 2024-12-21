import React from 'react'

 /**
  *  機能Button
  *   
  *   <div className="App">
  *     <FuncButton
  *       text="button"
  *       type="button"
  *       onClick={() => {}}
  *     />
  *  </div>
  *  
  *   };
  */

type FuncButtonProps = {
  text: string;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FuncButton: React.FC<FuncButtonProps> = ({ text, disabled = false, type, onClick }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className='bg-white text-gray-600 text-center font-bold px-4 h-1/3 rounded-lg transition-transform transform 
                  active:scale-90 hover: focus:outline-none'
    >{text}
    </button>
  )
}

export default FuncButton