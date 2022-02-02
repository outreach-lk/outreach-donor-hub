import MockClientFactory, { MockProvider } from "./base.client.factory.mock";

describe("Create Mock Client from BaseClientFactory", ()=>{
    
    it("If the mock client has not been created, call create client", () => {
        const mockClientFactory:MockClientFactory = new MockClientFactory();
        // spies
        const spy = jest.spyOn(mockClientFactory,<keyof MockClientFactory>'createClient');
        mockClientFactory.getClient(MockProvider.PROVIDER1);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("If the mock client has been created once, reuse it; do not call create client again.", ()=>{
        const mockClientFactory:MockClientFactory = new MockClientFactory();
        // spies
        const spy = jest.spyOn(mockClientFactory,<keyof MockClientFactory>'createClient');
        const client1 = mockClientFactory.getClient(MockProvider.PROVIDER1);
        const client2 = mockClientFactory.getClient(MockProvider.PROVIDER1);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(client1===client2).toBeTruthy();
    });

    it("If no provider is specified return default client", ()=>{
        const mockClientFactory:MockClientFactory = new MockClientFactory();
        const client = mockClientFactory.getClient();
        expect(client.provider).toEqual(MockProvider.PROVIDER1);
    });

    it("Do not allow creating clients of multiple providers", ()=>{
        const mockClientFactory:MockClientFactory = new MockClientFactory();
        let client = mockClientFactory.getClient(MockProvider.PROVIDER1);
        client = mockClientFactory.getClient(MockProvider.PROVIDER2);
        expect(client.provider).toEqual(MockProvider.PROVIDER1);
    });


})