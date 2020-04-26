import React from "react";
import StickyFooter from "react-sticky-footer";

const Bottom = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0rem",
      }}
    >
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
          <strong> Confirmed:</strong> <span>{props.latest.confirmed}</span>
        </h4>
        <h4>
          <strong> Deaths: </strong> <span>{props.latest.deaths}</span>
        </h4>
        <h4>
          <strong>Recovered: </strong> <span>{props.latest.recovered}</span>
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
  );
};

export default Bottom;
