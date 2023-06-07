import localforage from 'localforage';
import moment from 'moment';
import { GET_VEHICLES } from 'graphql/query';
import client from 'graphql/apollo-client';



export const AWS_SERVICE_WORKER = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('firebase-messaging-sw.js')
            .then(function (registration) {
                console.log('Registration successful, scope is:', registration.scope);
            }).catch(function (err) {
                console.log('Service worker registration failed, error:', err);
            });
    }
}

export const setLocationBeforeLogin = (ID: string) => {
    localforage.setItem("vehicleId", ID)
}

export const setDefaultCountryData = (data:any) => {
    let obj = JSON.stringify(data);
    localforage.setItem('initialCountry',obj);
}

export const getDefaultCountryData = async () => {
    let data: any = await localforage.getItem('initialCountry')
    return data ? JSON.parse(data) : null;
    
}

export const getLocationBeforeLogin = async () => {
    return await localforage.getItem("vehicleId")
}
export const clearLocationBeforeLogin = async () => {
    return await localforage.removeItem("vehicleId")
}



export const setUserToken= (token:string,isAdmin=false) =>{
    localforage.setItem("token", `Bearer ${token}`)
    localforage.setItem("tokenWithoutBearer", `${token}`)
    if(isAdmin)
    localforage.setItem("is_admin", isAdmin)
}

export const getUserToken = async () => {
    let data =  await getResolveToken();
    return data || false;
}
export const getTokenwithoutBearer =async ()=>{
    return await localforage.getItem('tokenWithoutBearer');
}

export const getResolveToken =async ()=>{
    return await localforage.getItem('token');
}
export const localforageClear =async ()=>{
    return await localforage.clear();
}
export const getIsAdmin =async ()=>{
    return await localforage.getItem('is_admin');
}


export const copyToClipboard = (text:string) => {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    let x: HTMLElement | null;
     x = document.getElementById("snackbar");
     x!.innerHTML = 'Copied';

    // Add the "show" class to DIV
    if(x !== null){
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 3000);
    }
}

export const getOnlyNumber =(val:string)=>{
    return val.replace(/[^0-9]/g, "")
}

export const customNotification = (text:string) => {
    let x: HTMLElement | null;
     x = document.getElementById("snackbar");
     x!.innerHTML = text;

    // Add the "show" class to DIV
    if(x !== null){
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x!.className = x!.className.replace("show", ""); }, 3000);
    }
}

export const getLocalDateTime = () => {
    const date = new Date();
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

export const activeSignupScreen =() =>{
    const container = document.getElementById('auth-container');
    const closeButton = document.querySelector('.close-icon-auth');
    if (container) {
        container.classList.add("right-panel-active");
    }
    if(closeButton) {
        closeButton.classList.add("close-icon-background");
    }
}

export const activeSignInScreen =() =>{
    const container = document.getElementById('auth-container');
    const closeButton = document.querySelector('.close-icon-auth');
    if (container) {
        container.classList.remove("right-panel-active");
    }
    if(closeButton){
        closeButton.classList.remove("close-icon-background"); 
    }
}



export const minBookingDate = () => {
    return new Date();
}

export const maxBookingDate =()=>{
   return new Date(new Date().setMonth(new Date().getMonth() + 6));
}

   
export const getBetweenDates= function(start:Date, end:Date) {
    for(var arr=[],dt=(new Date(start)); moment(dt).format('YYYY-MM-DD')<=moment(end).format('YYYY-MM-DD'); dt.setDate(dt.getDate()+1 )){
        arr.push(new Date(dt));
    }
    return arr;
};

export const disabledDates = (availble_dates: [{ from: Date, to: Date }], booked_dates: [{ from: Date, to: Date }], extededDate?: Date | undefined) => {
    // if (alwaysAvailable) {
    //     return []
    // } else {
        let Dates: any = [];
        // if (availble_dates?.length > 0) {

        //     availble_dates.map((val: any) => {
        //         getBetweenDates(new Date(val.from), new Date(val.to)).map((val: any) => {
        //             Dates.push(val);
        //         })
        //     })
        // }
        if (booked_dates?.length > 0) {
            booked_dates.map((val: any) => {
                getBetweenDates(new Date(val.from), new Date(val.to)).map((val: any) => {
                    Dates.push(val);
                })
            })
        }
        if (extededDate) {
            let formated_extended_date = new Date(extededDate);
            let filters = Dates.filter((val: Date) => {
                const diff = differenceTwoDates_Days(val, formated_extended_date)
                if (diff>0)
                    return val;
            });
            return filters
        }
        return Dates
    // }
}

export const disabledDatesHourly = (availble_dates: { from: Date, to: Date }[]) => {
    // if (alwaysAvailable) {
    //     return []
    // } else {
        let Dates: any = [];
        if (availble_dates?.length > 0) {

            availble_dates.map((val: any) => {
                getBetweenDates(new Date(val.from), new Date(val.to)).map((val: any) => {
                    Dates.push(val);
                })
            })
        }
        return Dates
    // }
}

export const availableHoursDaily = (checkInTime: any, isExtend: boolean, extendEndTime: any) => {
    const hoursArray = [];
    let check_in_time = checkInTime ? checkInTime : 9

    if (isExtend) // if extension, we only need to start hours array from end time of the previous trip, this works if extend start date is not today
        check_in_time = moment(extendEndTime, 'hh:mm A').format('H');
    for (let i = check_in_time; i < (check_in_time + 12); i++) {
        hoursArray.push({ label: moment((i % 24) + ':00', 'H:mm').format('LT'), value: moment((i % 24) + ':00', 'H:mm').format('LT') });
    }
    return hoursArray;
}

export const differenceTwoDates_Days = (startDate: Date, endDate: Date) => {
    const date1: any = new Date(startDate);
    const date2: any = new Date(endDate);
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
export const differenceTwoDates_Days_EuropCar = (startDate: Date, endDate: Date) => {
    const date2 = new Date(moment(startDate).format("YYYY-MM-DD HH:mm"));
    const date1 = new Date(moment(endDate).format("YYYY-MM-DD HH:mm"));
    const durationDiff =moment(date1).diff(date2, 'minutes' );
    const DurationInHours = durationDiff / 60
    const NumberofdaysBooked = Math.ceil((DurationInHours/24.50));
    return NumberofdaysBooked
}



export const timeDiffCalc = (bookingDate:Date, dateNow:Date) => {
    //Note: 00 is month i.e. January    
    if (bookingDate > dateNow) {    
         return false  
     }else {    
         return true    
     }    
}


export const addDaysinDate = (date:Date, days:number) => {
    let datatoday = new Date(date);
    let datatodays = datatoday.setDate(new Date(datatoday).getDate() + days);
   return new Date(datatodays);
}

export const getTimeFromDate = (date: Date) => {
  return  moment(date).utc().format('hh:mm A')
}

export const make_capitalize = (text:string) => {
 return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

