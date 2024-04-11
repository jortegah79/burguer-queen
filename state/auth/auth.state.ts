import { AuthService } from './../../src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, StateStream, Selector } from '@ngxs/store';
import { Login } from './auth.actions';
import { TokenUser } from 'src/app/models/token-user.models';
import { Preferences } from '@capacitor/preferences';
import { KEY_TOKEN } from 'src/app/constants/constants';

export class AuthStateModel {
  public success: boolean;
}

const defaults = {
  success: false
};

@State<AuthStateModel>({
  name:'Auth',
  defaults
})

@Injectable()
export class AuthState {

  @Selector()
  static success(state:AuthStateModel){
    return state.success;
  }

  constructor(private authService:AuthService){}

  @Action(Login)
  login({ getState, setState }: StateContext<AuthStateModel>, { payload }: Login) {
    return this.authService.login(payload.email,payload.password).then( (token:TokenUser)=>{
        if( token){
          Preferences.set({
            key:KEY_TOKEN,
            value:token.accessToken
          });
          setState({
            success:true
          })
        }else{
          setState({
            success:false
          })
        }
    }).catch(err=>{
      setState({
        success:false
      })
    })

  }
}
