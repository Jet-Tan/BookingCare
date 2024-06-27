import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtrainfor.scss";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { getExtraInforDoctorById } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { NumericFormat } from "react-number-format";

class DoctorExtrainfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
    if (res && res.errCode === 0) {
      this.setState({
        extraInfor: res.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  hideShow = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;

    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
          </div>
          <div className="name-clinic">
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false ? (
            <>
              <div>
                <FormattedMessage id="patient.extra-infor-doctor.price" />
                {extraInfor && extraInfor.priceData ? (
                  language === LANGUAGES.VI ? (
                    <NumericFormat
                      className="currency"
                      value={extraInfor.priceData.valueVi}
                      suffix={"VND"}
                      displayType="text"
                      thousandSeparator={true}
                    />
                  ) : (
                    <NumericFormat
                      className="currency"
                      value={extraInfor.priceData.valueEn}
                      suffix={"$"}
                      displayType="text"
                      thousandSeparator={true}
                    />
                  )
                ) : (
                  "Price data is unavailable"
                )}
              </div>

              <span onClick={() => this.hideShow(true)} className="show">
                <FormattedMessage id="patient.extra-infor-doctor.detail" />
              </span>
            </>
          ) : (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-infor-doctor.price" />
              </div>
              <div className="infor-detail">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                  </span>
                  <span className="right">
                    {extraInfor && extraInfor.priceData ? (
                      language === LANGUAGES.VI ? (
                        <NumericFormat
                          className="currency"
                          value={extraInfor.priceData.valueVi}
                          suffix={"VND"}
                          displayType="text"
                          thousandSeparator={true}
                        />
                      ) : (
                        <NumericFormat
                          className="currency"
                          value={extraInfor.priceData.valueEn}
                          suffix={"$"}
                          displayType="text"
                          thousandSeparator={true}
                        />
                      )
                    ) : (
                      "Price data is unavailable"
                    )}
                  </span>
                </div>
                <div className="note">
                  {extraInfor && extraInfor.note ? extraInfor.note : ""}
                </div>
              </div>

              <div className="payment">
                <FormattedMessage id="patient.extra-infor-doctor.payment" />{" "}
                {extraInfor && extraInfor.paymentData && language ===LANGUAGES.VI
                  ? extraInfor.paymentData.valueVi
                  : ""}
                  {extraInfor && extraInfor.paymentData && language ===LANGUAGES.EN
                  ? extraInfor.paymentData.valueEn
                  : ""}
              </div>
              <span onClick={() => this.hideShow(false)} className="hide">
                <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
              </span>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
