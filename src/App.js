import React, { useState, useEffect, Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import "./App.css";

class App extends Component {
  state = {
    viewport: {
      latitude: 0,
      longitude: 0,
      width: "100vw",
      height: "100vh",
      zoom: 2,
    },
    confirmed: [],
    deaths: [],
    key: null,
    isactive: true,
  };

  componentDidMount() {
    axios
      .get(`https://coronavirus-tracker-api.herokuapp.com/all`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        const confirmed = res.data.confirmed;
        const deaths = res.data.deaths;
        this.setState({ confirmed });
        this.setState({ deaths });
      });
  }

  showPopup = (key) => {
    this.setState({ key: key });
  };
  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiZGViYXNpc2gxOSIsImEiOiJjazljZGh4bzEwMWw5M29yZThpcDExcWRxIn0.jGyWz8ChIXUDEyEWSHGRxQ"
          mapStyle="mapbox://styles/debasish19/ck9cfytma0ips1itgxror5yus"
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          {this.state.confirmed.length == 0 ? (
            <LoadingOverlay
              active={this.state.isactive}
              spinner
              text="Loading your data..."
            ></LoadingOverlay>
          ) : (
            this.state.confirmed.locations.map((value, key) => (
              <Marker
                key={key}
                latitude={parseInt(value.coordinates.lat)}
                longitude={parseInt(value.coordinates.long)}
              >
                <button
                  className="marker-btn"
                  onMouseEnter={() => {
                    this.showPopup(key);
                  }}
                  onMouseLeave={() => {
                    this.setState({ key: null });
                  }}
                  onClick={() => {
                    this.showPopup(key);
                  }}
                >
                  <i
                    className="fa fa-map-marker fa-2x"
                    style={{ color: "red" }}
                  ></i>
                </button>
              </Marker>
            ))
          )}

          {this.state.key != null ? (
            <Popup
              latitude={parseInt(
                this.state.confirmed.locations[this.state.key].coordinates.lat
              )}
              longitude={parseInt(
                this.state.confirmed.locations[this.state.key].coordinates.long
              )}
              onClose={() => {
                this.setState({ key: null });
              }}
            >
              <div>
                <h2>
                  {this.state.confirmed.locations[this.state.key].country}
                </h2>
                <p>
                  Confirmed:{" "}
                  <span>
                    {this.state.confirmed.locations[this.state.key].latest}
                  </span>
                </p>
                <p>
                  Deaths:{" "}
                  <span>
                    {this.state.deaths.locations[this.state.key].latest}
                  </span>
                </p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    );
  }
}

export default App;
