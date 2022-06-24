import React from 'react'
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api"
import "./Map.css"
export default function Map() {

  const center = {
    lat: 48.85,
    lng:2.294
  }
  console.log(process.env)
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  if(!isLoaded) {
    return (
      <div class="maps-is-loading">
        <h2>Maps is loading</h2>
      </div>
    )
  }

  return (
    <>
      <div class="map-name">
        <label class="trip-map-name">Trip Maps</label>
      </div>
      <GoogleMap center={{lat: -3.745, lng: -38.523}} zoom={15} mapContainerStyle= {{ width: '100%', height: '80%' }} autoPosition={false}>

      </GoogleMap>
    </>
    
  )
}
