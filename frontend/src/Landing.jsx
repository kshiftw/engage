import React, { PureComponent, Fragment } from "react";
import { Container, Button } from "semantic-ui-react";
import "./styles/landing.css";
export default class Landing extends PureComponent {
  render() {
    const { selfUser } = this.props;

    return (
      <Fragment>
        <header className="m-header">
          <div id="particleCanvas-Red" className="e-particles"></div>
          <div id="particleCanvas-White" className="e-particles"></div>

          <div className="e-outercircles"></div>
          <div className="e-innercircles"></div>

          <div className="e-text">
            <div className="e-subtitle">Shell Hacks 2020</div>
            <h1>Engage</h1>
            <p>Engage is an Web App meant to engage students in learning</p>
          </div>
          <a href="">
            <div className="scroll-indicator">
              <span></span>
            </div>
          </a>
        </header>
        <div className="engage-content">
          <p>
            In this day and age, remaining on task can prove to be quite
            difficult. A lot of our favorite distractions and leisurely
            activities tend to be right within our grasp so it makes staying
            focused that much harder. Our team, however, has a solution. Our
            approach to tackling this worldwide problem is quite simple; if
            students stay on task for the set duration of the study session, a
            money tree is grown and they receive $100. Now, that’s ideally what
            would happen if we weren’t college students.
          </p>
          <p>
            But a virtual tree does grow, symbolizing the growth of the
            student’s knowledge. The student is free to choose how many hours to
            study for, and a timer will countdown to track how much time until
            they’ve reached the goal of the session. If students register, their
            account stores all the hours they’ve accumulated. An extra incentive
            to make students use the site is the leaderboards feature. By
            implementing this competitive option, it might give some students an
            extra incentive to try and study more than their fellow peers.
          </p>
        </div>
      </Fragment>
    );
  }
}
