export default abstract class APIClientFactory<T,P> {
    private _client:T | null= null;
    abstract createClient(provider:P): T;
    public getClient(provider:P){
        if(this._client === null){
            this._client = this.createClient(provider);
        }
        return this._client
    }
}