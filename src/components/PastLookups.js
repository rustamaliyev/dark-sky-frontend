import React, { Component } from "react";
import axios from "axios";
import groupBy from "json-groupby";

class PastLookups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookups: [],
      days: []
    };
  }

  componentDidMount() {
    axios.get("https://darksky-backend.herokuapp.com/all-lookups").then(response => {
      this.setState({ lookups: response.data });
    });
  }

  handleClick(id) {
    axios
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
    const { lookups } = this.state;
    const { days } = this.state;

    return (
      <div class="row">
        <div class="col-md-12 p-5">
          <h3>Past Lookups</h3>

          <table class="table table-dark">
            <thead>
              <tr>
                <th>Lookup Time</th>
                <th>Latitude</th>
                <th>Longtitude</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lookups.length
                ? lookups.map(lookup => (
                    <tr>
                      <td key={lookup._id}>{lookup.lookupDate}</td>
                      <td>{lookup.lookupLat}</td>
                      <td>{lookup.lookupLong}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-warning"
                          onClick={event => {
                            this.handleClick(lookup._id);
                          }}
                        >
                          Weather Report
                        </button>
                      </td>
                    </tr>
                  ))
                : null}

              <tr>
                <td colSpan="4">
                  {days.length
                    ? days.map(day => (
                        <div class="container" key={day._id}>
                          <div style={{ float: "left", width: "9rem" }}>
                            <div class="text-center">
                              <p class="card-text small">
                                <b>{day.day.date}</b>
                              </p>
                              <p class="card-text small">
                                Summary: {day.day.summary}
                              </p>
                              <p class="card-text small">
                                Humidity: {day.day.humidity}
                              </p>
                              <p class="card-text small">
                                Lows: {day.day.temperatureMin}
                              </p>
                              <p class="card-text small">
                                Highs: {day.day.temperatureMax}
                              </p>
                              <p class="card-text small">
                                Precip: {day.day.precipType}
                              </p>
                              <p class="card-text small">
                                Inches: {day.day.inches}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    : null}{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PastLookups;
