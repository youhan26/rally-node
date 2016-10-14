/**
 * Created by YouHan on 2016/10/14.
 */
/* @flow */
export type res = {
    success : boolean,
    data : any,
    reason : string
}

export type memberData  =[{
    name : string,
    id : number,
    role_id : number,
    introduction : string
}]

export type event = {
    target : {
        value : any
    }
}