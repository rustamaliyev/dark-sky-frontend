import React, { Component } from "react";
import axios from "axios";

class Lookup extends Component {
  constructor() {
    super();
    this.state = {
      lookupLat: "41.8818",
      lookupLong: "-87.6231",
      days: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { lookupLat, lookupLong } = this.state;

    axios
      //.post("http://localhost:3001/lookup", { lookupLat, lookupLong })
      .post("https://darksky-backend.herokuapp.com/lookup", { lookupLat, lookupLong })
      .then(res => {
        const lookupData = res.data;
        this.setState({
          lookupdate: res.data.lookupDate,
          lookuplat: res.data.lookupLat,
          lookuplong: res.data.lookupLong,
          lookupid: res.data._id
        });
      });
  }

  handleChange(id) {
    axios
      //.get("http://localhost:3001/lookup-days", {
      .get("https://darksky-backend.herokuapp.com/lookup-days", {
        params: {
          id: id
        }
      })
      .then(response => {
        this.setState({ days: response.data });
      });
  }

  render() {
    const { lookupLat, lookupLong } = this.state;
    const { days } = this.state;
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-12 p-5">
            <div class="card-deck p-5">
              <div class="card">
                <div class="card-body text-center">
                  <p class="card-text">Lookup Date: {this.state.lookupdate}</p>
                  <p class="card-text">Latitude: {this.state.lookuplat}</p>
                  <p class="card-text">Longtitude: {this.state.lookuplong}</p>
                  <p
                    class="card-text"
                    onChange={this.handleChange(this.state.lookupid)}
                  >
                    ID: {this.state.lookupid}
                  </p>
                </div>
              </div>
            </div>
            <div class="card-group">
              {days.length
                ? days.map(day => (
                    <div key={day._id}>
                      <div
                        class="card"
                        style={{ float: "left", width: "9rem" }}
                      >
                        <div class="card-body text-center">
                          <p class="card-text">{day.day.date}</p>
                          <p class="card-text">Summary: {day.day.summary}</p>
                          <p class="card-text">Humidity: {day.day.humidity}</p>
                          <p class="card-text">
                            Lows: {day.day.temperatureMin}
                          </p>
                          <p class="card-text">
                            Highs: {day.day.temperatureMax}
                          </p>
                          <p class="card-text">Precip: {day.day.precipType}</p>
                          <p class="card-text">Inches: {day.day.inches}</p>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 p-5">
            <div class="container">
              <form>
                <div class="form-group">
                  <label for="lookupLat">Enter Latitude</label>
                  <input
                    class="form-control"
                    type="text"
                    name="lookupLat"
                   
                    onChange={this.onChange}
                    placeholder="Enter Latitude"
                  />
                </div>

                <div class="form-group">
                  <label for="lookupLong">Enter Longtitude</label>
                  <input
                    class="form-control"
                    type="text"
                    name="lookupLong"
                   
                    onChange={this.onChange}
                    placeholder="Enter Longtitude"
                  />
                </div>
                <button
                  class="btn btn-primary"
                  onClick={this.handleClick}
                  type="submit"
                >
                  Lookup weather for past 7 days
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lookup;
