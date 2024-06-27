import React, { Component } from "react";
import { connect } from "react-redux";
// import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    
    return (
      <div className="home-footer">
       <p>TanIT<a target="_blank" href="https://www.youtube.com/watch?v=MeTksdPTKgE">Click here</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
