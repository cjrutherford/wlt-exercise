import React from "react";
import Sign from "./sign";

const Unit = props => {
  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "1em",
    background: "rgba(0,40,80,0.7)",
    borderRadius: "0.5em",
    color: '#fff',
    padding: "1em",
    margin: "1em"
  };

  return props.base ? (
    <div style={rowStyle}>
      BASE: <Sign type={props.type} /> - {props.type}
    </div>
  ) : (
    <div style={rowStyle}>
      <Sign type={props.baseType} /> ({props.baseType}) 1 ={" "}
      <Sign type={props.type} /> ({props.type}) {props.conversion}
    </div>
  );
};

export default Unit;
