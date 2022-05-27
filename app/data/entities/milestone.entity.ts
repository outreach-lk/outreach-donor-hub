/* eslint-disable @typescript-eslint/unbound-method */
/**
 * Cross Environment Data Access Object for Milestones
 **/

import { Auditable } from "../../types/auditable";
import { ClaimEvidenceDto } from "../../types/dtos/claim-evidence";
import { MilestoneDto } from "../../types/dtos/milestone.dtos";
import { FileDto } from "../../types/dtos/remote-file.dtos";
import { MilestoneStatus } from "../../types/enums/status";
import { Ownable } from "../../types/ownable";
import { SerializableBlock } from "../../ui/components/modules/wyswyg-editor";
import MilestoneRepo from "../repos/milestone.repo";
import BaseEntity from "./base.entity";

export default class Milestone extends BaseEntity<Milestone, MilestoneDto>  {
    causeId: string;
    title: string;
    description: SerializableBlock[];
    status?: MilestoneStatus
    attachments?: FileDto[];
    constructor(dto: MilestoneDto){
        super(MilestoneRepo.getRepo(), Milestone.map2dto)
        this.causeId = dto.causeId;
        this.title = dto.title;
        this.description = dto.description;
        this.status = dto.status || MilestoneStatus.CREATED;
        this.attachments = dto.attachments || []
    }
    updateInstanceWithDto(dto: Auditable & Ownable & { causeId: string; title: string; description: SerializableBlock[]; status: MilestoneStatus;  attachments?: FileDto[]  }, entity: Milestone): void {
        entity.causeId = dto.causeId || entity.causeId;
        entity.title = dto.title || entity.title;
        entity.description = dto.description || entity.description;
        entity.status = dto.status || entity.status;
        entity.attachments = dto.attachments || entity.attachments;
    }

    static map2dto(entity:Milestone):MilestoneDto{
        return {
            causeId: entity.causeId,
            title: entity.title,
            description: entity.description,
            status: entity.status,
            attachments: entity.attachments
        }
    }

}
