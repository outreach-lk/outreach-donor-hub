import BaseClientFactory from "../../../app/apis/base.client.factory";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMockClient {
    provider: MockProvider
}
export enum MockProvider {
    PROVIDER1,
    PROVIDER2,
}

class Provider1MockClient implements IMockClient{
    provider: MockProvider = MockProvider.PROVIDER1;
}
class Provider2MockClient implements IMockClient{
    provider: MockProvider = MockProvider.PROVIDER2;
}

export default class MockClientFactory extends BaseClientFactory<IMockClient, MockProvider>{
    protected createClient(provider?: MockProvider): IMockClient {
        switch(provider){
            default:
            case MockProvider.PROVIDER1:
                return new Provider1MockClient();
            case MockProvider.PROVIDER2:
                return new Provider2MockClient();
        }
    }

}