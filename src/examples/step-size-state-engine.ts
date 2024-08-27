import { useMemo, useState } from "react";
import { createStateEngine } from "../state-engine/stateEngine";

export const StepSizeStateEngine = createStateEngine({
    initialState: 1,
    gettersGenerator: (state) => {
        const finalGetters = useMemo(() => {
            return {
                stepSize: () => state
            }
        }, [
            state
        ]);
        return finalGetters;
    },
    settersGenerator: (setState) => {
        const finalSetters = useMemo(() => {
            return {
                increment: () => setState(prevState => (prevState + 1)),
                decrement: () => setState(prevState => Math.max(1, prevState - 1)),
                step: (step: number) => setState(prevState => Math.max(1, prevState + step)),
                reset: () => setState(1)
            }
        }, [

        ]);
        return finalSetters;
    },
});
