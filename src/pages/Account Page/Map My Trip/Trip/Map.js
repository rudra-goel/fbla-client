import React, { useState, useEffect } from 'react'
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api"
import "./Map.css"
export default function Map({ listOfLocations }) {

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))

  const position = {
    lat: 39.7392,
    lng: -104.99
  }
  const [marker, setMarker] = useState()
  const [directionsResponse, setDirectionsResponse] = useState()
  const [distance, setDistance] = useState("Could Not Find a Route")
  const [duration, setDuration] = useState("Could Not Load a Trip Time")
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    library: ['places']
  })

  async function calculateRoute() {
      const directionsService = new window.google.maps.DirectionsService()
      let dirs = []
      let totalDist = 0;
      let totalDur = 0;
      for (let i = 1; i < listOfLocations.length; i++){
        const results = await directionsService.route({
          origin: listOfLocations[i-1].Address,
          destination: listOfLocations[i].Address,
          // eslint-disable-next-line no-undef
          travelMode: window.google.maps.TravelMode.DRIVING
        })
        dirs.push(results)
        totalDist+=results.routes[0].legs[0].distance.value
        totalDur+=results.routes[0].legs[0].duration.value
      }
      
      setDistance(totalDist)
      setDuration(totalDur)
      console.log(dirs)
      setDirectionsResponse(dirs)
    
  }
  

  function metresToMiles() {
    if (distance !== "Could Not Find a Route"){
      let miles = distance * 0.000621371192
      miles*=10
      miles = Math.round(miles)
      miles/=10;
      return miles
    } return distance 
  }
  function secondsToAppropriate(){
    if (duration !== "Could Not Load a Trip Time" && duration < 3600){
      let time = new Date(duration * 1000).toISOString().substring(14, 19).split(":")
      const strReturn = `${time[0]} mins`
      return strReturn
    } else if (duration !== "Could Not Load a Trip Time" && duration >= 3600) {
      let time = new Date(duration * 1000).toISOString().substring(11, 16).split(":")
      const strReturn = `${time[0]} hours and ${time[1]} minutes`
      return strReturn
    } return duration
  }




  if(!isLoaded) {
    return (
      <div class="maps-is-loading">
        <h2>Maps is loading</h2>
      </div>
    )
  }

  
  if (listOfLocations.length === 1){
    const geocodeService = new window.google.maps.Geocoder()
    geocodeService.geocode({
      address:listOfLocations[0].Address
    }).then(({results}) => {
      setMarker({
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      })
      console.log("Marker is set")
      console.log(marker)
    })
    return (
      <>
        <div class="map-name">
          <label class="trip-map-name">Trip Maps</label>
        </div>
        <GoogleMap 
          center={marker}
          zoom={15} 
          mapContainerStyle= {{ width: '100%', height: '80%' }} 
          autoPosition={false}
          onLoad={map=>setMap(map)}>
            <Marker position={marker} />
        </GoogleMap>
      </>
    )
    
    }else {
      console.log("NOT ONE")
      return (
        <>
          <div class="map-name">
            <label class="trip-map-name">Trip Maps</label>
          </div>
          <div class="trip-dist-dur">
            <label class="distance">Total Distance: {metresToMiles()}</label> 
            <br></br>
            <label class="distance">Total Duration: {secondsToAppropriate()}</label> 
            <button onClick={calculateRoute}>Calculate My Route</button>
          </div>
          <GoogleMap 
            center={position} 
            zoom={15} 
            mapContainerStyle= {{ width: '100%', height: '80%' }} 
            autoPosition={false}
            onLoad={map=>setMap(map)}>
              {
                directionsResponse ? (
                  <div>
                    {

                      directionsResponse.map((dr, index) => {
                        return <DirectionsRenderer 
                                directions={dr} 
                                
                                /> 
                      })
                    }
                  </div>
                ) : (<div />)
              }
          </GoogleMap>
        </>
        
      )
  }
}

