import React from 'react'
import { TextChoice } from '../types/StudentChoices';

type SelectFilterProps = {
  label: string;
  name: string;
  choices: TextChoice[];
  value: any;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ label, name, choices, value, onChange }) => {
  return (
    <div className='flex mb-2'>
      <label className='w-[35%] p-1 text-gray-600 font-semibold text-center'>{label}</label>
      <select 
        name={name}
        value={value}
        onChange={onChange}
        className={`w-[55%] ${
          value === "" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        <option value="" className="text-gray-600">指定なし</option>
        {choices.map((choice) => (
          <option value={choice.value} className="text-gray-600">
            {choice.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectFilter