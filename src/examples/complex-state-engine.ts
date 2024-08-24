import { useCallback, useMemo } from "react";
import { createStateEngine } from "../state-engine/stateEngine";

export const ComplexStateEngine = createStateEngine({
    initialState: {
        counter: 0,
        stepSize: 1
    },
    gettersGenerator: (state) => {
        const counterGetter = useCallback(() => state.counter, [state.counter]);
        const stepSizeGetter = useCallback(() => state.stepSize, [state.stepSize]);
        const finalGetters = useMemo(() => {
            return {
                counter: counterGetter,
                stepSize: stepSizeGetter
            }
        }, [
            counterGetter,
            stepSizeGetter
        ]);

        return finalGetters;
    },
    settersGenerator: (setState) => {
        const finalSetters = useMemo(() => {
            return {
                counter: {
                    increment: () => setState(prevState => ({
                        ...prevState,
                        counter: prevState.counter + 1
                    })),
                    decrement: () => setState(prevState => ({
                        ...prevState,
                        counter: prevState.counter - 1
                    })),
                    incrementByStepSize: () => setState(prevState => ({
                        ...prevState,
                        counter: prevState.counter + prevState.stepSize
                    })),
                    decrementByStepSize: () => setState(prevState => ({
                        ...prevState,
                        counter: prevState.counter - prevState.stepSize
                    })),
                    step: (step: number) => setState(prevState => ({
                        ...prevState,
                        counter: prevState.counter + step
                    })),
                    reset: () => setState(prevState => ({
                        ...prevState,
                        counter: 0
                    }))
                },
                stepSize: {
                    increment: () => setState(prevState => ({
                        ...prevState,
                        stepSize: prevState.stepSize + 1
                    })),
                    decrement: () => setState(prevState => ({
                        ...prevState,
                        stepSize: Math.max(1, prevState.stepSize - 1)
                    })),
                    step: (step: number) => setState(prevState => ({
                        ...prevState,
                        stepSize: prevState.stepSize + step
                    })),
                    reset: () => setState(prevState => ({
                        ...prevState,
                        stepSize: 1
                    }))
                }
            }
        }, [
        ]);
        
        return finalSetters;
    }
})
