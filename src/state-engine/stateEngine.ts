import _ from "lodash";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

// GETTERS

export type StateEngineGetters = {
    [p: string]: ((...args: any) => any) | StateEngineGetters;
}

export type StateEngineGettersGenerator<
    STATE,
    GETTERS extends StateEngineGetters
> = (
    state: STATE
) => GETTERS;

export type StateEngineGettersModifier<
    GETTERS extends StateEngineGetters,
    NEWGETTERS extends StateEngineGetters
> = (oldGetters: GETTERS) => NEWGETTERS


// SETTERS

export type StateEngineSetters = {
    [p: string]: ((...args: any) => any) | StateEngineSetters;
}

export type StateEngineSettersGenerator<
    STATE,
    SETTERS extends StateEngineSetters
> = (
    setState: Dispatch<SetStateAction<STATE>>
) => SETTERS;

export type StateEngineSettersModifer<
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters,
    NEWSETTERS extends StateEngineSetters
> = (oldGetters: GETTERS, oldSetters: SETTERS) => NEWSETTERS;


// STATE ENGINE

export type StateEngineGenerator<
    STATE,
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters
> = (state: STATE, setState: Dispatch<SetStateAction<STATE>>) => StateEngine<
    GETTERS,
    SETTERS
>

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
    generator: StateEngineGenerator<STATE, GETTERS, SETTERS>;
}

export type StateEngine<
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters
> = {
    getters: GETTERS;
    setters: SETTERS;
}


// UTILITIES

function buildGenerator<
    STATE,
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters
>({
    gettersGenerator,
    settersGenerator
}: Pick<StateEngineConfigProps<STATE, GETTERS, SETTERS>, "gettersGenerator" | "settersGenerator">): StateEngineGenerator<STATE, GETTERS, SETTERS> {
    return (state, setState) => {
        const getters = gettersGenerator(state);
        const setters = settersGenerator(setState);

        return {
            getters,
            setters
        }
    }
}

export function createStateEngine<
    STATE,
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters
>(
    {
        initialState,
        ...generators
    }: StateEngineConfigProps<
        STATE,
        GETTERS,
        SETTERS
    >
): StateEngineConfig<
    STATE,
    GETTERS,
    SETTERS
> {
    return {
        initialState,
        generator: buildGenerator(generators)
    }
}

export function useStateEngine<
    STATE,
    GETTERS extends StateEngineGetters,
    SETTERS extends StateEngineSetters
>(
    {
        initialState,
        generator
    }: StateEngineConfig<
        STATE,
        GETTERS,
        SETTERS
    >
): StateEngine<
    GETTERS,
    SETTERS
> {
    const [state, setState] = useState(initialState);
    return generator(state, setState);
}

export type StateEngineConfigs = {
    [p: string]: StateEngineConfig<any, any, any>;
}

export type MergeStateEngineStates<
    ENGINES extends StateEngineConfigs
> = {
    [p in keyof StateEngineConfigs]: ENGINES[p]["initialState"];
}

export type MergeStateEngineProps<
    ENGINES extends StateEngineConfigs,
    KEY extends "getters" | "setters"
> = {
    [p in keyof ENGINES]: ReturnType<ENGINES[p]["generator"]>[KEY];
}

export function mergeStateEngines<
    ENGINES extends StateEngineConfigs,
    NEWGETTERS extends StateEngineGetters,
    NEWSETTERS extends StateEngineSetters
>(
    {
        engines,
        gettersModifier,
        settersModifier
    }: {
        engines: ENGINES,
        gettersModifier: StateEngineGettersModifier<
            MergeStateEngineProps<ENGINES, "getters">,
            NEWGETTERS
        >,
        settersModifier: StateEngineSettersModifer<
            MergeStateEngineProps<ENGINES, "getters">,
            MergeStateEngineProps<ENGINES, "setters">,
            NEWSETTERS
        >
    }
): StateEngineConfig<
    MergeStateEngineStates<ENGINES>,
    NEWGETTERS,
    NEWSETTERS
> {
    return {
        initialState: _.mapValues(engines, (engine) => engine.initialState),
        generator: (state, setState) => {
            const setStateByField = useMemo(() => {
                return _.mapValues(engines, (engine, engineKey) => {
                    return (value: SetStateAction<typeof engine["initialState"]>) => setState((prevState) => {
                        return {
                            ...prevState,
                            [engineKey]: value instanceof Function ? value(prevState[engineKey]) : value
                        }
                    })
                })
            }, []);
            const generatedEngines = _.mapValues(engines, (engine, engineKey) => {
                return engine.generator(state[engineKey], setStateByField[engineKey])
            });

            const rawGetters = useMemo(() => {
                return _.mapValues(generatedEngines, (generatedEngine) => generatedEngine.getters)
            }, _.values(_.mapValues(generatedEngines, generatedEngine => generatedEngine.getters)));

            const rawSetters = useMemo(() => {
                return _.mapValues(generatedEngines, (generatedEngine) => generatedEngine.setters)
            }, _.values(_.mapValues(generatedEngines, generatedEngine => generatedEngine.setters)));

            const setters = settersModifier(rawGetters, rawSetters);

            const getters = gettersModifier(rawGetters);

            return {
                setters,
                getters
            }
        }
    }
}
