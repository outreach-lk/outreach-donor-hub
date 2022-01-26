/**
 * Cross Environment Data Access Object for Causes
**/

import { AuditableCauseDto, CauseDto } from "../../types/dtos/cause.dtos";
import { FileDto } from "../../types/dtos/remote.file.dtos";
import { Entity } from "../../types/enums/entities";
import { OwnablePermissions } from "../../types/ownable";
import BaseDAO from "./base.dao";
import User from "./user.dao";

export default class Cause extends BaseDAO{
    causeId: string;
    user: User;
    title: string;
    description: string;
    attachments: FileDto[] | null;

    constructor(causeDto:AuditableCauseDto){
        super(causeDto.id, Entity.CAUSE);
        this.causeId = causeDto.id;
        this.user = new User(causeDto.owner);
        this.title = causeDto.title
        this.description = causeDto.description
        this.attachments = causeDto?.attachments
        this.createdOn = causeDto.createdOn?causeDto.createdOn:null;
        this.createdBy = causeDto.createdBy?new User(causeDto.createdBy):undefined;
        this.updatedOn = causeDto.updatedOn;
        this.updatedBy = causeDto.updatedBy? new User(causeDto.updatedBy):undefined;
        this.permissions = causeDto.permissions;
        this.sharedWith = causeDto.sharedWith?.map(dto=>new User(dto));
    }




} 