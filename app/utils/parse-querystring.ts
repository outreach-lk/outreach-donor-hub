/**
 * parses searchparameters and returns a key pair value
 * fixme: change datastructure and move to utils
 */
export function passQueryMapString(query: string): Map<string, string | number> {
    const map = new Map<string, string|number>();
    query.split(',').forEach(pair => {
        if(pair.includes('|')){
            const [key,value] = pair.split('|');
            map.set(key,value) //todo: parse number like strings to number 
        }else{
            // log.
        }
    })
    return map;
}

export function queryMap2string(map: Map<string, string|number>):string{
    let str:string[] = [];
    map.forEach((v,k)=> {
         str.push(`${k}|${v}`);
    })
    return str.join(',')
}
export function getMultipleValuesFromArray(items: any[] | any[] | any):string{
    if(Array.isArray(items)){
        return items.join("OR");
    }else{
        return items;
    }
}