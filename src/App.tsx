import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { useStateEngine } from './state-engine/stateEngine';
import { CounterStateEngine } from './examples/counter-state-engine';

function App() {
  const simpleStateEngine = useStateEngine(CounterStateEngine);
  const {
    getters: {
      counter: counterGetter
    },
    setters: {
      increment,
      decrement,
      reset,
      step
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
        onClick={() => step(-100)}
      >
        -100
      </button>
      <button
        onClick={() => step(-10)}
      >
        -10
      </button>
      <button
        onClick={decrement}
      >-</button>
      <button
        onClick={increment}
      >+</button>
      <button
        onClick={() => step(+10)}
      >
        +10
      </button>
      <button
        onClick={() => step(100)}
      >
        +100
      </button>
      <button
        onClick={reset}
      >reset</button>
    </div>
  );
}

export default App;
