import React, { Component } from "react";
import axios from "axios";

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "hasError" : false
        };
    }
    
    componentDidMount() {
        axios.get("https://api.ratesapi.io/api/latest").then(response => console.log(response));
    }
  
    render() {
        if (this.state.hasError) {
            return (<p>Put any sort of error information here</p>);
        } else {
            return (<p>Put all list related items here, see README for more instructions</p>);
        }
    }
}

export default ListView;