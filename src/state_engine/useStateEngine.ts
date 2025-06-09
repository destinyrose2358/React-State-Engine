import { useMemo, useState } from "react";
import type { Getters, SEConfigsToSE, Setters, State, StateEngineConfig, StateEngineConfigs } from "./createStateEngine";

export function useStateEngine<
    STATE extends State,
    GETTERS extends Getters,
    SETTERS extends Setters,
    MODULES extends StateEngineConfigs
>(
    {
        initialState,
        getters: useGetters,
        setters: useSetters,
        modules: moduleConfigs
    }: StateEngineConfig<
        STATE,
        GETTERS,
        SETTERS,
        MODULES
    >
) {
    const [state, setState] = useState(initialState);

    const getters = useGetters(state);
    const setters = useSetters(setState);
    const modules = useStateEngines(moduleConfigs || {});

    const finalStateEngine = useMemo(() => {
        return {
            ...getters,
            ...setters,
            ...modules
        }
    }, [
        getters,
        setters,
        modules
    ]);

    return finalStateEngine;
}

function useStateEngines<
    MODULES extends StateEngineConfigs
>(
    moduleConfigs: MODULES
) {
    const modules = {} as SEConfigsToSE<MODULES>;

    for (const moduleName in moduleConfigs) {
        modules[moduleName] = useStateEngine(moduleConfigs[moduleName]);
    }

    return modules;
}
