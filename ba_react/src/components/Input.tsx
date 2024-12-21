import React, { useRef } from 'react';

 /**
  *  汎用Input(クリアボタン付き)
  *   
  *   <Input 
  *     name="example" 
  *     placeholder="Type something..." 
  *     value={inputValue} 
  *     onChange={handleInputChange} 
  *   />
  *  
  *   const [inputValue, setInputValue] = useState('');
  *   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  *     setInputValue(event.target.value);
  *   };
  */

type InputProps = {
  type: "text" | "number" | "email" | "password" | "checkbox" | "radio" | "url" | "date" | "time";
  name: string;
  disabled?: boolean;
  value: string; 
  placeholder: string;
  autocomplete?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Record<string, string[]>;
};

const Input: React.FC<InputProps> = ({ type, name, disabled = false, value, placeholder = '', autocomplete = '', onChange, errors={} }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event); 
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = ''; 
    }

    onChange({
      target: {
        name,
        value: ''
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const errorMessage = errors[name] ? errors[name][0] : null;
  
  return (
    <div className='relative border-gray-200 border rounded-md transition-all duration-300 focus-within:border-blue-500'>
      <div className='relative'>
        <input
          ref={inputRef}
          type={type}
          name={name}
          disabled={disabled}
          value={value} 
          placeholder={placeholder}
          autoComplete={autocomplete}
          onChange={handleChange}
          className='h-10 w-full min-w-0 rounded pl-7 pr-7 outline-none'
        />
        {value && (
          <span
            className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500'
            onClick={handleClear}
          >
            ✕
          </span>
        )}
      </div>
      {errorMessage && <p className='font-medium text-red-400 mt-1'>{errorMessage}</p>}
    </div>
  );
};

export default Input;
