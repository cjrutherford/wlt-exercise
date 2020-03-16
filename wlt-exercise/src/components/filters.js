import React, { useContext } from "react";
import {
  Input,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
  Label
} from "reactstrap";
import Sign from "./sign";
import symbols from '../constants/symbols';
import { ExcludedContext } from "../includedContext";

const Filter = (props) => {
 
  // let states =[];
  // const keys = Object.keys(items)
  // for(let i = 0; i < keys.length; i++) {
  //     const [state, action] = useState(false);
  //     states.push({key: keys[i], state, action});
  // }
  const {state, dispatch} = useContext(ExcludedContext)
  const keys = Object.keys(symbols);
  let inputs = [];
  for(let k of keys){
    inputs.push(<FormGroup key={symbols[k]} check>
        <Label check>
            <Input type="checkbox" checked={state[k]} onChange={(e) => {
                console.log(`Value Change From: ${symbols[k]} \n Current Value=${state[k]} \n New Value=${e.target.value}`);
                dispatch({type:'toggle', payload: symbols[k]});
            }} /> <Sign type={symbols[k]} signOnly={true} /> ({symbols[k]})
        </Label>
    </FormGroup>)
  }
    // const { key, value } = s;
    // return (
    //   <FormGroup key={key} check>
    //     <Label check>
    //       <Input
    //         type="checkbox"
    //         checked={value}
    //         onChange={e => {
    //           e.target.value
    //             ? dispatch({ type: "setTrue", payload: key })
    //             : dispatch({ type: "setFalse", payload: key });
    //           setActives({ ...state });
    //         }}
    //       />{" "}
    //       <Sign type={key} signOnly={true} />({key})
    //     </Label>
    //   </FormGroup>
    // );

  return (
    <Card>
      <CardHeader style={{ color: "#fff", background: "rgba(0,40,80,0.7)" }}>
        <h2>Included Currencies</h2>
      </CardHeader>
      <CardBody
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          width: "98%",
          maxHeight: "10vh",
          overflowY: "scroll",
          margin: "1em",
          paddingLeft: "3.5em"
        }}
      >
        {inputs}
      </CardBody>
    </Card>
  );
};

export default Filter;
