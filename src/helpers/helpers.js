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

export const inmutableSet = (objeto, id, field, value) => {
  const oldValue = objeto.find(x => x.id === id);
  const newValue = { ...oldValue, [field]: value };
  const indexOldElement = objeto.findIndex(({ id }) => id === newValue.id);
  const newArray = Object.assign([...objeto], {
    [indexOldElement]: newValue
  });
  return newArray;
};

export const inmutableVectorSet = (objeto, id, field, vector) => {
  const oldValue = objeto.find(x => x.id === id);

  const correctedVector = vector.replace(/x/g, "oldValue[field]");
  const newValue = { ...oldValue, [field]: eval(correctedVector) };
  const indexOldElement = objeto.findIndex(({ id }) => id === newValue.id);
  const newArray = Object.assign([...objeto], {
    [indexOldElement]: newValue
  });
  return newArray;
};
