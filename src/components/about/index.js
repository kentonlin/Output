import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import './style.css';

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
      <iframe src="https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
        <h1>
          About
        </h1>
        <div> {this.state.good} </div>
      </div>
    );
  }
}
