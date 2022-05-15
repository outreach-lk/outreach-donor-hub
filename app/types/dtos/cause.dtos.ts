/**
* Defines dtos relevant to Causes
*/

import { Auditable } from "../auditable";
import { Pagable } from "../pagable";
import { FileDto } from "./remote-file.dtos";
import { Ownable } from "../ownable";
import { ServerError } from "./server-message.dtos";
import { EntityCreatedDto } from "./server-message.dtos";
import { EntityUpdatedDto } from "./server-message.dtos";
import Donation from "../../data/entities/donation.entity";
import { DonationDto } from "./donation.dtos";
import { BankAccountDetails } from "./bank-details.dto";
import { Currency } from "../enums/currency";
import { SerializableBlock } from "../../ui/components/modules/wyswyg-editor";
import { Consent } from "./consent";
import { VerificationStatus } from "../enums/status";

export type CauseDto = Ownable & {
    title: string,
    description: SerializableBlock[],
    attachments: FileDto[],
    donations?: DonationDto[],
    currentCollection: {
        acknowledged: number,
        pending: number
    }
    expenses: {
        confirmed: number,
        pending: number,
    }
    bankAccount: BankAccountDetails;
    target?: number;
    currency?: Currency;
    expiry?: Date
    ownersConsent?: Consent,
    isVerified?: boolean;
    verificationStatus?: VerificationStatus
}

export type CausePage = Pagable<CauseDto>

export type CauseCreatedDto = EntityCreatedDto<AuditableCauseDto | ServerError>;
export type CauseUpdatedDto = EntityUpdatedDto<AuditableCauseDto | ServerError>;


/** Auditable Dtos */
export type AuditableCauseDto = CauseDto & Auditable;