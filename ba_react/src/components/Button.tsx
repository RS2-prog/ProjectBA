import React from 'react'

 /**
  *  汎用Button
  *   
  *   <div className="App">
  *     <Button
  *       text="button"
  *       type="button"
  *       onClick={() => {}}
  *     />
  *  </div>
  *  
  *   };
  */

type ButtonProps = {
  text: string;
  disabled?: boolean;
  type: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({ text, disabled = false, type, onClick }) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className='bg-sky-600 text-gray-50 font-bold py-2 px-4 w-24 rounded-lg transition-transform transform 
                  active:scale-90 hover: focus:outline-none'
    >{text}
    </button>
  )
}

export default Button