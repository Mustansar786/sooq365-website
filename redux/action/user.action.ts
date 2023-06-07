import * as type from 'redux/action/type/user';
import {UserI} from 'redux/reducer/user.reducer'

export const setUserDetail = (user:UserI) => ({
    type: type.SET_USER_DETAIL,
    payload: {
        user
    }
});