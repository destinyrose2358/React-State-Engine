import type { Dispatch, SetStateAction } from "react";

export type State = {
    [p: string]: any;
}

type Getter = (...args: any[]) => any;
export type Getters = Record<string, Getter> | void;

type Setter = (...args: any[]) => any;
export type Setters = Record<string, Setter> | void;

export type StateEngineConfig<
    STATE extends State,
    GETTERS extends Getters,
    SETTERS extends Setters,
    MODULES extends StateEngineConfigs
> = {
    initialState: STATE;
    getters: (state: STATE) => GETTERS;
    setters: (setState: Dispatch<SetStateAction<STATE>>) => SETTERS;
    modules: MODULES;
}

export type StateEngineConfigs = {
    [p: string]: StateEngineConfig<any, any, any, any>;
}

export type SEConfigsToSE<
    CON extends StateEngineConfigs
> = {
    [p in keyof CON]: StateEngine<ReturnType<CON[p]["getters"]>, ReturnType<CON[p]["setters"]>, SEConfigsToSE<CON[p]["modules"]>>
}

export type StateEngine<
    GETTERS extends Getters,
    SETTERS extends Setters,
    MODULES extends StateEngines
> = GETTERS & SETTERS & MODULES;

type StateEngines = Record<string, StateEngine<any, any, any>>;

export function createStateEngine<
    STATE extends State,
    GETTERS extends Getters,
    SETTERS extends Setters,
    MODULES extends StateEngineConfigs
>(
    config: StateEngineConfig<
        STATE,
        GETTERS,
        SETTERS,
        MODULES
    >
) {
    return config;
}
