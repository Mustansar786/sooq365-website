import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { useState } from 'react'
 
function MapContainer(props:any) {
    
    const [bounds,setbounds] = useState<any>({});
    const height = props.height;
    const center = {lat : props.lat,lng: props.lng}
    const markers= props?.markers ? props.markers.map((item:any) => {
        return {
            lat : item.coordinates[1],
            lng : item.coordinates[0] 
        }
    }) : []
   
    

    const callHandleMap = () => {
        const bounds = new props.google.maps.LatLngBounds();
        for (let i = 0; i < markers.length; i++) {
            bounds.extend(new props.google.maps.LatLng(markers[i]));
        }
        setbounds(bounds)
    }
    return (
        <div style={{width:'100%',height:height,position:'relative'}}>
            <Map google={props.google} 
                initialCenter={center}
                bounds={markers.length > 1 ? bounds : undefined}
                onReady={callHandleMap}>
                
                {markers && markers.length > 0 ? 
                    markers.map((item:any,i:number) => {
                        return(
                            <Marker key={"marker_"+i} position={item}></Marker>
                        )
                    })
                    : null
                }  
                
            </Map>
        </div>
        
    );
  
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_TOKEN || ''
})(MapContainer)