/**
 * Parent Class for Multi Environment Entities.
 * Entities intended to be used on client and server must extend this class
 * or implement their own logic to detect environment.
 */
export default class MultiEnvEntity{
    protected isNode: boolean;
    protected isBrowser: boolean;
    constructor(){
        this.isNode = (typeof window === undefined);
        this.isBrowser = !this.isNode;
    }

}