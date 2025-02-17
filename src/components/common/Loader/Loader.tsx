import './style.css';
import { FC } from 'react';

const Loader: FC = () => {
  return (
    <div className="loader-container">
      <div className="loader" />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
