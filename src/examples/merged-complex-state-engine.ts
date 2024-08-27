import { useCallback, useMemo } from "react";
import { mergeStateEngines } from "../state-engine/stateEngine";
import { CounterStateEngine } from "./counter-state-engine";
import { StepSizeStateEngine } from "./step-size-state-engine";

export const MergedComplexStateEngine = mergeStateEngines({
    engines: {
        counter: CounterStateEngine,
        stepSize: StepSizeStateEngine
    },
    gettersModifier: (oldGetters) => {
        return oldGetters
    },
    settersModifier: (oldGetters, oldSetters) => {
        const incrementByStepSize = useCallback(() => {
            return oldSetters.counter.step(oldGetters.stepSize.stepSize());
        }, [
            oldSetters.counter.step,
            oldGetters.stepSize.stepSize
        ]);

        const decrementByStepSize = useCallback(() => {
            return oldSetters.counter.step(-oldGetters.stepSize.stepSize());
        }, [
            oldSetters.counter.step,
            oldGetters.stepSize.stepSize
        ]);

        const counter = useMemo(() => {
            return {
                ...oldSetters.counter,
                incrementByStepSize,
                decrementByStepSize
            }
        }, [
            oldSetters.counter,
            incrementByStepSize,
            decrementByStepSize
        ]);

        const finalSetters = useMemo(() => {
            return {
                ...oldSetters,
                counter
            }
        }, [
            oldSetters,
            counter
        ])

        return finalSetters;
    }
})
