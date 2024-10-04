import React from 'react';
import { InputStyle } from './InputStyle';

interface InputProps {
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, type, name, value, onChange }) => {
  return (
    <InputStyle
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input