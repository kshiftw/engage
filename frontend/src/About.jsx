import React, { PureComponent, Fragment } from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import "./about.css";

export default class About extends PureComponent {
  render() {
    const about = this.props.about.map((person) => (
      <div Class="user-card">
        <img
          src={person.profilePicture}
          alt="profile-picture"
          style={{ width: 150, borderRadius: "1000px" }}
        />
        <h1>{person.name}</h1>
        <p>{person.info}</p>
      </div>
    ));
    console.log(about);
    return (
      <Fragment>
        <h1 class="meet-team">Meet the team</h1>
        <p>Some description.....</p>
        <Container>
          <div className="users-container">{about}</div>
        </Container>
      </Fragment>
    );
  }
}
