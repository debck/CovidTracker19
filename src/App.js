import React, { useState, useEffect, Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import StickyFooter from "react-sticky-footer";
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
    latest: [],
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
        const latest = res.data.latest;
        this.setState({ confirmed });
        this.setState({ deaths });
        this.setState({ latest });
        // console.log(latest);
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

          <div style={{ position: "absolute", bottom: "0rem" }}>
            <StickyFooter
              stickAtThreshold={0}
              normalStyles={{
                backgroundColor: "#999999",
                padding: "1rem",
              }}
              stickyStyles={{
                backgroundColor: "rgba(255,255,255,.8)",
                padding: "1rem",
              }}
            >
              <h4>
                <strong> Confirmed:</strong>{" "}
                <span>{this.state.latest.confirmed}</span>
              </h4>
              <h4>
                <strong> Deaths: </strong>{" "}
                <span>{this.state.latest.deaths}</span>
              </h4>
              <h4>
                <strong>Recovered: </strong>{" "}
                <span>{this.state.latest.recovered}</span>
              </h4>
              <p>
                Developed by{" "}
                <a
                  href="https://www.linkedin.com/in/debasish2014/"
                  data-toggle="tooltip"
                  title="Yes, that's me!!"
                  target="_blank"
                  style={{ color: "#2b7489" }}
                >
                  @debck
                </a>{" "}
              </p>
            </StickyFooter>
          </div>
        </ReactMapGL>
      </div>
    );
  }
}

export default App;
