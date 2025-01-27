import React from 'react'

type SearchBarHProps = {
  contentValue: string;
  searchValue: string;
  children: React.ReactNode;
  onContentChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SearchBarH: React.FC<SearchBarHProps> = ({ contentValue, searchValue, children, onContentChange, onSearchChange, onClick }) => {
  return (
    <form className='flex w-1/3 border-2 border-sky-200 rounded-2xl overflow-hidden transition-all duration-150 
                    focus-within:border focus-within:border-sky-600'>
      <select
        value={contentValue}
        onChange={onContentChange}
        className='w-1/3 outline-none text-gray-600 border-r-2 bg-sky-200 font-semibold'
      >
        {children}
      </select>
      <input 
        value={searchValue}
        placeholder='助っ人を探す'
        onChange={onSearchChange}
        className='w-2/3 outline-none text-gray-600 pl-3'
      />
      <button 
        className='w-9 bg-sky-200'
        onClick={onClick}
      >🔍️
      </button>
    </form>
  )
};

export default SearchBarH