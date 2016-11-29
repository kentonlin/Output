import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import './style.css';

export default class About extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {};

  constructor(props) {
    super(props);
    this.state = {
      inputSpotifyQ: "",
      inputYTQuery: "",
      inputSpotifyQarray: [],
      inputSpotifyQarrayIndex: 0
    };

    this.searchSpotArtist = this.searchSpotArtist.bind(this);
    this.searchSpotTrack = this.searchSpotTrack.bind(this);
    this.changeSpotTrack = this.changeSpotTrack.bind(this);
  }

  componentDidMount(){

  }

  searchSpotArtist() {
    var url = "https://api.spotify.com/v1/search?q=" + this.state.inputYTQuery + "&type=artist";
    $.ajax({
      type: 'GET',
      url: url,
      headers: {
        "content-type": "application/json"
      },
      success: function(data) {
        console.log(data.artists.items[0].uri);
        this.setState({
          inputSpotifyQ: data.artists.items[0].uri
        });
      }.bind(this)
    });
  }

  searchSpotTrack() {
    var url = "https://api.spotify.com/v1/search?q=" + this.state.inputYTQuery + "&type=track";
    $.ajax({
      type: 'GET',
      url: url,
      headers: {
        "content-type": "application/json"
      },
      success: function(data) {
        this.setState({
          inputSpotifyQarray: data.tracks.items
        },function(){
          this.setState({
            inputSpotifyQ: this.state.inputSpotifyQarray[this.state.inputSpotifyQarrayIndex].uri
          });
          console.log('inputSpotifyQarray',this.state.inputSpotifyQarray);
        }.bind(this));
      }.bind(this)
    });
  }

  changeSpotTrack(){
    this.setState({
      inputSpotifyQarrayIndex: this.state.inputSpotifyQarrayIndex +=1
    },function(){
      this.setState({
        inputSpotifyQ: this.state.inputSpotifyQarray[this.state.inputSpotifyQarrayIndex].uri
      });
    }.bind(this));
  }

  render() {
    const { className, ...props } = this.props;
    return (

  //     <Form inline>
  //   <FormGroup controlId="formInlineName">
  //     <ControlLabel>Name</ControlLabel>
  //     {' '}
  //     <FormControl type="text" placeholder="Jane Doe" />
  //   </FormGroup>
  //   {' '}
  //   <FormGroup controlId="formInlineEmail">
  //     <ControlLabel>Email</ControlLabel>
  //     {' '}
  //     <FormControl type="email" placeholder="jane.doe@example.com" />
  //   </FormGroup>
  //   {' '}
  //   <Button type="submit">
  //     Send invitation
  //   </Button>
  // </Form>
      <div className={classnames('About', className)} {...props}>
        <div className="searchbars">
          <div className="artistSearch">
            <h2>
              Input Artist Name
            </h2>
            <input className="inputArtist" placeholder="Artist" type="text" onChange={(event) => {this.setState({inputYTQuery: event.target.value})}}/>
            <Button bsStyle='primary' onClick={this.searchSpotArtist}> <div> <i className="fa fa-search" aria-hidden="true"></i> Search </div> </Button>
          </div>
          <div className="trackSearch">
            <h2>
              Input Track Title
            </h2>
            <input className="inputTrack" placeholder="Track" type="text" onChange={(event) => {this.setState({inputYTQuery: event.target.value})}}/>
            <Button bsStyle='primary' onClick={this.searchSpotTrack}> <div> <i className="fa fa-search" aria-hidden="true"></i> Search </div> </Button>
            <Button bsStyle='primary' onClick={this.changeSpotTrack}> <div> <i className="fa fa-search" aria-hidden="true"></i> Try Again </div> </Button>
          </div>
        </div>
        <div className="iframes">
          <div id="player"></div>
            <iframe id="ytplayer" type="text/html" width="640" height="360"
            src={"https://www.youtube.com/embed?listType=search&list=" + this.state.inputYTQuery}
            frameborder="0"></iframe>
            <iframe src={"https://embed.spotify.com/?uri=" + this.state.inputSpotifyQ}width="300" height="360" frameborder="0" allowtransparency="true"></iframe>
        </div>
      </div>
    );
  }
}
