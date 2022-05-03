import React, { useState } from "react";
import L from 'leaflet';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: '',
    format: 'json',
    addressdetails: 'addressdetails',
};


function SearchBox(props) {
    const { selectPosition, setSelectPosition } = props;
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);

    return (
        <div className="searchbox-container">
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <TextField style={{ width: "100%" }} 
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </div>
                <div style={{ display: "flex",  alignItems: "center", padding: "0px 10px" }}>
                    <Button variant="contained" color="primary" onClick={() => {
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
                    }}>
                        Search
                    </Button>
                </div>
            </div>
            <List component="nav" aria-label="main mailbox folders" >
                {listPlace.map((item) => {
                    return (
                        <div key={item?.osm_id}>
                            <ListItem button onClick={() => {
                                setSelectPosition(item);
                            }}>
                                <ListItemIcon>
                                    Icon
                                </ListItemIcon>
                                <ListItemText primary={item?.display_name} />
                            </ListItem>
                        </div>
                    );
                })}
            </List>
        </div>
    );
}

export default SearchBox;