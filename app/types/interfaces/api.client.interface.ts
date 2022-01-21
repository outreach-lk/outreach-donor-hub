/** All API Clients must implement this interface */
export interface IAPIClient<T>{
    accessToken: string | undefined;
    refreshToken: string | undefined;
    provider:T | undefined
}