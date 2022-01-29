import Cause from "./cause.entity";
import CauseRepo from "../repos/cause.repo";
import { CauseDto } from "../../types/dtos/cause.dtos";
import { EntityUpdatedDto } from "../../types/dtos/server.message.dtos";
import { Auditable } from "../../types/auditable";
import { Ownable } from "../../types/ownable";

const cause:Cause = new Cause({
    id: "hello",
    title: 'Sample Cause',
    description: 'Sample Desc.',
    attachments: [],
    donations: []
})

describe("Creates Cause Entity and run CRUD methods on it", () => {
    beforeAll(() => {
        // Mock Update on CauseRepo
        jest.spyOn(CauseRepo.prototype,'update')
        .mockImplementation((_i:string,data:CauseDto)=>Promise.resolve(
            {data:{
                ...data,
                updatedOn: new Date(),
            }} as EntityUpdatedDto<Auditable & Ownable & CauseDto>) )
        // Mock Create on CauseRepo 
        jest.spyOn(CauseRepo.prototype,'create')
        .mockImplementation((data:CauseDto)=>Promise.resolve({
            data:{
                ...data,
                id:"NEW_CAUSE_01",
                createdOn: new Date(),
                }} as EntityUpdatedDto<Auditable & Ownable & CauseDto>) )
        // mock delete on causerepo
        jest.spyOn(CauseRepo.prototype, 'delete')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation((_id:string)=>Promise.resolve({
            data: {
                isDeleted: true,
                deletedOn: new Date()
            }
        } as EntityUpdatedDto<Auditable & Ownable & CauseDto>))
    })

    it("Update method should update properties in return value and cause instance", (done)=>{
        const $update = jest.spyOn(cause,'update')
        cause.title = "New Cause Title";
        cause.update()
        .then((data)=>{
            expect($update).toBeCalled();
            expect(data.data?.title).toEqual(cause.title);
            expect(cause.updatedOn).toEqual(data.data?.updatedOn);
            done();
        })
        .catch(done)
    });

    it("When Created id should be updated",(done) => {
        const cause = new Cause({
            title: "New Cause",
            description: "This cause is new",
            attachments: [],
            donations: []
        })
        const $create = jest.spyOn(cause,'create');
        cause.create()
        .then((res) => {
            console.log(res);
            expect($create).toHaveBeenCalled();
            expect(cause.id).toEqual("NEW_CAUSE_01");
            expect(cause.createdOn).toEqual(res.data?.createdOn);
            done()
        })
        .catch(done)
    })

    it("When deleted set isDeletedRemotely to true", (done)=>{
        const $delete = jest.spyOn(cause,'delete');
        cause.delete()
        .then(res => {
            expect($delete).toHaveBeenCalled();
            expect(res.data?.isDeleted).toBeTruthy();
            expect(cause.isDeleted).toBeTruthy();
            done();
        })
        .catch(done)
    })
})


