import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonAvatar,
  IonFooter,
  IonTabButton,
  IonChip,
  IonCardSubtitle,
  IonList,
  IonThumbnail,
  useIonAlert,
  useIonLoading,
  IonBadge,
  IonToast,
  IonModal,
  IonButton,
  createAnimation,
} from "@ionic/react";
import React, { useRef } from "react";
import axios from "axios";
// import { useParams } from 'react-router';
// import ExploreContainer from '../components/ExploreContainer';
import "./Dashboard.css";
import { IonLabel, IonCol, IonGrid, IonRow } from "@ionic/react";
import { IonSelect, IonSelectOption, IonIcon } from "@ionic/react";
// import { IonReactRouter } from '@ionic/react-router';
// import { Redirect, Route } from 'react-router-dom';
// import Menu from '../components/Menu';
import {
  calendarOutline,
  schoolOutline,
  alarmOutline,
  fitnessOutline,
  notifications,
  notificationsCircleOutline,
  brush,
  layersOutline,
  backspaceOutline,
  peopleOutline,
  personCircleOutline,
  person,
  printOutline,
  createOutline,
  calculatorOutline,
  playCircle,
  radio,
  library,
  search,
  earth,
  call,
  locationOutline,
  map,
  barbellSharp,
  notificationsSharp,
  checkmarkCircleSharp,
  notificationsOutline,
} from "ionicons/icons";
import { Link } from "react-router-dom";
// import { setUserSession } from "./Common";
import { useState, useEffect } from "react";
import moment from "moment";

const Home: React.FC = () => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const [presentAlert] = useIonAlert();
  const [students, setStudents] = useState([] as any[]);
  const [student, setStudent] = useState([] as any[]);
  const [clas, setClas] = useState([] as any[]);
  const [classroom, setClassroom] = useState([] as any[]);
  const [infoSchool, setInfoSchool] = useState([] as any[]);

  const { localStorage } = window;

  const [schools, setSchools] = useState([] as any[]);
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id_school = localStorage.getItem("id_school");
    const loginData = {
      token: x,
    };

    api
      .post("/school-list", loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.content.length == 1) {
            const ids = res.data.content;
            const id = ids[0].id;
            setSchools(res.data.content);
            localStorage.setItem("id_school", id);
            // console.log("111111111111111111s",id)
            getInfo(id);
          } else {
            if (id_school == null) {
              presentAlert({
                header: "Vui lòng chọn trường",
                buttons: ["OK"],
              });
              setSchools(res.data.content);
            } else {
              setSelectedOption(id_school); // Cập nhật giá trị selectedOption
              setSchools(res.data.content);
              getInfo(id_school);
              
            }
          }
        }
      })
      .catch((error) => {});
  }, []);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectedOption1, setSelectedOption1] = useState<any>(null);
  const [selectedOption2, setSelectedOption2] = useState<any>(null);

  function getInfo(e: any) {
    if (e && e.target && e.target.value) {
      var value = e.target.value;
      // Tiếp tục xử lý dữ liệu...
    }
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id_student = localStorage.getItem("id_student");
    const loginData = {
      token: x,
    };
    api
      .post(`/students-list/` + e, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          localStorage.removeItem("id_school");
          localStorage.setItem("id_school", e);
          setSelectedOption(value);
          if (res.data.content.length == 1) {
            const ids = res.data.content;
            const id = ids[0].id;
            setStudents(res.data.content);
            setInfoSchool(res.data.school);
            localStorage.setItem("id_student", id);
            console.log("ccccccccccccccc", id);
            getClass(id);
          } else if(id_student){
            setSelectedOption1(id_student);
            setStudents(res.data.content);
            setInfoSchool(res.data.school);
            getClass(id_student)
          }
          
          else {
            setClassroom([]);
            setListClass([]);
            setStudent([]);

            setStudents(res.data.content);
            setInfoSchool(res.data.school);
          }
          //  }
        }
      })
      .catch((error) => {});
  }
  const [listClass, setListClass] = useState([] as any[]);
  function getClass(e: any) {
    if (e && e.target && e.target.value) {
      var value = e.target.value;
      // Tiếp tục xử lý dữ liệu...
    }
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id_class_diagram = localStorage.getItem("id_class_diagram");
    const loginData = {
      token: x,
    };
    api
      .post(`/student_class/` + e, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setSelectedOption1(value); 
          localStorage.setItem("id_student", e);

          if (res.data.class == null) {
            setListClass([]);
          } else if (res.data.class.length == 1) {
            const ids = res.data.class;
            const id = ids[0].id_class_diagram;
            console.log("vvvvvvvvvvv");
            setListClass(res.data.class);
            localStorage.setItem("id_class_diagram", id);
            getInfoStudent(id);
          } else if(id_class_diagram){
            setSelectedOption2(id_class_diagram);
            setListClass(res.data.class);
            getInfoStudent(id_class_diagram)
          }
          
          else {
            console.log("sssssssssssss", e);

            localStorage.setItem("id_student", e);
            
            setListClass(res.data.class);
           
          }
        }
      })
      .catch((error) => {});
  }
  const [showToast, setShowToast] = useState(false);
  const [car, setCar] = useState([] as any[]);
  const [count_teacher, setcount_teacher] = useState<number>(0);
  const [count_school, setcount_school] = useState<number>(0);
  const [furlough, setfurlough] = useState<number>(0);
  const [student_register_car, setstudent_register_car] = useState<number>(0);
  const [driver, setDriver] = useState([] as any[]);
  const [route, setroute] = useState([] as any[]);
  const [checkin, setCheckin] = useState([] as any[]);
  const [chechout, setcheckout] = useState([] as any[]);
  function getInfoStudent(e: any) {
    if (e && e.target && e.target.value) {
      var value = e.target.value;
      // Tiếp tục xử lý dữ liệu...
    }
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id_student = localStorage.getItem("id_student");
    const loginData = {
      token: x,
      id_student: id_student,
    };
    api
      .post(`/students/` + e, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          console.log("gggggggggggg", e);
          setSelectedOption2(value); // Cập nhật giá trị selectedOption
          localStorage.removeItem("id_class_diagram");
          localStorage.setItem("id_class_diagram", e);
          setStudent(res.data.content);
          // setClas(res.data.class);
          setClassroom(res.data.classroom);
          setCar(res.data.car);
          setDriver(res.data.driver);
          setcount_school(res.data.count_school);
          setcount_teacher(res.data.count_teacher);
          setfurlough(res.data.furlough);
          setstudent_register_car(res.data.student_register_car);
          setroute(res.data.route);
          setCheckin(res.data.timekeeping.checkin);
          setcheckout(res.data.timekeeping.checkout);
        }
      })
      .catch((error) => {});
  }

  const [showNotification, setShowNotification] = useState(true);
  useEffect(() => {
    if (furlough === 1 && showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    } else if (furlough === 2 && showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
    if (student_register_car === 1 && showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);
      return () => {
        clearTimeout(timer);
      };
    } else if (student_register_car === 2 && showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [furlough, showNotification]);
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Trang chủ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="container">
        {furlough === 1 && showNotification && (
          <div
            className="success-notification row mx-2 d-flex justify-content-bettwen"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div className="col-11">
              Xin nghỉ phép đã được phê duyệt thành công
            </div>
            <button
              className="col-1 bg-success rounded-circle text-white"
              onClick={handleCloseNotification}
            >
              X
            </button>
          </div>
        )}
        {furlough === 2 && showNotification && (
          <div
            className="success-notification row mx-2 d-flex justify-content-bettwen"
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div className="col-11">Xin nghỉ phép đã bị từ chối</div>
            <button
              className="col-1 bg-danger rounded-circle text-white"
              onClick={handleCloseNotification}
            >
              X
            </button>
          </div>
        )}

        {student_register_car === 1 && showNotification && (
          <div
            className="success-notification row mx-2 d-flex justify-content-bettwen"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div className="col-11">
              Đăng ký xe đã được phê duyệt thành công
            </div>
            <button
              className="col-1 bg-success rounded-circle text-white"
              onClick={handleCloseNotification}
            >
              X
            </button>
          </div>
        )}
        {student_register_car === 2 && showNotification && (
          <div
            className="success-notification row mx-2 d-flex justify-content-bettwen"
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div className="col-11">Đăng kí xe đã bị từ chối</div>
            <button
              className="col-1 bg-danger rounded-circle text-white"
              onClick={handleCloseNotification}
            >
              X
            </button>
          </div>
        )}
        <IonCard className="card-home-dashboard mx-1">
          <IonCardContent className="card-content-dashboard">
            <IonGrid className="grid">
              <IonRow className="row">
                <IonCol>
                  <IonLabel className="lable-name">Trường học :</IonLabel>
                </IonCol>
                <IonCol size="7">
                  <div style={{ width: "100%" }}>
                    <select
                      placeholder="Chọn trường học"
                      className="select-name w-100 border border-1"
                      // name="form-fied-name"
                      color="primary"
                      slot="start"
                      // interface="popover"
                      data-toggle="popover"
                      onChange={(e: any) => getInfo(e.target.value)}
                      value={selectedOption}
                    >
                      {schools.length > 1 ? (
                        <option value={""}>Chọn trường</option>
                      ) : null}
                      {schools.map((school, key) => {
                        return (
                          <option key={key} value={school.id}>
                            {school.name}
                          </option>
                        );
                        // }
                      })}
                    </select>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="grid">
              <IonRow className="row">
                <IonCol>
                  <IonLabel className="lable-name">Họ và tên :</IonLabel>
                </IonCol>
                <IonCol size="7">
                  <div style={{ width: "100%" }}>
                    <select
                      placeholder="Chon hoc sinh"
                      className="select-name w-100 border border-1"
                      name="form-fied-name"
                      color="primary"
                      slot="start"
                      // interface="popover"
                      data-toggle="popover"
                      onChange={(e: any) => getClass(e.target.value)}
                      value={selectedOption1}
                    >
                      {students.length > 1 ? (
                        <option value={""}>Chọn học sinh</option>
                      ) : null}
                      {students.map((student, key) => {
                        // if (student.length == 1) {
                        //   return (
                        //     <option key={key} value={student.id} selected>
                        //       {student.firstname} {student.lastname}
                        //     </option>
                        //   );
                        // } else {
                        return (
                          <option key={key} value={student.id}>
                            {student.firstname} {student.lastname}
                          </option>
                        );
                        // }
                      })}
                    </select>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="grid">
              <IonRow className="row">
                <IonCol>
                  <IonLabel className="lable-name">Lớp :</IonLabel>
                </IonCol>
                <IonCol size="7">
                  <div style={{ width: "100%" }}>
                    <select
                      placeholder="Chon lớp"
                      className="select-name w-100 border border-1"
                      name="form-fied-name"
                      color="primary"
                      slot="start"
                      // interface="popover"
                      data-toggle="popover"
                      onChange={(e: any) => getInfoStudent(e.target.value)}
                      value={selectedOption2}
                    >
                      {listClass.length > 1 ? (
                        <option value={""}>Chọn lớp</option>
                      ) : null}
                      {listClass.map((listClass, key) => {
                        return (
                          <option key={key} value={listClass.id_class_diagram}>
                            {listClass.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="grid">
              <IonRow className="row">
                <IonCol>
                  <IonLabel className="lable-name">Mã học sinh :</IonLabel>
                </IonCol>
                <IonCol className="tt" size="7">
                  {student.map((student, key) => {
                    return <h5>{student.id_student}</h5>;
                  })}
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="grid">
              <IonRow className="row">
                <IonCol>
                  <IonLabel className="lable-name">Phòng :</IonLabel>
                </IonCol>
                <IonCol className="tt" size="7">
                  {classroom.map((classroom, key) => {
                    return <h5>{classroom.name}</h5>;
                  })}
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="grid">
              <IonRow className="row">
                <IonCol>
                  <IonLabel className="lable-name">Ngày sinh :</IonLabel>
                </IonCol>
                <IonCol className="tt" size="7">
                  {student.map((student, key) => {
                    return (
                      <h5>{moment(student.birthday).format("DD-MM-YYYY")}</h5>
                    );
                  })}
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="grid">
              <IonRow className="row">
                <IonCol>
                  <IonLabel className="lable-name">Giới tính :</IonLabel>
                </IonCol>
                <IonCol className="tt" size="7">
                  {student.map((student, key) => {
                    return <h5>{student.gender}</h5>;
                  })}
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="grid">
              <IonRow className="row">
                <IonCol>
                  <IonLabel className="lable-name">Ngày hiện tại :</IonLabel>
                </IonCol>
                <IonCol className="tt" size="7">
                  <h5>{date}</h5>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid className="grid">
              <IonRow className="row">
                <IonCol>
                  <IonLabel className="lable-name fw-bold text-danger">
                    Giờ vào : {checkin}
                  </IonLabel>
                </IonCol>
                <IonCol className="tt fw-bold text-danger" size="7">
                  Giờ ra : {chechout}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonGrid>
          <IonRow>
            <IonCol>
              <Link to="/attendanceDiary">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={alarmOutline}
                      size="large"
                      color="warning"
                      style={{ marginBottom: 1, color: "#FF1493" }}
                    ></IonIcon>
                    <h6>Điểm danh</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/Scores">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={brush}
                      size="large"
                      style={{ marginBottom: 1, color: "#CD853F" }}
                    ></IonIcon>
                    <h6>Điểm</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/Schedule">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={calendarOutline}
                      size="large"
                      color="tertiary"
                      style={{ marginBottom: 1 }}
                    ></IonIcon>
                    <h6>Thời khóa biểu</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Link to="/meals">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={layersOutline}
                      size="large"
                      style={{ marginBottom: 1, color: "#000080" }}
                    ></IonIcon>
                    <h6>Thực đơn</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/leave">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={backspaceOutline}
                      size="large"
                      color="danger"
                      style={{ marginBottom: 1 }}
                    ></IonIcon>
                    <h6>Xin nghỉ phép</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/HealthRecord">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={fitnessOutline}
                      size="large"
                      style={{ marginBottom: 1, color: "#800080" }}
                    ></IonIcon>
                    <h6>Sức khỏe</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Link to="/news">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={schoolOutline}
                      size="large"
                      color="primary"
                      style={{ marginBottom: "1" }}
                    ></IonIcon>
                    <h6>Hoạt động</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/notifications">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <div className="notification-icon-container">
                      {count_school === 0 ? (
                        <IonIcon
                          icon={notifications}
                          size="large"
                          color="success"
                          style={{ marginBottom: 1 }}
                        ></IonIcon>
                      ) : null}

                      {count_school > 0 ? (
                        <>
                          <IonIcon
                            icon={notifications}
                            size="large"
                            color="success"
                            style={{ marginBottom: 1 }}
                            className="faa-ring animated"
                          ></IonIcon>

                          <IonBadge
                            color="danger"
                            className="notification-badge"
                          >
                            {count_school}
                          </IonBadge>
                        </>
                      ) : null}
                      <h6>Thông báo</h6>
                    </div>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/notificationTeacher">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <div className="notification-icon-container">
                      {count_teacher===0?(
                        <IonIcon
                        icon={notificationsCircleOutline}
                        size="large"
                        color="medium"
                        style={{ marginBottom: 1 }}
                      ></IonIcon>
                      ):null}
                      {count_teacher > 0 ? (
                        <>
                       <IonIcon
                        icon={notificationsCircleOutline}
                        size="large"
                        color="medium"
                        style={{ marginBottom: 1 }}
                        className="faa-ring animated"
                      ></IonIcon>
                        <IonBadge color="danger" className="notification-badge">
                          {count_teacher}
                        </IonBadge>
                        </>
                      ) : null}
                      <h6>Thông báo GV</h6>
                    </div>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Link to="/Teacher">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={peopleOutline}
                      size="large"
                      style={{ marginBottom: 1, color: "#FF00FF" }}
                    ></IonIcon>
                    <h6>Giáo viên</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/Profile">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={personCircleOutline}
                      size="large"
                      style={{ marginBottom: 1, color: "#C71585" }}
                    ></IonIcon>
                    <h6>Hồ sơ học sinh</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/Account">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={person}
                      size="large"
                      style={{ marginBottom: 1, color: "#006400" }}
                    ></IonIcon>
                    <h6>Tài khoản</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Link to="/Debt">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={printOutline}
                      size="large"
                      color="danger"
                      style={{ marginBottom: 1 }}
                    ></IonIcon>
                    <h6>Công nợ</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/Opinion">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={createOutline}
                      size="large"
                      color="dark"
                      style={{ marginBottom: 1 }}
                    ></IonIcon>
                    <h6>Góp ý</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/Cash">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={calculatorOutline}
                      size="large"
                      style={{ marginBottom: 1, color: "#808000" }}
                    ></IonIcon>
                    <h6>Sổ thu chi</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Link to="/RegisterMove">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={checkmarkCircleSharp}
                      size="large"
                      color="tertiary"
                      style={{ marginBottom: 1 }}
                    ></IonIcon>

                    <h6>Đăng ký xe</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol>
              <Link to="/notificationParent">
                <IonCard
                  className="card-grid-dashboard item-list-dashboard"
                  button
                >
                  <IonCardContent className="card-content-grid">
                    <IonIcon
                      icon={notificationsOutline}
                      size="large"
                      color="dark"
                      style={{ marginBottom: 1 }}
                    ></IonIcon>
                    <h6>Thông báo PH</h6>
                  </IonCardContent>
                </IonCard>
              </Link>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className="d-flex align-items-center">
            <IonCol className="text-2" size="9">
              Lịch trình đưa đón học sinh:
            </IonCol>
            <IonCol style={{ fontSize: "12px" }}>
              <Link to="/move" className="text-dark">
                Xem chi tiết
              </Link>
            </IonCol>
          </IonRow>
        </IonGrid>
        {car.map((car, key) => {
          return (
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between align-items-center breaking-news bg-white">
                  <div className="d-flex flex-row flex-grow-1 flex-fill justify-content-center bg-primary py-2 text-white px-1 route">
                    <span className="d-flex align-items-center">
                      &nbsp;Tuyến đường
                    </span>
                  </div>
                  <div className="marquee-container">
                    <div className="marquee">
                      <a href="#">{route}</a>
                      {/* <span className="dot"></span> */}
                      <a href="#" className="ms-4">
                        {route}
                      </a>
                      {/* <span className="dot"></span> */}
                      <a href="#" className="ms-4">
                        {route}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="https://vnn-imgs-a1.vgcloud.vn/znews-photo.zadn.vn/w1024/Uploaded/lce_cjvcc/2019_08_07/Blue_Bird_Vision_Montevideo_54.jpg"
          />
          {driver.map((driver, key) => {
            return (
              <IonCardHeader className="p-1 ps-1">
                <IonCardTitle className="car-name text-wrap fs-4">
                  <IonItem href="#">
                    <IonAvatar slot="start">
                      <img alt="avatar" src={`${driver.avatar}`} />
                    </IonAvatar>
                    <IonLabel className="text-center text-danger fw-bold">
                      {driver.name}
                    </IonLabel>
                  </IonItem>
                </IonCardTitle>
              </IonCardHeader>
            );
          })}

          <IonCardContent>
            {car.map((car, key) => {
              return (
                <IonGrid className="">
                  <IonRow className="pt-1">
                    <IonCol className="text-2">Tên xe:</IonCol>
                    <IonCol className="text-11" size="7">
                      {car.name}
                    </IonCol>
                  </IonRow>
                  <IonRow className="pt-1">
                    <IonCol className="text-2">Loại xe:</IonCol>
                    <IonCol className="text-11" size="7">
                      {car.typecar}
                    </IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Biển số xe:</IonCol>
                    <IonCol className="text-11" size="7">
                      {car.license_plates}
                    </IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Khung xe:</IonCol>
                    <IonCol className="text-11" size="7">
                      {car.frame_number}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              );
            })}
          </IonCardContent>
        </IonCard>

        {infoSchool.map((infoSchool, key) => {
          return (
            <>
              <IonLabel>
                <h1 className="text-dark fs-6 mt-2 mb-2 p-2">Giới thiệu:</h1>
              </IonLabel>

              <IonCard
                className="card-news m-0 mx-2"
                style={{ backgroundColor: "#e7eaf1" }}
              >
                <img
                  alt="Silhouette of mountains"
                  src="https://bcp.cdnchinhphu.vn/Uploaded/phungthithuhuyen/2020_06_16/Resize%20of%20truonghoc.png"
                />
                <IonCardHeader className="pd">
                  <IonCardTitle className="font font2">
                    {infoSchool.name}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="news">
                  Thông tin sở giáo dục và đào tạo hoạt động trường dự trên, tin
                  sở giáo dục và đào tạo hoạt động trường dự trên ...
                  <IonCardSubtitle className="">
                    <IonCardContent className="p-0 ">
                      <IonList className="pd0">
                        <IonList className="">
                          <IonItem className="h ">
                            <IonThumbnail
                              className="m-0   text-center"
                              slot="start"
                            >
                              <IonIcon
                                className="iconic "
                                icon={earth}
                              ></IonIcon>
                            </IonThumbnail>
                            <IonLabel className="m-0 p-0 ">
                              {infoSchool.website}
                            </IonLabel>
                          </IonItem>

                          <IonItem className="h">
                            <IonThumbnail
                              className="m-0 text-center"
                              slot="start"
                            >
                              <IonIcon className="iconic" icon={call}></IonIcon>
                            </IonThumbnail>
                            <IonLabel className="m-0">
                              {infoSchool.phone_number}
                            </IonLabel>
                          </IonItem>

                          <IonItem className="h">
                            <IonThumbnail
                              className="m-0 text-center"
                              slot="start"
                            >
                              <IonIcon
                                className="iconic"
                                icon={locationOutline}
                              ></IonIcon>
                            </IonThumbnail>
                            <IonLabel className="m-0">
                              {infoSchool.address}
                            </IonLabel>
                          </IonItem>

                          <IonItem className="h">
                            <IonThumbnail
                              className="m-0 text-center"
                              slot="start"
                            >
                              <IonIcon
                                className="iconic"
                                icon={earth}
                              ></IonIcon>
                            </IonThumbnail>
                            <IonLabel className="m-0">
                              {infoSchool.email}{" "}
                            </IonLabel>
                          </IonItem>
                        </IonList>
                      </IonList>
                      <IonCardHeader className="notifile2">
                        <IonCardSubtitle className="colordate">
                          <IonRow>
                            <IonCol className="text1" size="6">
                              January 20, 2015
                            </IonCol>
                          </IonRow>
                        </IonCardSubtitle>
                      </IonCardHeader>
                    </IonCardContent>
                  </IonCardSubtitle>
                </IonCardContent>
              </IonCard>
            </>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Home;
function fetchDataFromServer() {
  throw new Error("Function not implemented.");
}
