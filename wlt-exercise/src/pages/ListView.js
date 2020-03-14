import React, { Component } from "react";
import axios from "axios";

import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardHeader,
  Button,
  CardText,
  Modal,
  ModalHeader,
  FormGroup,
  Input,
} from "reactstrap";
import Moment from "react-moment";
import Unit from "../components/unit";
import symbols from "../constants/symbols";
import Sign from "../components/sign";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      rateData: {},
      modal: false,
      collapse: true,
      custom: ""
    };
    this.setBase = this.setBase.bind(this);
    this.showModal = this.showModal.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggleCollapse() {
    this.setState({ collapse: !this.state.collapse });
  }

  setBase(symbol) {
    console.log(symbol);
    axios
      .get(`https://api.ratesapi.io/api/latest?base=${symbol}`)
      .then(response =>
        this.setState({ rateData: response.data, modal: false })
      )
      .catch(err =>
        this.setState({ hasError: true, error: err, modal: false })
      );
  }

  showModal() {
    this.setState({ modal: !this.state.modal });
  }

  componentDidMount() {
    axios
      .get("https://api.ratesapi.io/api/latest")
      .then(response =>
        this.setState({ rateData: response.data, modal: false })
      )
      .catch(err => {
        this.setState({ hasError: true, error: err });
      });
  }

  render() {
    if (
      this.state.hasError ||
      Object.entries(this.state.rateData).length === 0
    ) {
      return (
        <Card style={{padding: '2em'}}>
          <CardTitle>Info:</CardTitle>
          <CardBody>
            <CardHeader>
              {this.state.hasError
                ? "There Was An Errror"
                : "Data unavailable."}
            </CardHeader>
            <CardText>
              {this.state.hasError ? (
                <span>{this.state.error.toString()}</span>
              ) : (
                <span>Data is not available.</span>
              )}
            </CardText>
          </CardBody>
        </Card>
      );
    } else {
      const {
        rateData: { base, rates, date }
      } = this.state;

      const formattedRates = [];
      for (let k of Object.keys(rates)) {
        // formattedRates.push(<Unit key={k} type={k}>{k}: <Unit type={base}>{base} 1 = </Unit>{rates[k]}</Unit>);
        formattedRates.push(
          <Unit key={k} type={k} conversion={rates[k]} baseType={base}></Unit>
        );
      }
      const modalValues = [
        <FormGroup
          key={0}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "1em"
          }}
        >
          <Input
            name="custom"
            placeholder="Custom"
            value={this.state.value}
            onChange={this.handleFormChange}
          />
          <Button onClick={() => this.setBase(this.state.custom)}>
            Search
          </Button>
        </FormGroup>
      ];
      for (let k of Object.keys(symbols)) {
        modalValues.push(
          <Button
            key={k}
            onClick={() => this.setBase(symbols[k])}
            style={{ borderRadius: 0 }}
          >
            <Sign type={symbols[k]}></Sign> - {symbols[k]}
          </Button>
        );
      }
      return (
        <Card style={{padding: '2em'}}>
          <CardTitle>
            Exchange Rates: <Unit type={base} base={true} />
          </CardTitle>
          <CardSubtitle>
            For <Moment>{date}</Moment>
          </CardSubtitle>
          <CardBody>
            <Button
              onClick={this.showModal}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Unit type={base} base={true} />
              <i className="fas fa-chevron-down"></i>
            </Button>
            {this.state.collapse ? (
              <i
                className="fas fa-chevron-up"
                style={{ position: "absolute", top: "1em", right: "1em" }}
                onClick={this.toggleCollapse}
              ></i>
            ) : (
              <i
                className="fas fa-chevron-down"
                style={{ position: "absolute", top: "1em", right: "1em" }}
                onClick={this.toggleCollapse}
              ></i>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridColumnGrap: "1em",
                gridRowGrap: "1em"
              }}
            >
              {this.state.collapse
                ? formattedRates.splice(0, 3)
                : formattedRates}
            </div>
          </CardBody>
          <Modal isOpen={this.state.modal} toggle={this.showModal} style={{padding: '1em'}}>
            <ModalHeader>Select Base Currency</ModalHeader>
            {modalValues}
          </Modal>
        </Card>
      );
    }
  }
}

export default ListView;
