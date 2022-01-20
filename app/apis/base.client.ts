/** 
 * API Clients of all providers must extend this class 
 */

export class BaseAPIClient{
    private _accessToken:string|null = null;
    private _refreshToken: string|null = null;

    protected static _instance: BaseAPIClient|null = null;
    
    public static get instance() {
        if(BaseAPIClient._instance === undefined) {
            BaseAPIClient._instance = new BaseAPIClient();
        }
        return BaseAPIClient._instance;
    }

    public set accessToken(accessToken:string){
        this._accessToken = accessToken;
    }

    public set refreshToken(refreshToken: string){
        this._refreshToken = refreshToken;
    }

    
}