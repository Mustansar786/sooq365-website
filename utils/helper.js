export const createString=(array=[])=>{
 let newStr="";
 array.map(itm=>{
     if(itm){
     if(newStr.length)
     newStr+=" ";
     newStr+=itm;
     }
 })
 return newStr;
}

//crate vehicle link url that remove special characters and spaces etc
export const vehicleParams=(params)=>{
 params=params.replace(/\s+/g, '-');//replace space to dash
 params=params.replace(/\//g, '-');//replace back slash to dash
 return params;
}



export const  matchYoutubeUrl =(url) =>{
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if(url.match(p)){
        return url.match(p)[1];
    }
    return false;
}


export const customEncryption=(str)=>{
    let resultArr=[];
    let newStr=""
    for(var i=0;i<=str.length-1;i++){
       resultArr.push(str.length-i+str[i]+resultArr.length)
    }
   resultArr.map(itm=>{
       newStr+=itm;
   })
   return newStr
}



export const AddDiscountPercent=(price,percent)=>{
    return price-((percent/100)*price)
}
export const SubtractDiscountPercent=(price,percent)=>{
    return price/((100-percent)/100)
}