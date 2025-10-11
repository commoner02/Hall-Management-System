import { Types } from "mongoose";

export enum IROLE {
    student="student",
    manager="manager",
    admin="admin"
}

export enum IStatus{
    on="On",
    off="Off"
}

export interface IUser {
     _id?: Types.ObjectId,
    name: string,
    email: string,
    password: string,
    role: IROLE,
    mealStatus: IStatus
}