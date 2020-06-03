import React, { Component } from "react";
import { compose } from "recompose";

import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

const AdminPage = () => (
  <div>
    <h1>Admin Page</h1>
    <ActivitiesAdmin />
  </div>
);

class ActivitiesBaseAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      url: "",
      featured: false,
      headerImage: null,
      headerImageUrl: "",
      headerPosition: "left",
      bgImage: null,
      bgImageUrl: "",
      description: "",
      shortDescription: "",
      galleryImages: [],
      galleryImagesUrls: [],
      extras: "",
      progress: 0,
      loading: false,
      activities: [],
    };

    this.onChangeText = this.onChangeText.bind(this);
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

  onChangeText = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeHeaderImgUpload = (e) => {
    if (e.target.files[0]) {
      const headerImage = e.target.files[0];
      this.setState(() => ({ headerImage }));
    }
  };

  onChangeBgImgUpload = (e) => {
    if (e.target.files[0]) {
      const bgImage = e.target.files[0];
      this.setState(() => ({ bgImage }));
    }
  };

  onChangeGalleryImgUpload = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      console.log(newFile);
      newFile["id"] = i + 1;
      this.setState((previousState) => ({
        galleryImages: [...previousState.galleryImages, newFile],
      }));
    }
  };

  handleHeaderImgUpload = (e) => {
    e.preventDefault();
    const { headerImage } = this.state;
    const uploadTask = this.props.firebase.storage
      .ref(`images/${headerImage.name}`)
      .put(headerImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        this.props.firebase.storage
          .ref("images")
          .child(headerImage.name)
          .getDownloadURL()
          .then((headerImageUrl) => {
            this.setState({ headerImageUrl });
          });
      }
    );
  };

  handleBgImgUpload = (e) => {
    e.preventDefault();
    const { bgImage } = this.state;
    const uploadTask = this.props.firebase.storage
      .ref(`images/${bgImage.name}`)
      .put(bgImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        this.props.firebase.storage
          .ref("images")
          .child(bgImage.name)
          .getDownloadURL()
          .then((bgImageUrl) => {
            this.setState({ bgImageUrl });
          });
      }
    );
  };

  handleGalleryImgUpload = (e) => {
    e.preventDefault();
    const promises = [];
    const files = this.state.galleryImages;
    const urls = [];
    files.forEach((file) => {
      const uploadTask = this.props.firebase.storage
        .ref(`images/${file.name}`)
        .put(file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        async () => {
          const url = await uploadTask.snapshot.ref.getDownloadURL();
          urls.push(url);
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        alert("All files uploaded");
        this.setState({ galleryImagesUrls: urls });
      })
      .catch((err) => console.log(err.code));
  };

  onCreateActivity = (event) => {
    event.preventDefault();
    console.log(this.state.featured);
    this.props.firebase.activities().push({
      title: this.state.title,
      url: this.state.url,
      featured: this.state.featured,
      headerImage: this.state.headerImage,
      headerImageUrl: this.state.headerImageUrl,
      headerPosition: this.state.headerPosition,
      bgImage: this.state.bgImage,
      bgImageUrl: this.state.bgImageUrl,
      description: this.state.description,
      shortDescription: this.state.shortDescription,
      galleryImages: this.state.galleryImages,
      galleryImagesUrls: this.state.galleryImagesUrls,
      extras: this.state.extras,
    });

    this.setState({
      title: "",
      url: "",
      headerImage: null,
      headerImageUrl: "",
      headerPosition: "left",
      bgImage: null,
      bgImageUrl: "",
      description: "",
      shortDescription: "",
      galleryImages: [],
      galleryImagesUrls: [],
      extras: "",
    });
  };

  onRemoveActivity = (uid) => {
    this.props.firebase.activity(uid).remove();
  };

  onChangeRadio = (e) => {
    this.setState({ headerPosition: e.target.value });
  };

  onChangeFeatured = (e) => {
    this.setState((prevState) => ({
      featured: !prevState.featured,
    }));
  };

  render() {
    const {
      title,
      url,
      description,
      shortDescription,
      extras,
      activities,
      loading,
    } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading ...</div>}

            {activities ? (
              <ActivityListAdmin
                activities={activities}
                onRemoveActivity={this.onRemoveActivity}
              />
            ) : (
              <div>There are no activities ...</div>
            )}

            <form
              className="form"
              onSubmit={(event) => this.onCreateActivity(event, authUser)}
            >
              <div className="form-addtitle">
                {" "}
                <input
                  className="add-title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.onChangeText}
                  placeholder="Title"
                />
                <input
                  className="add-url"
                  type="text"
                  name="url"
                  value={url}
                  onChange={this.onChangeText}
                  placeholder="URL"
                />
                {this.state.featured.toString()}
                <input
                  type="checkbox"
                  name="featured"
                  onChange={this.onChangeFeatured}
                />
              </div>
              <div className="form-adddesc">
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.onChangeText}
                  placeholder="Description"
                />
                <input
                  type="text"
                  name="shortDescription"
                  value={shortDescription}
                  onChange={this.onChangeText}
                  placeholder="Short Description"
                />
              </div>
              <input
                type="text"
                name="extras"
                value={extras}
                onChange={this.onChangeText}
                placeholder="Extras (comma between every item)"
              />
              <div className="form-adbg">
                <input type="file" onChange={this.onChangeBgImgUpload} />
                <button onClick={this.handleBgImgUpload}>Upload Header</button>
              </div>
              <div className="form-addheader">
                <input type="file" onChange={this.onChangeHeaderImgUpload} />
                <span>Header Position:</span>
                <input
                  type="radio"
                  name="headerPosition1"
                  value="left"
                  checked={this.state.headerPosition === "left"}
                  onChange={this.onChangeRadio}
                />
                <label for="headerPosition1">Left</label>
                <input
                  type="radio"
                  name="headerPosition2"
                  value="right"
                  checked={this.state.headerPosition === "right"}
                  onChange={this.onChangeRadio}
                />
                <label for="headerPosition2">Right</label>
                <button onClick={this.handleHeaderImgUpload}>
                  Upload Header
                </button>
              </div>

              {/*<progress
                value={this.state.progress}
                max="100"
                className="progress"
              />*/}

              <div className="form-addgallery">
                {" "}
                <input
                  type="file"
                  multiple
                  onChange={this.onChangeGalleryImgUpload}
                />
                <button onClick={this.handleGalleryImgUpload}>
                  Upload gallery photos
                </button>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const ActivityListAdmin = ({ activities, onRemoveActivity }) => (
  <div className="admin-activities-container">
    {activities.map((activity) => (
      <ActivityItemAdmin
        key={activity.uid}
        activity={activity}
        onRemoveActivity={onRemoveActivity}
      />
    ))}
  </div>
);

const ExtrasList = ({ activity }) => {
  const extrasArray = activity.extras.split(",");
  const listItems = extrasArray.map((item, index) => (
    <li className="admin-extras-ul-li" key={index}>
      {" "}
      {item}
    </li>
  ));
  return <ul className="admin-extras-ul">{listItems}</ul>;
};

const Gallery = ({ activity }) => {
  const urls = activity.galleryImagesUrls;
  const images = urls.map((url, index) => (
    <img key={index} src={url} alt="gallery-img" />
  ));
  return <div className="admin-gallery-container">{images}</div>;
};

const ActivityItemAdmin = ({ activity, onRemoveActivity }) => (
  <div className="admin-activities-item">
    <div className="header-title-description">
      {" "}
      <img
        className="admin-header-img"
        src={activity.headerImageUrl}
        alt="header-img"
      />
      <div className="title-description">
        <h3>
          Title: {activity.title} 
          <span>Featured: {activity.featured.toString()}</span>
          <span>Url: /{activity.url}</span>
          <button type="button" onClick={() => onRemoveActivity(activity.uid)}>
            Delete
          </button>
        </h3>
        <p>
          <b>Description: </b>
          {activity.description}
        </p>
        <p>
          <b>Short Description: </b>
          {activity.shortDescription}
        </p>
        <div className="extras-gallery">
          <div className="admin-extras">
            <b>Extras: </b>
          </div>
          <div className="admin-extras-list">
            <ExtrasList activity={activity} />{" "}
          </div>
          <div className="admin-extras">
            <b>Gallery: </b>
          </div>
          <div>
            <Gallery activity={activity} />
          </div>
          <img
            className="admin-bg-img"
            src={activity.bgImageUrl}
            alt="header-img"
          />
        </div>
      </div>
    </div>
  </div>
);

const condition = (authUser) => !!authUser;
const ActivitiesAdmin = withFirebase(ActivitiesBaseAdmin);

export default compose(withAuthorization(condition))(AdminPage);
