import { getConfig } from "../config";
import { CauseDto } from "../types/dtos/cause.dtos";

export function getCauseShareUrl(cause:CauseDto):string{
    if(cause.id){
        return getConfig().appUrl + '/cause/' + cause.id 
    }else{
        throw new Error('no_cause_id')
    }
}