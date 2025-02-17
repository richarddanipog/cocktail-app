import './style.css';
import { FC } from 'react';

interface TTextInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const TextInput: FC<TTextInputProps> = ({
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <input
      className="input-text"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default TextInput;
