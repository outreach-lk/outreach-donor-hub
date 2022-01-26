/**
 * Cross Environment Data Access Object for Users
**/

import { AuditableUserDto } from "../../types/dtos/user.dtos";
import { Entity } from "../../types/enums/entities";
import BaseEntity from "./base.entity";

export default class User extends BaseEntity{
    constructor(user:AuditableUserDto){
        super(Entity.USER,user.uid);
    }

} 