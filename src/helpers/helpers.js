import React, { useState, useEffect, useContext } from "react";

export const hoursFormat = seconds => {
  let temp = { min: Math.floor(seconds / 60), sec: seconds % 60 };

  return (
    <React.Fragment>
      {seconds >= 60 && temp.min >= 0 ? temp.min + " min " : null}
      {temp.sec >= 0 ? temp.sec + "s" : null}
    </React.Fragment>
  );
};
