import { useCallback, useMemo } from "react";
import { createStateEngine } from "../state_engine/createStateEngine";
import { produce } from "immer";

const CounterEngine = createStateEngine({
    initialState: {
        counter: 0,
        step: 1
    },
    getters: ({
        counter,
        step
    }) => {
        const getCounter = useCallback(() => counter, [ counter ]);
        const getStep = useCallback(() => step, [ step ]);

        return useMemo(() => {
            return {
                getCounter,
                getStep
            }
        }, [
            getCounter,
            getStep
        ]);
    },
    setters: (setState) => {
        return useMemo(() => {
            return {
                incrementCounter: () => setState(prev => produce(prev, draft => {
                    draft.counter += draft.step;
                })),
                decrementCounter: () => setState(prev => produce(prev, draft => {
                    draft.counter -= draft.step;
                })),
                incrementStep: () => setState(prev => produce(prev, draft => {
                    draft.step += 1;
                })),
                decrementStep: () => setState(prev => produce(prev, draft => {
                    draft.step -= 1;
                }))
            }
        }, []);
    },
    modules: {}
});

export default CounterEngine;
