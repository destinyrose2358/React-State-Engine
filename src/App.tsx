import { useMemo } from 'react';
import './App.css'
import { useStateEngine } from './state_engine/useStateEngine';
import RootEngine from './demo_engine/RootEngine';

function App() {
  const {
    getTitle,
    handleTitle,
    counter: {
      getCounter,
      getStep,
      decrementCounter,
      incrementCounter,
      incrementStep,
      decrementStep
    }
  } = useStateEngine(RootEngine);

  const title = useMemo(getTitle, [ getTitle ]);

  const counter = useMemo(getCounter, [ getCounter ]);

  const step = useMemo(getStep, [ getStep ]);

  return (
    <>
      <input
        value={title}
        onChange={handleTitle}
      />
      <br/>
      <button onClick={decrementStep}>s-</button>
      <span>{step}</span>
      <button onClick={incrementStep}>s+</button>
      <br />
      <button onClick={decrementCounter}>-</button>
      <p>{counter}</p>
      <button onClick={incrementCounter}>+</button>
    </>
  )
}

export default App;
