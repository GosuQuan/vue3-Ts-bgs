interface dataType {
  token: string;
}
export interface loginResponseData {
  code: number;
  data: dataType;
}
export interface loginFormData {
  username: string;
  password: string;
}
interface user {
  checkUser: userInfo;
}
//define type of user
interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}

export interface userResponseData {
  code: number;
  data: user;
}
