/**
 * Hooks to use browser loggers and client telemetry.
 * @kulathilake
 */

export function useLogger(){
    return {
        log: console.log
    }
}

export function useTelemetry(){
    return {}
}