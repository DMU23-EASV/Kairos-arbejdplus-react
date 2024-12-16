import {ETaskStatus} from "../Enum/ETaskStatus";
import { ObjectId, ObjectIdLike } from 'bson';

export class TaskModel{

    public id?: ObjectIdLike;
    public name?: string;
    public remark?:string;
    public modelStatus?:ETaskStatus;
    public owner?:string;
    public comment?:string;
    public selecteDate?:Date;
    public startTime?:Date;
    public endTime?:Date;
    public startKilometers?:number;
    public endKilometers?:number;

}