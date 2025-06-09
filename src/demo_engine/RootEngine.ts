import { useCallback, useMemo, type ChangeEvent } from "react";
import { createStateEngine } from "../state_engine/createStateEngine";
import { produce } from "immer";
import CounterEngine from "./CounterEngine";

const RootEngine = createStateEngine({
    initialState: {
        title: "HELLO WORLD"
    },
    getters: ({ title }) => {
        const getTitle = useCallback(() => title, [ title ]);

        const finalGetters = useMemo(() => {
            return {
                getTitle
            }
        }, [
            getTitle
        ]);

        return finalGetters
    },
    setters: (setState) => {
        const finalSetters = useMemo(() => {
            return {
                setTitle: (newTitle: string) => setState(prevState => produce(prevState, draft => {
                    draft.title = newTitle;
                })),
                handleTitle: (e: ChangeEvent<HTMLInputElement>) => setState(prevState => produce(prevState, draft => {
                    // debugger;
                    draft.title = e.target.value;
                }))
            }
        }, []);

        return finalSetters;
    },
    modules: {
        counter: CounterEngine
    }
});

export default RootEngine;
