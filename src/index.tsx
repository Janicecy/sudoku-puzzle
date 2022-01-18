import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Sudoku } from './components/Sudoku';

ReactDOM.render(
  <React.StrictMode>
    <Sudoku />
  </React.StrictMode>,
  document.getElementById('root')
);
