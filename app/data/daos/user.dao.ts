/**
 * Cross Environment Data Access Object for Users
**/

import { AuditableUserDto, UserDto } from "../../types/dtos/user.dtos";
import { Entity } from "../../types/enums/entities";
import BaseDAO from "./base.dao";

export default class User extends BaseDAO{
    constructor(user:AuditableUserDto | UserDto){
        super(user.uid, Entity.USER);
    }

} 