/* eslint-disable @typescript-eslint/unbound-method */
import { AuthProvider } from "../../../types/providers/auth";
import AuthClientFactory from "../AuthClientFactory";

describe("Create Auth Client", ()=>{
    const authFactory:AuthClientFactory = new AuthClientFactory();
    // spies
    jest.spyOn(authFactory,'createClient');

    it("If the auth client has not been created, call create client", () => {
        authFactory.getClient(AuthProvider.FIREBASE);
        expect(authFactory.createClient).toHaveBeenCalledTimes(1);
    });

    it("If the auth client has been created once, do not call create client again", ()=>{
        authFactory.getClient(AuthProvider.FIREBASE);
        expect(authFactory.createClient).toHaveBeenCalledTimes(1);
    });

    // TODO: What should be the behaviour if a client is requested with a different provider?

})
