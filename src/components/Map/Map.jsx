import React from "react";
import { Typography, useMediaQuery } from "@material-ui/core";

import useStyles from "./styles";
import GoogleMapReact from "google-map-react";
import { LocationOnOutlined } from "@material-ui/icons";
import { Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import mapStyles from "./mapStyles";

function Map({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          //console.log("e:", e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, index) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={index}
          >
            {!isDesktop ? (
              <LocationOnOutlined color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}

        {weatherData?.list?.map((data, index) => (
          <div
            className=""
            key={index}
            lat={data.coord.lat}
            lng={data.coord.lon}
          >
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              height={100}
              alt=""
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
