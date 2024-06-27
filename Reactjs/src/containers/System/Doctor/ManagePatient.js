import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor } from "../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemeryModal from "./RemeryModal";
import { postSendRemery } from "../../../services/userService";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay-ts";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenModalRemery: false,
      dataModal: {},
      isShowLoanding: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
    console.log("check data", res);
  };
  async componentDidUpdate(prevProps, prevState) {}

  handleOnChangeDatePicker = (data) => {
    this.setState(
      {
        currentDate: data[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenModalRemery: true,
      dataModal: data,
    });
    console.log("check data 1", data);
  };

  closeRemeryModal = () => {
    this.setState({
      isOpenModalRemery: false,
      dataModal: {},
    });
  };

  sendRemeryModal = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoanding: true,
    });
    let res = await postSendRemery({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res && res.errCode === 0) {
      toast.success("Send Remery succees");
      this.setState({
        isShowLoanding: false,
      });
      this.closeRemeryModal();
      await this.getDataPatient();
    } else {
      toast.error("Send Remery failed");
      this.setState({
        isShowLoanding: false,
      });
    }
  };
  render() {
    let { language } = this.props;
    let { dataPatient, isOpenModalRemery, dataModal } = this.state;
    console.log("check", dataPatient);
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoanding}
          spinner
          text="Loading your content..."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
            <div className="manage-patient-body">
              <div className="row"></div>
              <div className="col-4 form-group">
                <label>Chọn ngày khám</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table style={{ width: "100%" }}>
                  <tr>
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th>Họ và tên</th>
                    <th>Địa chỉ</th>
                    <th>Giới tính</th>
                    <th>Actions</th>
                  </tr>

                  {dataPatient && dataPatient.length > 0 ? (
                    dataPatient.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {language === LANGUAGES.VI
                              ? item.timeTypeDataPatient.valueVi
                              : item.timeTypeDataPatient.valueEn}
                          </td>
                          <td>{item.patientData.firstName}</td>
                          <td>{item.patientData.address}</td>
                          <td>
                            {language === LANGUAGES.VI
                              ? item.patientData.genderData.valueVi
                              : item.patientData.genderData.valueEn}
                          </td>
                          <td>
                            <button
                              className="mp-btn-confirm"
                              onClick={() => this.handleBtnConfirm(item)}
                            >
                              Xác nhận
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No data
                      </td>
                    </tr>
                  )}
                </table>
              </div>
            </div>
          </div>
          <RemeryModal
            isOpenModal={isOpenModalRemery}
            dataModal={dataModal}
            closeRemeryModal={this.closeRemeryModal}
            sendRemeryModal={this.sendRemeryModal}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
  user: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
