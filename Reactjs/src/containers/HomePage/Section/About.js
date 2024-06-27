import React, { Component } from "react";
import { connect } from "react-redux";
// import "./About.scss";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Truyền thông</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/sUYF6hBNw-0"
              title="Imagine Dragons Best Playlist - Top 10 Songs Collection 2024 - Greatest Hits Songs of All Time"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Imagine Dragons Best Playlist - Top 10 Songs Collection 2024 -
              Greatest Hits Songs of All Time Imagine Dragons Best Playlist -
              Top 10 Songs Collection 2024 - Greatest Hits Songs of All Time
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
