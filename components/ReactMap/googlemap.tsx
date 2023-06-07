import React, { useEffect, useState } from 'react';
// import {Map,Marker, GoogleApiWrapper} from 'google-maps-react';
// import { InfoWindow } from 'google-maps-react';
import GoogleMapReact,{ fitBounds } from 'google-map-react';
import { isMobile } from 'react-device-detect';



export default function GoogleMap(props:any){
    //console.log("Props are ",props);
    //const [bounds,setbounds] = useState<any>({});
    const [size,setsize]     = useState<any>({});
    //const [zoom,setzoom]     = useState(14);
    const [center,setcenter] = useState({lat:props.lat,lng:props.lng});
      
    const centerMoved = async (map:any) => {
        const coordinates = {
            lat : map.center.lat(),
            lng : map.center.lng()
        };
        const bounds = {
            ne : {
                lat : map.getBounds().getNorthEast().lat(),
                lng : map.getBounds().getNorthEast().lng()
            },
            sw : {
                lat : map.getBounds().getSouthWest().lat(),
                lng : map.getBounds().getSouthWest().lng()
            }
        }
        props.getPosition(coordinates,bounds);    
    }

    
    const markers= props.markers;
   
   
    const onChange = (data:any) => {
        setsize(data.size);
        //setzoom(data.zoom);
    }

    useEffect(() => {
        if(Object.keys(size).length > 0){
            const { center } = fitBounds(props.bounds, size);
            //setzoom(zoom);
            setcenter(center);
        } 
    },[props.bounds,size]);

    const onMarkerClick = (item:any,index:number,selected:boolean) => {
        const position = {lat : item.lat, lng:item.lng};
        if(!selected || isMobile){
            props.getVehicles ? props.getVehicles(position,index) : '';
        }
    }
    
    return (
        <GoogleMapReact 
            bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAP_TOKEN}}
            center = {center}
            zoom   = {13}
            onChange={onChange}
            onDragEnd={centerMoved}>
                {
                    markers?.length > 0 ?
                    markers.map((item:any,i:number) => {
                        const selected = props.selected === i ? true : false;
                        return(
                            <Marker 
                                lat={item.lat} 
                                lng={item.lng} 
                                title={item.title} 
                                selected={selected} 
                                key={i}
                                onClick={() => onMarkerClick(item,i,selected)}
                                mobile={props.mobile}>
                            </Marker>
                        )
                    }): null        
                }

        </GoogleMapReact>

      
        
    );
}

const Marker = (props:any) => {
    return (
        <div className={props.selected ? props.mobile ? "greatPlaceSelectedForMob":"greatPlaceSelected" : props.mobile ? "greatPlaceStyleForMob" : "greatPlaceStyle"} onClick={props.onClick}>
          <div>{props.title}</div>
       </div>
    )
}