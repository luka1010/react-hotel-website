import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

const SingleActivityPage = () => (
  <div>
    <SingleActivity />
  </div>
);

class SingleActivityBase extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loading: false,
      url: this.props.match.params.url,
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

        const activity = activityList.find(
          (activity) => activity.url === this.state.url
        );

        this.setState({ activity: activity, loading: false });
      } else {
        this.setState({ activitiy: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.activities().off();
  }

  render() {
    const { activity, loading } = this.state;
    return (
      <div>
        {loading && <div>Loading ...</div>}

        {activity ? (
          <div>
            <div className="bg-image-container">
              <img className="bg-image" src={activity.bgImageUrl} alt="kappa" />
              <Banner activity={activity} />
            </div>
            <div className="desc-gallery">
              <div className="single-desc">{activity.description}</div>
              <Gallery activity={activity} position="right" />
            </div>
            <div className="gallery-extras">
              <Gallery activity={activity} position="left" />
              <div className="single-extras">
                <div className="extras-contact">
                  <h1>Equipment and extra activities:</h1>
                  <div>
                    <ExtrasList activity={activity} />
                  </div>
                  <div className="contact">
                    <h3>Contact:</h3>
                    <ul className="contact-ul">
                      <li>Pera Čingrije 7, 20000 Dubrovnik</li>
                      <li>T: +385 20 330 390</li>
                      <li>E: inquiry@hotelrixos.hr</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const Banner = ({ activity }) => (
  <div className="single-activity-banner">
    <h1>{activity.title}</h1>
  </div>
);

const Gallery = ({ activity, position }) => {
  const urls1 = activity.galleryImagesUrls.slice(0, 2);
  const urls2 = activity.galleryImagesUrls.slice(2, 4);
  console.log(urls1);
  console.log(urls2);
  const images1 = urls1.map((url, index) => (
    <div className="single-gallery-img-container">
      <img key={index} src={url} alt="single-gallery-img" />
    </div>
  ));
  const images2 = urls2.map((url, index) => (
    <div className="single-gallery-img-container">
      <img key={index} src={url} alt="single-gallery-img" />
    </div>
  ));
  if (position === "left")
    return <div className="single-gallery-container">{images1}</div>;
  else return <div className="single-gallery-container">{images2}</div>;
};

const ExtrasList = ({ activity }) => {
  const extrasArray = activity.extras.split(",");
  const listItems = extrasArray.map((item, index) => (
    <li className="single-extras-ul-li" key={index}>
      {item}
    </li>
  ));
  return <ul className="single-extras-ul">{listItems}</ul>;
};

const SingleActivity = compose(withRouter, withFirebase)(SingleActivityBase);

export default SingleActivityPage;
