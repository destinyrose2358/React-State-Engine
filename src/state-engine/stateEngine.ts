import { Dispatch, SetStateAction, useMemo, useState } from "react";

export type StateEngineGetters = {
    [p: string]: (...args: any) => any;
}

export type StateEngineGettersGenerator<
    STATE,
    GETTERS extends StateEngineGetters
> = (
    state: STATE
) => GETTERS;

export type StateEngineSetters = {
    [p: string]: (...args: any) => any;
}

export type StateEngineSettersGenerator<
    STATE,
    SETTERS extends StateEngineSetters
> = (
    setState: Dispatch<SetStateAction<STATE>>
) => SETTERS;

export type StateEngineConfigProps<
    STATE,
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters
> = {
    initialState: STATE;
    gettersGenerator: StateEngineGettersGenerator<STATE, GETTERS>;
    settersGenerator: StateEngineSettersGenerator<STATE, SETTERS>;
}

export type StateEngineConfig<
    STATE,
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters
> = {
    initialState: STATE;
    gettersGenerator: StateEngineGettersGenerator<STATE, GETTERS>;
    settersGenerator: StateEngineSettersGenerator<STATE, SETTERS>;
}

export function createStateEngine<
    STATE,
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters
>(
    stateEngineConfig: StateEngineConfigProps<
        STATE,
        GETTERS,
        SETTERS
    >
): StateEngineConfig<
    STATE,
    GETTERS,
    SETTERS
> {
    return stateEngineConfig;
}

export type StateEngine<
    STATE,
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters
> = {
    state: STATE;
    getters: GETTERS;
    setters: SETTERS;
}

export function useStateEngine<
    STATE,
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters
>(
    {
        initialState,
        gettersGenerator,
        settersGenerator
    }: StateEngineConfig<
        STATE,
        GETTERS,
        SETTERS
    >
): StateEngine<
    STATE,
    GETTERS,
    SETTERS
> {
    const [state, setState] = useState(initialState);
    const getters = gettersGenerator(state);

    const setters = settersGenerator(setState);
    
    return {
        state,
        getters,
        setters
    }
}
