import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import './style.css';
var http = require('http');

export default class About extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {};

  constructor(props) {
    super(props);
    this.state = {
      good: "good",
      data: 'data'
    };
  }

  componentDidMount(){
    var MWS = require('mws-sdk-promises'),
    client = new MWS.Client('AKIAJOVYKDEC5IYAQR3A', 'nySEuqkG2coIW53NER', 'A2LX4IL6EQVA63', {}),
    MarketplaceId = "ATVPDKIKX0DER";


    function getListOrders(client, args) {
      var req = MWS.Orders.requests.ListOrders();
      req.set(args);
      return client.invoke(req);
    }
    var date = new Date();
    getListOrders(client, {
      MarketplaceId: MarketplaceId,
      MaxResultsPerPage: 10,
      CreatedAfter: new Date(2015, 1, 1),
      CreatedBefore: new Date(2015, 1, 31)
    })
    .catch(function(error) {
      console.error(error);
    })
    .then(function(RESULT){
      console.log("--------");
      console.log(JSON.stringify(RESULT));
      console.log("--------");
    });
    // $.ajax({
    //   type: 'GET',
    //   url: 'https://api.spotify.com/v1/artists/20qISvAhX20dpIbOOzGK3q',
    //   success: function(data){
    //     console.log('this is the data', data);
    //   }
    // });

  }

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('About', className)} {...props}>
        <h1>
          About
        </h1>
        <div> {this.state.good} </div>
        <div> {this.state.data} </div>
      </div>
    );
  }
}
