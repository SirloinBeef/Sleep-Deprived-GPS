import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';


const center = [42.360081, -71.058884];
const zoom = 13

//Move map to detected location and set marker there
//TODO: Change to a button
function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    });

    const onClick = useCallback(() => {
        map.setView(position, zoom)
    }, [map]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>
                You are here
            </Popup>
        </Marker>
    );
}

//Displays the latitude and longitude of mouse clicked area
function DisplayPosition({map}) {
    const [position, setPosition] = useState(() => map.getCenter());

    const onClick = useCallback(() => {
        map.setView(center, zoom)
    }, [map]);

    const onMove = useCallback(() => {
        setPosition(map.getCenter())
    }, [map]);

    useEffect(() => {
        map.on('move', onMove)
        return () => {
            map.off('move', onMove)
        }
    }, [map, onMove]);

    return (
        <p>
            latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
            <button onclick={onClick}>reset</button>
        </p>
    );
}

function App() {
    const [map, setMap] = useState(null);

    const displayMap = useMemo(
        () => (
            <MapContainer 
                center={center}
                zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
            </MapContainer>
        ),
        [],
    );

    return (
        <div>
            {map ? <DisplayPosition map={map} /> : null}
            {displayMap}
        </div>
    );
}
/*
class App extends React.Component {
    render(){
        const longitude = this.props.coords ? this.props.coords.longitude : DEFAULT_LONGITUDE;
        const latitude = this.props.coords ? this.props.coords.latitude : DEFAULT_LATITUDE;
    
        return (
            <MapContainer center={[longitude, latitude]}
                zoom={12}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                    !this.props.coords ?
                    <div className="loading">Loading</div> :
                    <Marker
                        position={[longitude, latitude]}
                    >
                        <Popup>
                            You are here!
                        </Popup>
                    </Marker>
                }
                <LocationMarker />
            </MapContainer>
        );    
    }
}

export default geolocated({
    positionOptions:{
        enableHighAccuracy: false
    },
    useDecisionTimeout: 10000
})(App);
*/
export default App