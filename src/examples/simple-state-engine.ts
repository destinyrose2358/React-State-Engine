import { useMemo, useState } from "react";
import { createStateEngine } from "../state-engine/stateEngine";

export const SimpleStateEngine = createStateEngine({
    initialState: {
        counter: 0
    },
    gettersGenerator: (state) => {
        const finalGetters = useMemo(() => {
            return {
                counter: () => state.counter
            }
        }, [
            state
        ]);
        return finalGetters;
    },
    settersGenerator: (setState) => {
        const finalSetters = useMemo(() => {
            return {
                incrementCounter: () => setState(prevState => ({
                    ...prevState,
                    counter: prevState.counter + 1
                })),
                decrementCounter: () => setState(prevState => ({
                    ...prevState,
                    counter: prevState.counter - 1
                }))
            }
        }, [

        ]);
        return finalSetters;
    },
});
