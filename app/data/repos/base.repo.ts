/** 
 * Parent Class for Cross Environment Data Items 
*/

export default class BaseRepo {
    protected isNode: boolean;
    protected isBrowser: boolean;

    constructor(){
        this.isNode = (typeof window === undefined);
        this.isBrowser = !this.isNode;
    }


}