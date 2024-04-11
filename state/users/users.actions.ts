import { User } from "src/app/models/user.models";

export class GetUser {
  static readonly type = '[Users] Get item';
  constructor(public payload: {email:string}) { }
}

export class CreateUser{
  static readonly type= '[Users] Create User';
  constructor(public payload:{user:User}){}
}
