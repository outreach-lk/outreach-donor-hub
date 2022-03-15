/** All API serverside services should implement this interface */
export default interface IAPIService {
    /**
     * Private key to use for any generic cryptographic operationss
     * eg: Request verification, token signing etc.
     */
    serverPrivateKey: string
}