import React from 'react';
import Canvas from '../canvas/canvas';
import './main.scss';

const MainPage = () => {
  return (
    <div className="mainScreen">
      <Canvas />
      <footer>
        Copyright &copy; 2019 BigBoiks
      </footer>
    </div>
  );
};

export default MainPage;