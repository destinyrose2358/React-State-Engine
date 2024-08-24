import { useMemo, useState } from "react";
import { createStateEngine } from "../state-engine/stateEngine";

export const CounterStateEngine = createStateEngine({
    initialState: 0,
    gettersGenerator: (state) => {
        const finalGetters = useMemo(() => {
            return {
                counter: () => state
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
                decrement: () => setState(prevState => (prevState - 1)),
                step: (step: number) => setState(prevState => (prevState + step)),
                reset: () => setState(0)
            }
        }, [

        ]);
        return finalSetters;
    },
});
