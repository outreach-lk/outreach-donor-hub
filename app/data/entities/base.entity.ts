/**
 * Parent Class for Cross Environment Data Entities
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 */

import { Auditable } from "../../types/auditable";
import {
  EntityCreatedDto,
  EntityDeletedDto,
  EntityUpdatedDto,
} from "../../types/dtos/server-message.dtos";
import { UserDto } from "../../types/dtos/user.dtos";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { OwnablePermissions } from "../../types/ownable";
import MultiEnv from "../multi.env";

export default abstract class BaseEntity<E, D> extends MultiEnv {
  protected repo: ICRUDREPO<D>;
  protected mapper: (e: E) => D;
  protected _id?: string;
  owner?: string;
  createdOn?: Date | null;
  createdBy?: string;
  updatedOn?: Date;
  updatedBy?: string;
  permissions?: OwnablePermissions;
  sharedWith?: string[];
  isDeleted?: boolean;
  deletedOn?: Date;
  deletedBy?: string;

  /**
   *
   * @param repo entity repository to perform CRUD operations
   * @param mapper entity to dto mapper
   * @param reverseMapper dto to entity mapper
   * @param id serverside identity of the entity
   */
  constructor(repo: ICRUDREPO<D>, mapper: (e: E) => D) {
    super();
    this.repo = repo;
    this.mapper = mapper;
  }
  public get id(): string | undefined {
    return this._id;
  }
  protected set id(id: string | undefined) {
    this._id = id;
  }

  /**
   * Updates an existing entity instance with a dto.
   * @param d
   * @param e
   */
  abstract updateInstanceWithDto(dto: Auditable & D, entity: E): void;

  /**
   * Persists the current entity in the database as a new entity.
   * @returns
   */
  create(): Promise<EntityCreatedDto<Auditable & D>> {
    try {
      if (this._id) {
        throw new Error();
      } else {
        const createRes = this.repo.create(this.mapper(this as unknown as E));
        //  updates current entity instance.
        void createRes.then((res) =>
          this.updateInstanceWithDto(res.data as D, this as unknown as E)
        );
        return createRes;
      }
    } catch (error) {
      throw new Error();
    }
  }

  /**
   * Persists changes to the current entity in an existing database entry
   * @param d optional data (will override and overwrite current instance properties)
   */
  update(d?: D): Promise<EntityUpdatedDto<Auditable & D>> {
    try {
      if (this._id) {
        const updateRes = this.repo.update(
          this._id,
          d || this.mapper(this as unknown as E)
        );
        //  updates current entity instance.
        void updateRes.then((res) =>
          this.updateInstanceWithDto(res.data as D, this as unknown as E)
        );
        return updateRes;
      } else {
        throw new Error("invalid_identifier");
        // TODO: Implement sub-routine to call create() and update current entity
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
  delete(): Promise<EntityDeletedDto<Auditable & D>> {
    try {
      if (this.id) {
        const deleteRes = this.repo.delete(this.id);
        void deleteRes.then((res) =>
          this.updateInstanceWithDto(res.data as D, this as unknown as E)
        );
        return deleteRes;
      } else {
        throw new Error("invalid_identifier");
      }
    } catch (error) {
      throw new Error();
    }
  }

  /** CRUD Methods */

  /** Server Exclusive Base Functions */
  /** Share Entity With Users*/
  $serverShareWith(users: UserDto[]) {
    if (this.isNode) {
      //TODO: Implement Sharing
      console.log(users);
    } else {
      throw new Error();
    }
  }
  /** Set Permissions on Object */
  $serverSetPermissions(permissions: OwnablePermissions): void {
    if (this.isNode) {
      //TODO: Implement Permissios
      console.log(permissions);
    } else {
      throw new Error();
    }
  }
}
