import React, { Component } from "react";
import axios from "axios";

import {Card, CardTitle, CardSubtitle, CardBody, CardHeader, Button, CardText, Modal, ModalHeader} from 'reactstrap';
import Moment from 'react-moment';
import Unit from "../components/unit";
import symbols from '../constants/symbols';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
      rateData: {},
      modal: false
    };
    this.setBase = this.setBase.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  setBase(symbol){
      axios
        .get(`https://api.ratesapi.io/api/latest?base=${symbol}`)
        .then(response => this.setState({rateData: response.data, modal: false}))
        .catch(err => this.setState({hasError: true, error:err, modal: false}));
  }

  showModal(){
      this.setState({modal: !this.state.modal})
  }

  componentDidMount() {
    axios
      .get("https://api.ratesapi.io/api/latest")
      .then(response => this.setState({ rateData: response.data, modal: false }))
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
        <Card>
          <CardTitle>Info:</CardTitle>
          <CardBody>
              <CardHeader>{this.state.hasError ? 'There Was An Errror' : 'Data unavailable.'}</CardHeader>
            <CardText>{this.state.hasError ? <span>{this.state.error.toString()}</span>: <span>Data is not available.</span>}</CardText>
          </CardBody>
        </Card>
      );
    } else {
        const {
            rateData:{
                base, rates, date
            }
        } = this.state;

        const formattedRates = [];
        for(let k of Object.keys(rates)){
            // formattedRates.push(<Unit key={k} type={k}>{k}: <Unit type={base}>{base} 1 = </Unit>{rates[k]}</Unit>);
            formattedRates.push(<Unit key={k} type={k} conversion={rates[k]} baseType={base}></Unit>)
        }
        const modalValues = [];
        for(let k of Object.keys(symbols)){
            modalValues.push(<Button key={k} onClick={() => this.setBase(symbols[k])}>{symbols[k]}</Button>)
        }
      return (
        <Card>
            <CardTitle>Exchange Rates: <Button onClick={this.showModal}><Unit type={base} base={true} /></Button></CardTitle>
            <CardSubtitle>For <Moment>{date}</Moment></CardSubtitle>
            <CardBody style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridColumnGrap: '1em',
                gridRowGrap: '1em'
            }}>
              {this.state.collapse ? <Fragment></Fragment>formattedRates.splice(0,3)}: {formattedRates} }
            </CardBody>
            <Modal isOpen={this.state.modal} toggle={this.showModal} >
                <ModalHeader>Select Base Currency</ModalHeader>
                {modalValues}
            </Modal>
        </Card>
      );
    }
  }
}

export default ListView;
