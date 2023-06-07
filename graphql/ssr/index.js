
import client from 'graphql/apollo-client';
import { GET_VEHICLE_BY_ID,CATEGORIES, RECENT_VEHICLES, GET_VEHICLES,GET_BLOGS } from '../query';


  //.................all query for ssr ................
   export const getVehicleById=async(id)=>{
       return new Promise(async(resolve,reject)=>{
            try{
            const data=await client.query({
                fetchPolicy:"no-cache",
                query:GET_VEHICLE_BY_ID,
                variables:{
                    id
                }
            })
            resolve(data.data)
            }catch(err){
             reject(err)
            }
        })
     
    }

      /**********Get Categories ***********/
   export const getCategories=async(language)=>{
    return new Promise(async(resolve,reject)=>{
         try{
         const data=await client.query({
             query:CATEGORIES(language,'id name active icon'),
         })
         resolve(data.data)
         }catch(err){
          reject(err)
         }
     })
  
 }

       /***************** Recent Vehicles ************/
export const getRecentVehicleByCategory=async(variables)=>{
    return new Promise(async(resolve,reject)=>{
         try{
         const data=await client.query({
            fetchPolicy:"no-cache",
             query:RECENT_VEHICLES,
             variables:{...variables}
         })
         resolve(data.data)
         }catch(err){
          reject(err)
         }
     })
  
 }

        /***************** Monthly Deals Vehicles ************/
export const getMonthlyDealVehicle=async(variables)=>{
    return new Promise(async(resolve,reject)=>{
         try{
         const data=await client.query({
            fetchPolicy:"no-cache",
             query:GET_VEHICLES,
             variables:{...variables}
         })
         resolve(data.data)
         }catch(err){
          reject(err)
         }
     })
  
 }
         /***************** Find Blog by id ************/
export const findBlogById=async(variables)=>{
    return new Promise(async(resolve,reject)=>{
         try{
         const data=await client.query({
            fetchPolicy:"no-cache",
             query:GET_BLOGS,
             variables:{...variables}
         })
         resolve(data.data)
         }catch(err){
          reject(err)
         }
     })
  
 }