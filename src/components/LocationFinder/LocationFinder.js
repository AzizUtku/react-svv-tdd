import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Geocode from "react-geocode";
import { getDistance } from "geolib";
import { Snackbar } from "@material/react-snackbar";
import { MetricCard } from "react-metric-card";
import { calculateDistanceToEarthCenter } from "../../utils";
import { fetchNearestCity } from "../../api";
import { GOOGLE_API_KEY } from "../../credantials";
import "@material/react-snackbar/dist/snackbar.css";
import "./LocationFinder.scss";

Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("tr");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

class LocationFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      currentCity: "",
      distanceToEarthCenter: null,
      nearestCityCenter: "",
      nearestCityCoordinates: null,
      nearestCityDistance: null,
      error: "",
    };

    this.handleProcess = this.handleProcess.bind(this);
    this.handleLocate = this.handleLocate.bind(this);
    this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
    this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
  }

  handleLatitudeChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(value)) {
      this.setState({ latitude: value });
    }
  };

  handleLongitudeChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(value)) {
      this.setState({ longitude: value });
    }
  };

  handleProcess = () => {
    const { latitude, longitude } = this.state;

    if (
      !latitude ||
      !longitude ||
      isNaN(latitude) ||
      isNaN(longitude) ||
      latitude > 90 ||
      latitude < -90 ||
      longitude > 180 ||
      longitude < -180
    ) {
      this.setState({ error: "Please enter valid longitude and latitude!" });
      return false;
    }

    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const adressComps = response.results[0].address_components;
        let city;
        for (let i = 0; i < adressComps.length; i++) {
          for (let j = 0; j < adressComps[i].types.length; j++) {
            if (adressComps[i].types[j] === "administrative_area_level_1") {
              city = adressComps[i].long_name;
            }
          }
        }

        this.setState({
          currentCity: city,
          distanceToEarthCenter: calculateDistanceToEarthCenter(latitude),
        });
      },
      (error) => {
        console.error(error);
      }
    );

    fetchNearestCity(latitude, longitude).then(
      (response) => {
        const {
          data: { data },
        } = response;
        if (data.length > 0) {
          const nearestCityCoordinates = {
            latitude: data[0].latitude,
            longitude: data[0].longitude,
          };

          const nearestCityDistance =
            getDistance(
              {
                latitude,
                longitude,
              },
              nearestCityCoordinates
            ) / 1000;

          this.setState({
            nearestCityCenter: data[0].city + ", " + data[0].region,
            nearestCityCoordinates,
            nearestCityDistance,
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          this.setState({ error: "The coordinates could not be found!" });
        },
        { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
      );
    }
  };

  render() {
    const {
      latitude,
      longitude,
      currentCity,
      distanceToEarthCenter,
      nearestCityCenter,
      nearestCityCoordinates,
      nearestCityDistance,
      error,
    } = this.state;
    return (
      <div className="location-finder">
        {error && (
          <Snackbar
            message={error}
            timeoutMs={5000}
            onClose={() => {
              this.setState({ error: "" });
            }}
            className="snackbar-error"
          />
        )}
        <div className="input-container">
          <Input
            className="latitude"
            leftText="Latitude"
            value={latitude}
            onChange={this.handleLatitudeChange}
            placeholder=""
          />
          <Input
            className="longitude"
            leftText="Longitude"
            value={longitude}
            onChange={this.handleLongitudeChange}
            placeholder=""
          />
        </div>
        <div className="btn-container">
          <Button className="process float-left" onClick={this.handleProcess}>
            Process
          </Button>
          <Button
            className="locate float-right"
            onClick={this.handleLocate}
            isIcon
          >
            <i className="fa fa-map-marker" aria-hidden="true"></i>
          </Button>
        </div>
        <div className="result-container">
          {currentCity && (
            <MetricCard
              value={currentCity}
              title="Current city"
              fetching={false}
              error={null}
            />
          )}
          <br />
          {distanceToEarthCenter && (
            <MetricCard
              value={`${distanceToEarthCenter.toFixed(2)} km`}
              title="The distance to the earth center"
              fetching={false}
              error={null}
            />
          )}
          <br />
          {nearestCityCenter && (
            <>
              <MetricCard
                value={`${nearestCityCenter}`}
                trend={{
                  description: `Latitude: ${nearestCityCoordinates.latitude.toFixed(
                    2
                  )}, Longitude: 
                ${nearestCityCoordinates.longitude.toFixed(2)}`,
                }}
                title="Nearest city center"
                fetching={false}
                error={null}
              />
              <br />
              <MetricCard
                value={`${nearestCityDistance.toFixed(2)} km`}
                title="The distance to the nearest city center"
                fetching={false}
                error={null}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default LocationFinder;
