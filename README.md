# Overview

The React State Engine is a library meant to allow for complex state management using included getters and setter.

## MVP

* State Engine:
    * State: any
    * Getters: StateEngineGetters
    * Setters: StateEngineSetters
* State Engine Getters: { [p: string]: (...args: any) => any | StateEngineGetters }
* State Engine Setters: { [p: string]: (...args: any) => any | StateEngineSetters }
* Merging State Engines: Allows for existing State Engines to be merged into a larger State Engine by nesting the Child State Engines under specific keys
    * While nesting remapping/redefining methods could be useful (ex: a light switch effects 1+ lights, so a Light Switch State Engine could be reworked to run methods from a Light State Engine, allowing for them to be written agnostic of each other until joining)

## Future Features

* Implement internal memoization instead of relying on developer to implement
    * Getters Generator: Updates based on state needed per getter (open ended)
    * Setters Generator: The setters don't appear to need to update as setState provides the needed data. Memoization only needed if setter accepts args: (...args: any) => any, otherwise unneeded.