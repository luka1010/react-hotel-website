import React, { Component } from "react";
import { withFirebase } from "../Firebase";

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function ActivitiesPage() {
  return (
    <div>
      <Activities />
    </div>
  );
}

class ActivitiesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activities: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.activities().on("value", (snapshot) => {
      const activityObject = snapshot.val();

      if (activityObject) {
        const activityList = Object.keys(activityObject).map((key) => ({
          ...activityObject[key],
          uid: key,
        }));

        this.setState({ activities: activityList, loading: false });
      } else {
        this.setState({ activities: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.activities().off();
  }

  render() {
    const { activities, loading } = this.state;
    return (
      <div>
        {loading && <div>Loading ...</div>}

        {activities ? (
          <>
            <FeaturedList activities={activities} />
            <ActivityList activities={activities} />
          </>
        ) : (
          <div>There are no activites ...</div>
        )}
      </div>
    );
  }
}

const FeaturedList = ({ activities }) => (
  <>
    <div className="featured-desc">
      <div className="featured-title">
        <h6>MAKE MEMORIES HAPPEN ...</h6>
        <h1>Featured activities</h1>
      </div>
      <div className="featured-text">
        Take advantage of special savings and exclusive offers when you book
        direct with Adriatic Luxury Hotels. Whether you’re looking to explore
        Dubrovnik and other parts of the beautiful south Dalmatia, or perhaps
        you just want a weekend away, we have special packages across our
        properties to suit your needs.
      </div>
    </div>
    <div className="gridcontainer">
      {activities
        .filter((activity) => activity.featured === true)
        .map((activity) => (
          <FeaturedItem key={activity.uid} activity={activity} />
        ))}
    </div>
  </>
);

const FeaturedItem = ({ activity }) => (
  <div className="gridelements">
    <Link to={`/${activity.url}`}>
      <div className="gridimagecontainer">
        <img
          src={activity.headerImageUrl}
          alt="grid-first"
          className="gridimg"
        />
      </div>
      <div className="gridtextcontainer">
        <h2>{activity.title}</h2>
        <p>{activity.shortDescription}</p>
        <div className="griddate">
          <div>29th of August - 1st of Semptember</div>
          <div className="details-link">
            <FaArrowRight className="details-icon" />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const ActivityList = ({ activities }) => (
  <div className="activities-container">
    {activities
      .filter((activity) => activity.featured === false)
      .map((activity) => (
        <ActivityItem key={activity.uid} activity={activity} />
      ))}
  </div>
);

const ActivityItem = ({ activity }) => (
  <div
    className={
      activity.headerPosition === "left"
        ? "activities-item-left"
        : "activities-item-right"
    }
  >
    {activity.headerPosition === "left"
      ? getImage({ activity })
      : getDesc({ activity })}
    {activity.headerPosition === "left"
      ? getDesc({ activity })
      : getImage({ activity })}
  </div>
);

const getImage = ({ activity }) => (
  <img
    className="activities-img"
    src={activity.headerImageUrl}
    alt="header-img"
  />
);

const getDesc = ({ activity }) => (
  <div className="activities-description">
    <h1>{activity.title}</h1>
    <p>{activity.shortDescription}</p>
    <div className="details-link">
      <Link to={`/${activity.url}`}>
        <span>DETAILS </span>
        <span>
          <FaArrowRight className="details-icon" />
        </span>
      </Link>
    </div>
  </div>
);

const Activities = withFirebase(ActivitiesBase);

export default ActivitiesPage;
