import React, { Component, Fragment } from "react";
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
import Filter from "../components/filters";
import symbols from "../constants/symbols";
import Sign from "../components/sign";
import { ExcludedContext } from "../includedContext";

class ListView extends Component {
  static contextType = ExcludedContext;
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      rateData: {},
      modal: false,
      currentSymbol: "EUR",
      collapse: true,
      custom: ""
    };
    this.axios = axios;
    this.setBase = this.setBase.bind(this);
    this.showModal = this.showModal.bind(this);
    this.loadData = this.loadData.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  loadData() {
    this.axios
      .get(`https://api.ratesapi.io/api/latest?base=${this.state.currentSymbol}`)
      .then(response => {
        if(this.excluded.length > 0){
          const newRates = {};
          for(const rate in response.data.rates){
            if(!this.excluded.includes(rate)){
              newRates[rate] = response.data.rates[rate];
            }
          }
          response.data.rates = newRates;
        }
        this.setState({ rateData: response.data, modal: false })
      })
      .catch(err => {
        this.setState({ hasError: true, error: err });
      });
  }

  toggleCollapse() {
    this.setState({ collapse: !this.state.collapse });
  }

  setBase(symbol) {
    this.setState({
      currentSymbol: symbol
    });
    this.loadData();
  }

  showModal() {
    this.setState({ modal: !this.state.modal });
  }

  componentDidMount() {
    this.excluded = this.context.excluded;
    this.loadData();
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
      const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gridColumnGrap: "1em",
        gridRowGrap: "1em"
      };

      const {
        rateData: { base, rates, date }
      } = this.state;

      const filterItems = Object.keys(symbols);

      const formattedRates = [];
      for (let k of Object.keys(rates)) {
        // formattedRates.push(<Unit key={k} type={k}>{k}: <Unit type={base}>{base} 1 = </Unit>{rates[k]}</Unit>);
        if (!this.excluded.includes(k)) {
          formattedRates.push(
            <Unit key={k} type={k} conversion={rates[k]} baseType={base}></Unit>
          );
        }
      }
      const modalValues = [];
      for (let k of Object.keys(symbols)) {
        modalValues.push(
          <Button
            key={k}
            style={{ borderRadius: "0" }}
            onClick={() => this.setBase(symbols[k])}
          >
            {symbols[k]}
          </Button>
        );
      }
      return (
        <Card>
          <CardHeader
            style={{
              background: "rgba(0,40,80, 0.7)",
              color: "#fff"
            }}
          >
            <CardTitle>
              <h1>Exchange Rates:</h1>
            </CardTitle>
            <CardSubtitle>
              <h2>
                For <Moment format={"MM-DD-YY"}>{date}</Moment>
              </h2>
            </CardSubtitle>
          </CardHeader>
          <CardBody>
            <Button onClick={this.showModal}>
              Current: <Sign type={base} />({base})
            </Button>
            <Filter items={filterItems} setActives={this.trackSymbols} />
            <Button style={{position:'absolute', right: '1.0625em', zIndex:'99'}} onClick={this.toggleCollapse}><i className={`fas fa-chevron-${this.state.collapse?'down':'up'}`}></i></Button>
            <div>
              {this.state.collapse ? (
                <Card style={gridStyle}>{formattedRates.splice(0, 4)}</Card>
              ) : (
                <Card style={gridStyle}>{formattedRates}</Card>
              )}
            </div>
          </CardBody>
          <Modal isOpen={this.state.modal} toggle={this.showModal}>
            <ModalHeader>Select Base Currency</ModalHeader>
            {modalValues}
          </Modal>
        </Card>
      );
    }
  }
}

export default ListView;
