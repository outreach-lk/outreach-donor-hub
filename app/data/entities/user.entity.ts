/* eslint-disable @typescript-eslint/unbound-method */
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
  customPermissions: Permissions[];

  constructor(user: AuditableUserDto) {
    super(UserRepo.getRepo(), User.map2Dto);
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
    this.customPermissions = user.customPermissions;
  }

  /** Mappers */
  /**
   * Maps User instance to User Dto
   * @param user
   * @returns
   */
  static map2Dto(user: User): UserDto {

    return {
      customPermissions: user.customPermissions,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailVerified: user.isEmailVerified,
      isVerifiedUser: user.isVerifiedUser,
      uid: user.uid,
      isMobileVerified: user.isMobileVerified,
      mobile: user.mobile,
      role: user.role,
      verification: user.verification
    } as UserDto;
  }
  /**
   * maps user dto to existing user intance.
   * @param dto
   * @param user
   */
   mapInstanceToDto(dto: Auditable & UserDto, user: User): void {
    user.email = dto.email || user.email;
    user.firstName = dto.firstName || user.firstName;
    user.lastName = dto.lastName || user.lastName;
    user.mobile = dto.mobile || user.mobile;
    user.isEmailVerified = dto.isEmailVerified || user.isEmailVerified;
    user.isVerifiedUser = dto.isVerifiedUser || user.isVerifiedUser;
    user.verification = dto.verification || user.verification;
    user.role = dto.role || user.role;
    user.createdOn = dto.createdOn || user.createdOn;
    user.createdBy = dto.createdBy || user.createdBy;
    user.updatedOn = dto.updatedOn || user.updatedOn;
    user.updatedBy = dto.updatedBy || user.updatedBy;
    user.isDeleted = dto.isDeleted || user.isDeleted;
    user.deletedOn = dto.deletedOn || user.deletedOn;
    user.deletedBy = dto.deletedBy || user.deletedBy;
  }

  static async getUserByUid(uid:string): Promise<User>{
    return await UserRepo.getRepo().get(uid)
    .then(res=>{
      return new User(res.data as AuditableUserDto);
    })
    .catch(error=>{
      throw error;
    })
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
