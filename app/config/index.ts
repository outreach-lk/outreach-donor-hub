
import { AppConfig } from "../types/config";
import { devConfig } from "./config.dev";
import { stagingConfig } from "./config.staging";



/**
 * Returns the application config based on the current stage.
 * TODO: consider other stages too
 */
export function getConfig(): AppConfig {
    if (process.env.NEXT_PUBLIC_STAGE === 'prod') {
        return {} as AppConfig;
    } else if (process.env.NEXT_PUBLIC_STAGE === 'staging') {
        return stagingConfig;
    } else {
        return devConfig;
    }
}