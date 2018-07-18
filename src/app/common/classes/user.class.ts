import {UserLogginData} from '../interfaces/user.interface';

export class UserData {
 private userData: UserLogginData = {
   data: {
        ID: '',
        user_login: '',
        user_pass: '',
        user_nicename: '',
        user_email: '',
        user_url: '',
        user_registered: '',
        user_activation_key: '',
        user_status: '',
        display_name: ''
    },
    ID: null,
    caps: {
        subscriber: false
    },
    cap_key: '',
    roles: [],
    allcaps: {
        read: false,
        level_0: false,
        subscriber: false
    },
    filter: null
 };

 setUserData(userData: UserLogginData) {
  this.userData = userData;
  }
  getUserData(): UserLogginData  {
    return this.userData;
  }
}
