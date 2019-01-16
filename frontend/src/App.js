import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {
  Card,
  Button,
  Form,
  FormGroup,
  CardTitle,
  CardText,
  Label,
  Input
} from 'reactstrap';
import L from 'leaflet';
import './App.css';

var myIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        lat: 51.505,
        lng: -0.09
      },
      haveUsersLocation: false,
      zoom: 2,
      userInfo: {
        name: '',
        message: ''
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUsersLocation: true,
          zoom: 13
        });
      },
      async () => {
        const url = 'https://ipapi.co/json';

        const response = await fetch(url);

        const location = await response.json();

        this.setState({
          location: {
            lat: location.latitude,
            lng: location.longitude
          },
          haveUsersLocation: true,
          zoom: 13
        });
      }
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.userInfo);
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        [name]: value
      }
    }));
  };

  render() {
    const { location, zoom, haveUsersLocation } = this.state;
    const position = [location.lat, location.lng];

    return (
      <div className="map-container">
        <Map className="map-container" center={position} zoom={zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {haveUsersLocation && (
            <Marker position={position} icon={myIcon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )}
        </Map>
        <Card body className="message-form">
          <CardTitle>Welcome to your personal map</CardTitle>
          <CardText>Leave a message with your location.</CardText>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                placeholder="Enter Your Message Here"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button type="submit" color="info" disabled={!haveUsersLocation}>
              Send
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default App;
