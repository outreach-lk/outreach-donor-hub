/**
 * Cross Environment Data Access Object for Users
 **/

import { Auditable } from "../../types/auditable";
import {
  AuditableUserDto,
  UserDto,
  UserRole,
  UserVerificationDto,
} from "../../types/dtos/user.dtos";
import UserRepo from "../repos/user.repo";
import BaseEntity from "./base.entity";

export default class User extends BaseEntity<User, UserDto> {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile?: string;
  isMobileVerified?: boolean;
  isEmailVerified: boolean;
  isVerifiedUser: boolean;
  verification?: UserVerificationDto;
  role?: UserRole;
  customPermissions?: Permissions[];

  constructor(user: AuditableUserDto) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    super(UserRepo.getRepo(), User.map2Dto, User.mapFromDto);
    this._id = user.uid; // is equal to uid but protected.
    this.uid = user.uid; // is public
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.mobile = user.mobile;
    this.isEmailVerified = user.isEmailVerified;
    this.isVerifiedUser = user.isVerifiedUser;
    this.verification = user.verification;
    this.role = user.role;
    this.customPermissions = user.custsomPermissions;
  }

  /** Mappers */
  /**
   * Maps User instance to User Dto
   * @param user
   * @returns
   */
  static map2Dto(user: User): UserDto {
    return {
      ...user,
    } as UserDto;
  }
  /**
   * maps user dto to existing user intance.
   * @param dto
   * @param user
   */
  static mapFromDto(dto: Auditable & UserDto, user: User): void {
    user.email = dto.email || user.email;
    user.firstName = dto.firstName || user.firstName;
    user.lastName = dto.lastName || user.lastName;
    user.mobile = dto.mobile || user.mobile;
    user.isEmailVerified = dto.isEmailVerified || user.isEmailVerified;
    user.isVerifiedUser = dto.isVerifiedUser || user.isVerifiedUser;
    user.verification = dto.verification || user.verification;
    user.role = dto.role || user.role;
    user.createdOn = dto.createdOn || user.createdOn;
    user.createdBy = dto.createdBy ? new User(dto.createdBy) : user.createdBy;
    user.updatedOn = dto.updatedOn || user.updatedOn;
    user.updatedBy = dto.updatedBy ? new User(dto.updatedBy) : user.updatedBy;
    user.isDeleted = dto.isDeleted || user.isDeleted;
    user.deletedOn = dto.deletedOn || user.deletedOn;
    user.deletedBy = dto.deletedBy ? new User(dto.deletedBy) : user.deletedBy;
  }

  /**
   * adds a list of custom permisssions to this user.
   * $server only method
   * @param permissions array of custom permissions
   */
  $serverAddCustomPermission(permissions: Permissions[]): Promise<void> {
    if (this.isNode && this._id) {
      this.customPermissions =  Array.from(new Set(this.customPermissions?.concat(permissions)))
      void this.repo.update(this._id, this.mapper(this));
      throw new Error("Not fully implemented");
    } else {
      throw new Error();
    }
  }
}
