import MultiEnv from "../data/multi.env";

/** 
 * All api service factories should extend this
 * Each factory will only create a single service.
 */
export default abstract class BaseServiceFactory<T,P> extends MultiEnv {
    private _service:T | null= null;
    /**
     * A factory class for creating serverside service instances.
     * @param serverPrivateKey serverside key required to initialize the services
     * @param provider provider of a given service, where applicable.
     */
    protected abstract createService(serverPrivateKey:string, provider?:P): T;
    public getService(serverPrivateKey:string, provider?:P){
        if(this._service === null){
            this._service = this.createService(serverPrivateKey, provider);
        }
        return this._service
    }
}