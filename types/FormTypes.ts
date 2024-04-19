import { ErrorOption } from "react-hook-form";

export type InputFieldT = {
    type:string,
    placeholder:string,
    label?:string,
    name:string,
    register:any,
    className?:string,
    error:undefined | ErrorOption
}