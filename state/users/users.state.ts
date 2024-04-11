import { UserOrderService } from './../../src/app/services/user-order.service';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CreateUser, GetUser } from './users.actions';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.models';

export class UsersStateModel {
  public success: boolean;
}

const defaults = {
  success: false,
};

@State<UsersStateModel>({
  name: 'success',
  defaults,
})
@Injectable()
export class UsersState {
  @Selector()
  static success(state: UsersStateModel) {
    return state.success;
  }

  constructor(
    private usersService: UsersService,
    private userOrderService: UserOrderService
  ) {}
  @Action(GetUser)
  get(
    { getState, setState }: StateContext<UsersStateModel>,
    { payload }: GetUser
  ) {
    return this.usersService.getUser(payload.email).then((user: User) => {
      this.userOrderService.saveUser(user);
    });
  }

  @Action(CreateUser)
  create(
    { getState, setState }: StateContext<UsersStateModel>,
    { payload }: CreateUser
  ) {
    return this.usersService
      .createUser(payload.user)
      .then((success: boolean) => {
        setState({success})
      });
  }
}
