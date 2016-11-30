import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
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
      inputSpotifyQarrayIndex: 0,
      inputLyricsQueryArtist: "",
      inputLyricsQueryTrack: "",
      lyrics: "",
      image: ""
    };

    this.searchSpotArtist = this.searchSpotArtist.bind(this);
    this.searchSpotTrack = this.searchSpotTrack.bind(this);
    this.changeSpotTrack = this.changeSpotTrack.bind(this);
    this.searchLyrics = this.searchLyrics.bind(this);
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
        console.log('searchspotifyartist',data.artists);
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

  searchLyrics(){


    $.ajax({
        type: "GET",
        data: {
            apikey:"309788821d050a0623303261b9ddedc4",
            q_track: this.state.inputLyricsQueryTrack,
            q_artist: this.state.inputLyricsQueryArtist,
            format:"jsonp",
            callback:"jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            this.setState({
              lyrics: data.message.body.lyrics.lyrics_body
            });
        }.bind(this),
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
      });
  }

  render() {
    const { className, ...props } = this.props;
    return (

      <div className={classnames('About', className)} {...props}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Output</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/">Profile</NavItem>
            <NavItem eventKey={1} href="/search">Search</NavItem>
          </Nav>
        </Navbar>
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
          <div>
            <h2>
              Search Lyrics
            </h2>
            <input className="inputLyrics" placeholder="Artist" type="text" onChange={(event) => {this.setState({inputLyricsQueryArtist: event.target.value})}}/>
            <input className="inputLyrics" placeholder="Track" type="text" onChange={(event) => {this.setState({inputLyricsQueryTrack: event.target.value})}}/>
            <Button bsStyle='primary' onClick={this.searchLyrics}> <div> <i className="fa fa-search" aria-hidden="true"></i> Search </div> </Button>
          </div>
        </div>
        <div className="lyrics">
          {this.state.lyrics}
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
