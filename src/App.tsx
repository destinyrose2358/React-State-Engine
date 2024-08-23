import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { useStateEngine } from './state-engine/stateEngine';
import { SimpleStateEngine } from './examples/simple-state-engine';

function App() {
  const simpleStateEngine = useStateEngine(SimpleStateEngine);
  const {
    getters: {
      counter: counterGetter
    },
    setters: {
      incrementCounter,
      decrementCounter
    }
  } = simpleStateEngine;
  const counter = useMemo(() => {
    return counterGetter();
  }, [
    counterGetter
  ]);

  return (
    <div className="App">
      <p>{counter}</p>
      <button
        onClick={decrementCounter}
      >-</button>
      <button
        onClick={incrementCounter}
      >+</button>
    </div>
  );
}

export default App;
