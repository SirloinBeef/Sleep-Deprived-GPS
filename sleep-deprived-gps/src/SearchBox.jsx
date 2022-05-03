import React, { useState } from "react";
import L from 'leaflet';
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: '',
    format: 'json',
    addressdetails: 'addressdetails',
};


function SearchBox(props) {
    const { selectPosition, setSelectPosition } = props;
    const [searchText, setSearchText] = useState("");
    const [searchText2, setSearchText2] = useState("");
    const [listPlace, setListPlace] = useState([]);

    return (
        <div className="searchbox-container">
            <div style={{ padding: "8px" }}>
                <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Start Location"
                    variants="outlined"
                    size="small"
                    color="primary" focused
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode == 13) {
                            e.preventDefault();
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
                        }
                    }}
                />
            </div>
            <div style={{ padding: "8px" }}>
                <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="End Location"
                    variants="outlined"
                    size="small"
                    color="secondary" focused
                    value={searchText2}
                    onChange={(e) => {
                        setSearchText2(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if(e.keyCode == 13) {
                            e.preventDefault();
                            const params = {
                                q: searchText2,
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
                        }
                    }}
                />
            </div>
            <List component="nav" aria-label="main mailbox folders">
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
                            <Divider />
                        </div>
                    );
                })}
            </List>
        </div>
    );
}

export default SearchBox;