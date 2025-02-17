import './style.css';
import { FC } from 'react';

type TErrorTextProps = {
  message?: string;
};

const ErrorText: FC<TErrorTextProps> = ({ message }) => {
  if (!message) return null;

  return <p className="error-text">{message}</p>;
};

export default ErrorText;
