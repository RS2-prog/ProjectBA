import React, { useEffect, useState } from 'react'

type SearchBarHProps = {
  contentValue: string;
  searchValue: string;
  children: React.ReactNode;
  suggestions: string[];
  onContentChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SearchBarH: React.FC<SearchBarHProps> = ({ contentValue, searchValue, children, suggestions, onContentChange, onSearchChange, onClick }) => {
  // 状態管理
  // サジェスト表示
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [displayNames, setDisplayNames] = useState<string[]>(suggestions);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event);
    setIsSuggestionsVisible(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>);
    setIsSuggestionsVisible(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSuggestionsVisible || displayNames.length === 0) return;

    if (event.key === 'ArrowDown') {
      setHighlightIndex((prevIndex) => Math.min(prevIndex + 1, displayNames.length - 1));
    } else if (event.key === 'ArrowUp') {
      setHighlightIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === 'Tab') {
      if (highlightIndex >= 0 && highlightIndex < displayNames.length) {
        onSearchChange({
          target: { value: displayNames[highlightIndex] },
        } as React.ChangeEvent<HTMLInputElement>);
        setIsSuggestionsVisible(false);
      }
    } else if (event.key === 'Escape') {
      setIsSuggestionsVisible(false);
    }
  };

  useEffect(() => {
    if (!searchValue) {
      setDisplayNames(suggestions);
    } else {
      setDisplayNames(
        suggestions.filter(suggestion => suggestion.includes(searchValue))
      )
    }
  }, [searchValue]);
  
  return (
    <div className='flex w-1/3 border-2 border-sky-200 bg-sky-200 rounded-2xl overflow-x-visible transition-all duration-150 
                    focus-within:border focus-within:border-sky-600'>
      <select
        value={contentValue}
        onChange={onContentChange}
        className='w-1/3 outline-none text-gray-600 border-r-2 bg-sky-200 font-semibold rounded-l-2xl'
      >
        {children}
      </select>
      <div className='relative w-2/3'> 
        <input 
          value={searchValue}
          placeholder='助っ人を探す'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsSuggestionsVisible(true)}
          onBlur={() => setTimeout(() => setIsSuggestionsVisible(false), 200)}
          className='w-full h-full outline-none text-gray-600 pl-3'
        />
        {isSuggestionsVisible && displayNames.length > 0 && (
          <ul className="absolute bg-white border border-gray-200 rounded-b-lg shadow-md w-full max-h-40 overflow-auto z-50">
            {displayNames.map((suggestion, index) => (
              <li
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setHighlightIndex(index)}
                className={`px-3 py-2 cursor-pointer z-50 ${
                  index === highlightIndex ? 'bg-sky-100' : 'hover:bg-gray-100'
                }`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button 
        type='button'
        className='w-9 bg-sky-200 rounded-r-2xl'
        onClick={onClick}
      >🔍️
      </button>
    </div>
  )
};

export default SearchBarH