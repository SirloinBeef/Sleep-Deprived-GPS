import React, { useState } from "react";
import L from 'leaflet';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: '',
    format: 'json',
    addressdetails: 'addressdetails',
};

function setMarker() {
    
}

function SearchBox(props) {
    const { selectPosition, setSelectPosition } = props;
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);

    return (
        <div className="searchbox-container">
            <div>
                <form>
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </form>
            </div>
            <button onClick={() => {
                const params = {
                    q: searchText,
                    format: 'json',
                    addressdetails: 1,
                    polygon_geojson: 0,
                };
                const queryString = new URLSearchParams(params).toString();
                const requestOptions = {
                    method: "GET",
                    redirect: "follow",
                };
                fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                    .then((response) => response.text())
                    .then((result) => {
                        console.log(JSON.parse(result));
                        setListPlace(JSON.parse(result));
                    })
                    .catch((err) => console.log("err: ", err));
            }}>Search</button>
            <div className="list-container">
                {listPlace.map((item) => {
                    return (
                        <div key={item?.osm_id}>
                            <div className="list-button" onClick={() => {
                                setSelectPosition(item);
                            }}>
                                <div className="list-icon">
                                    Icon
                                </div>
                                <div>
                                    <p className="list-location">{item?.display_name}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SearchBox;