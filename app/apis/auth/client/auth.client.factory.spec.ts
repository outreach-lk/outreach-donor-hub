import { AuthProvider } from "../../../types/enums/providers";
import AuthClientFactory from "./AuthClientFactory";

describe("Create Auth Client", ()=>{
    const authFactory:AuthClientFactory = new AuthClientFactory();
    // spies
    const spy = jest.spyOn(authFactory,<keyof AuthClientFactory>'createClient');

    it("If the auth client has not been created, call create client", () => {
        authFactory.getClient(AuthProvider.FIREBASE);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("If the auth client has been created once, do not call create client again", ()=>{
        authFactory.getClient(AuthProvider.FIREBASE);
        expect(spy).toHaveBeenCalledTimes(1);
    });


})
