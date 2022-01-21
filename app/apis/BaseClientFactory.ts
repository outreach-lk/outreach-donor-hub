/** 
 * All api client factories should extend this
 * Each factory will only create a single client.
 */
export default abstract class BaseClientFactory<T,P> {
    private _client:T | null= null;
    protected abstract createClient(provider:P): T;
    public getClient(provider:P){
        if(this._client === null){
            this._client = this.createClient(provider);
        }
        return this._client
    }
}