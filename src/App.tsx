import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { useStateEngine } from './state-engine/stateEngine';
import { CounterStateEngine } from './examples/counter-state-engine';
import { ComplexStateEngine } from './examples/complex-state-engine';
import { MergedComplexStateEngine } from './examples/merged-complex-state-engine';

function App() {
  const simpleStateEngine = useStateEngine(MergedComplexStateEngine);
  const {
    getters: {
      counter: {
        counter: counterGetter
      },
      stepSize: {
        stepSize: stepSizeGetter
      }
    },
    setters: {
      counter: {
        increment: incrementCounter,
        decrement: decrementCounter,
        incrementByStepSize,
        decrementByStepSize,
        reset: resetCounter,
        step: stepCounter
      },
      stepSize: {
        increment: incrementStepSize,
        decrement: decrementStepSize,
        step: stepStepSize,
        reset: resetStepSize
      }
    }
  } = simpleStateEngine;
  const counter = useMemo(() => {
    return counterGetter();
  }, [
    counterGetter
  ]);
  const stepSize = useMemo(() => {
    return stepSizeGetter()
  }, [
    stepSizeGetter
  ])

  return (
    <div className="App">
      <p>counter</p>
      <p>{counter}</p>
      <button
        onClick={() => stepCounter(-100)}
      >
        -100
      </button>
      <button
        onClick={() => stepCounter(-10)}
      >
        -10
      </button>
      <button
        onClick={decrementCounter}
      >-1</button>
      <button
        onClick={decrementByStepSize}
      >-</button>
      <button
        onClick={incrementByStepSize}
      >+</button>
      <button
        onClick={incrementCounter}
      >+1</button>
      <button
        onClick={() => stepCounter(+10)}
      >
        +10
      </button>
      <button
        onClick={() => stepCounter(100)}
      >
        +100
      </button>
      <button
        onClick={resetCounter}
      >reset</button>
      <p>step size</p>
      <p>{stepSize}</p>
      <button
        onClick={() => stepStepSize(-100)}
      >
        -100
      </button>
      <button
        onClick={() => stepStepSize(-10)}
      >
        -10
      </button>
      <button
        onClick={decrementStepSize}
      >-1</button>
      <button
        onClick={incrementStepSize}
      >+1</button>
      <button
        onClick={() => stepStepSize(+10)}
      >
        +10
      </button>
      <button
        onClick={() => stepStepSize(100)}
      >
        +100
      </button>
      <button
        onClick={resetStepSize}
      >reset</button>
    </div>
  );
}

export default App;
