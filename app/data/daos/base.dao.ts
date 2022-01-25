/** 
 * Parent Class for Cross Environment Data Access Objects 
*/

export default class BaseDAO {
    protected isNode: boolean;
    protected isBrowser: boolean;

    constructor(){
        this.isNode = (typeof window === undefined);
        this.isBrowser = !this.isNode;
    }


}