import React from 'react'
import { TextChoice } from '../types/StudentChoices';

type SelectFilterProps = {
  label: string;
  name: string;
  choices: TextChoice[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ label, name, choices, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <select name={name} onChange={onChange}>
        {choices.map((choice) => (
          <option value={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectFilter