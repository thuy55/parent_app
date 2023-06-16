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
  IonFab,
  IonFabList,
  IonFabButton,
  IonIcon,
  IonButton,
  IonModal,
  IonLabel,
  IonInput,
  IonTextarea,
  IonCol,
  useIonAlert,
  IonSelect,
  IonSelectOption,
  IonAccordion,
  IonAccordionGroup,
  IonAvatar,
} from "@ionic/react";
import React, { useRef } from "react";
import "./Opinion.css";
import axios from "axios";

import {
  IonItem,
  IonGrid,
  IonRow,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonSearchbar,
  createAnimation,
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import {
  addOutline,
  chevronUpCircle,
  closeOutline,
  duplicateOutline,
  trashOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import moment from "moment";

const Opinion: React.FC = () => {
  const [student, setStudent] = useState([] as any[]);
  const [studentList, setStudentList] = useState([] as any[]);
  const [route, setRoute] = useState([] as any[]);
  const history = useHistory();
  const [semester, setSemester] = useState([] as any[]);

  const [presentAlert] = useIonAlert();

  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  const enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector("ion-backdrop")!)
      .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

    const wrapperAnimation = createAnimation()
      .addElement(root?.querySelector(".modal-wrapper")!)
      .keyframes([
        { offset: 0, opacity: "0", transform: "scale(0)" },
        { offset: 1, opacity: "0.99", transform: "scale(1)" },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing("ease-out")
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: HTMLElement) => {
    return enterAnimation(baseEl).direction("reverse");
  };
  //Danh sách đã đăng kí
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");

    var id = localStorage.getItem("id_school");

    const loginData = {
      token: x,
      id_school: id,
    };

    api
      .post(`/students-register_car`, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.content == null) {
            setShowToast(true);
            setStudentList([]);
          } else {
            setStudentList(res.data.content);
            // setSemester(res.data.semester.name);
          }
        }
      })
      .catch((error) => {});
  }, []);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");

    var id = localStorage.getItem("id_school");

    const loginData = {
      token: x,
      id_school: id,
    };

    api
      .post(`/students-list-register_car`, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.content == null) {
            setShowToast(true);
            setStudent([]);
          } else {
            setStudent(res.data.content);
            setSemester(res.data.semester);
          }
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id = localStorage.getItem("id_school");
    const loginData = {
      token: x,
      id_school: id,
    };
    api
      .post(`/register_semester_route`, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.route == null) {
            setShowToast(true);
            setRoute([]);
          } else {
            setRoute(res.data.route);
          }
        }
      })
      .catch((error) => {});
  }, []);

  function clickRoute(e: any) {
    localStorage.removeItem("id_route");
    localStorage.setItem("id_route", e);
  }
  function clickStudent(e: any) {
    localStorage.removeItem("id_arrange_class");
    localStorage.setItem("id_arrange_class", e);
  }

  function addCar() {
    var id_route = localStorage.getItem("id_route");
    var id_arrange_class = localStorage.getItem("id_arrange_class");
    if (!id_route) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng chọn tuyến đường",
        buttons: ["OK"],
      });
    } else if (!id_arrange_class) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng chọn học sinh",
        buttons: ["OK"],
      });
    }else{
      var id = localStorage.getItem("id_school");
    var x = localStorage.getItem("token");
    const add_opinion = {
      id_route: id_route,
      token: x,
      id_school: id,
    };

    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    api
      .post("/add_student_register_car/" + id_arrange_class, add_opinion)
      .then((res) => {
        if (res.data.status == "error") {
          dismiss();
          presentAlert({
            header: "Lỗi",
            message: res.data.content,
            buttons: ["OK"],
          });
        } else if (res.data.status == "success") {
          console.log(res.data.content);
          dismiss();

          window.location.reload();
        }
      })
      .catch((error) => {
        dismiss();
        presentAlert({
          header: "Lỗi",
          message: "không thể kết nối đến máy chủ",
          buttons: ["OK"],
        });
      });
    }
    
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Đăng ký đưa đón</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="container">
        <IonAccordionGroup className="mt-3 mx-2">
          {studentList.map((studentList, key) => {
            if (studentList.statu == "D") {
              return (
                <IonAccordion key={key} className="mt-3 acc p-1">
                  <IonItem slot="header" color="red" className="item-Cash ">
                    <div className="item-count bg-color-green col-2">
                      <img alt="Avatar" src="./assets/img/bus.png" />
                    </div>
                    <IonLabel className="fw-bold my-3">
                      Học sinh: {studentList.firstname} {studentList.lastname}
                      <p className="mt-2 text-secondary">
                        Học kì: {studentList.semester} ({studentList.course})
                      </p>
                    </IonLabel>
                  </IonItem>
                  <div
                    className="ion-padding p-0 pe-2"
                    slot="content"
                    style={{ marginTop: "13px" }}
                  >
                    <ol id="accordion" className="rounded-list accordion">
                      <li>
                        <ol>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Họ và tên :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8">
                                  {studentList.firstname} {studentList.lastname}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Học kì :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8">{studentList.semester}</IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Khóa học :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8">{studentList.course}</IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Tuyến :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8">{studentList.route}</IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Trạng thái :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8">Đã duyệt</IonCol>
                              </IonRow>
                            </p>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>
                </IonAccordion>
              );
            } else {
              return (
                <IonAccordion key={key} className="mt-3 acc p-1">
                  <IonItem slot="header" color="red" className="item-Cash ">
                    <div className="item-count bg-color-green col-2">
                      <img alt="Avatar" src="./assets/img/bus.png" />
                    </div>
                    <IonLabel className="fw-bold my-3">
                      Học sinh: {studentList.firstname} {studentList.lastname}
                      <p className="mt-2 text-secondary">
                        Học kì: {studentList.semester} ({studentList.course})
                      </p>
                    </IonLabel>
                  </IonItem>
                  <div
                    className="ion-padding p-0 pe-2"
                    slot="content"
                    style={{ marginTop: "13px" }}
                  >
                    <ol id="accordion" className="rounded-list accordion">
                      <li>
                        <ol>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Họ và tên :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8">
                                  {studentList.firstname} {studentList.lastname}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Học kì :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8">{studentList.semester}</IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Khóa học :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8">{studentList.course}</IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Tuyến :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8">{studentList.route}</IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Trạng thái :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8">Chưa duyệt</IonCol>
                              </IonRow>
                            </p>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>
                </IonAccordion>
              );
            }
          })}
        </IonAccordionGroup>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton id="open-modal-registerMove">
            <IonIcon color="white" icon={addOutline}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonModal
          id="example-modal"
          ref={modal}
          trigger="open-modal-registerMove"
          enterAnimation={enterAnimation}
          leaveAnimation={leaveAnimation}
          style={{ alignItems: "start", marginTop: "20px", height: "50%" }}
        >
          <IonContent>
            <IonToolbar>
              <IonTitle
                color={"white"}
                style={{ textAlign: "center", fontStyle: "bold" }}
              >
                ĐĂNG KÝ ĐƯA ĐÓN
              </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>
                  <IonIcon color={"white"} icon={closeOutline}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonCard color={"light"}>
              <IonCardContent style={{ height: "100%" }}>
                <IonLabel position="floating" className="fs-4">
                  Học sinh:
                </IonLabel>
                <IonItem fill="outline" className="mt-2 mb-2">
                  <IonSelect
                    className=" w-100 me-0 justify-content-center d-flex px-2"
                    // color="primary"
                    slot="start"
                    interface="popover"
                    placeholder="Chọn học sinh"
                    style={{ height: "40px" }}
                    onIonChange={(e: any) => clickStudent(e.target.value)}
                  >
                    {student.map((student, key) => {
                      return (
                        <IonSelectOption
                          // id={student.id_arrange_class}
                          key={key}
                          value={student.id_arrange_class}
                        >
                          {student.firstname} {student.lastname}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>

                <IonLabel position="floating" className="fs-4">
                  Tuyến đường:
                </IonLabel>
                <IonItem fill="outline" className="mt-2 mb-2">
                  <IonSelect
                    className=" w-100 me-0 justify-content-center d-flex px-2"
                    // color="primary"
                    slot="start"
                    interface="popover"
                    placeholder="Chọn tuyến đường"
                    style={{ height: "40px" }}
                    onIonChange={(e: any) => clickRoute(e.target.value)}
                  >
                    {route.map((route, key) => {
                      return (
                        <IonSelectOption
                          // id={route.id}
                          key={key}
                          value={route.id}
                        >
                          {route.name}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
                <IonRow
                  class="row-btn"
                  style={{ textAlign: "center", marginTop: "20px" }}
                >
                  <IonCol>
                    <IonButton
                      color="success"
                      onClick={addCar}
                      style={{ width: "110px" }}
                    >
                      ĐĂNG KÝ
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      onClick={() => dismiss()}
                      color="danger"
                      style={{ width: "110px" }}
                    >
                      HỦY
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>
      </IonContent>
      {/* <FooterBar></FooterBar> */}
    </IonPage>
  );
};

export default Opinion;
