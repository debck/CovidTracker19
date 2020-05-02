import React from "react";
import LoadingOverlay from "react-loading-overlay";

export default function Loader() {
  return (
    <div>
      <LoadingOverlay
        active="true"
        spinner
        text="Loading your data..."
      ></LoadingOverlay>
    </div>
  );
}
