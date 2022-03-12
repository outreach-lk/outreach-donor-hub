/**
 * Returns the config based on the current environment.
 */

import { AppConfig } from "../types/config";
import {devConfig} from "./config.dev";

export function getConfig(): AppConfig {
    if( process.env.NEXT_PUBLIC_STAGE === 'prod'){
        return {} as AppConfig;
    } else {
        return devConfig;
    }
}