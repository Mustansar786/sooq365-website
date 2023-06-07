import produce from "immer";
import * as type from 'redux/action/type/user';





export interface UserI {
    user: {
        allowRoutes:any,
        isAdmin:boolean,
        userid: string,
        userType:string,
        email: string,
        first_name: string,
        last_name: string,
        phone: string
        international_license:boolean,
        verified_phone: boolean,
        verifiedEmail:boolean,
        vehicle_limit:number,
        profile:any,
        documents: {
            goverment: string,
            licens: string
        },
        status:string,
        selfie_image: string,
    },
    openPhoneVerificationModal?: boolean,
    update_selfie_image?: any,
    facebookUser?:{
        firstName?:"",
        lastName?:"",
        email?:""
    },
}

export interface UserActionI {
    type ?: string
}

export interface UserSagaPayload {
    type:UserActionI,
    payload:UserI
}

const initialState: UserI = {
    user: {
        allowRoutes:[],
        isAdmin:false,
        userid : "",
        userType:"",
        email : "",
        first_name : "",
        last_name : "",
        phone:"",
        profile:{},
        verified_phone:false,
        verifiedEmail:false,
        vehicle_limit:0,
        international_license:false,
        documents: {
            goverment: "",
            licens: ""
        },
        status:"",
        selfie_image:""
    },
    openPhoneVerificationModal:false,
    update_selfie_image :null,
    facebookUser:{
        firstName:"",
        lastName:"",
        email:""
    },
}

export const User = (state = initialState, action: UserSagaPayload) => produce(state, draft => {
    switch (action.type) {
        case type.SET_USER_DETAIL__: {
            if(state.user.isAdmin)
            draft.user ={...state.user,...action.payload.user}
            else
            draft.user = action.payload.user;
            draft.openPhoneVerificationModal = action.payload.user.verified_phone === true ? false : true
            break;
        } 
        case type.CLOSE_PHONE_MODAL__: {
            draft.openPhoneVerificationModal = false
            break;
        }

        case type.UPDATE_SELFIE_IMAGE__: {
            draft.update_selfie_image =action.payload.update_selfie_image
            break;
        }

        case type.FACEBOOK_USER__: {
            draft.facebookUser =action.payload.facebookUser
            break;
        }

        case type.LOGOUT__: {
            draft.openPhoneVerificationModal = false;
            draft.user =initialState.user;
            draft.facebookUser = initialState.facebookUser;
            break;
        }

        default:
            break;
    }
});

