import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};



export interface IReactMap {
    lat : number,
    lng : number ,
    zoom?:number
}

function ReactMap({lat, lng, zoom} : IReactMap) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCwqXe7pVm0S2Yw2b38wmtr80i90d1q4i8"
  })

  const [map, setMap] = React.useState<any>(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, [])

  const center ={ lat, lng}
  
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
       <Marker position={center} />
       <h1>{map?.tosUrl || ""}</h1>
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(ReactMap)