/**
 * Cross Environment Data Access Object for Causes
**/

import { Entity } from "../../types/enums/entities";
import BaseDAO from "./base.dao";
import User from "./user.dao";

export default class Cause extends BaseDAO{
    causeId: string;
    user: User
    constructor(
        causeId: string,
        user: User
    ){
        super(causeId, Entity.CAUSE);
        this.causeId = causeId;
        this.user = user;
    }

} 