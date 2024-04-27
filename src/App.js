import './App.css';
import Header from './Header'
import React, { useState } from 'react';
import Game from './Game';


const App = () => {
  const [money, setMoney] = useState(0);

  return (
    <div className="App">
      <Header money={money} />
      <Game setMoney={setMoney} />
    </div>
  );
};

export default App;
