import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
// import { useParams } from "react-router";
// import ExploreContainer from "../components/ExploreContainer";
import "./ScheduleDetail.css";
import { IonBackButton } from "@ionic/react";
import { IonIcon } from "@ionic/react";
// import { IonReactRouter } from "@ionic/react-router";
// import { Link, Redirect, Route } from "react-router-dom";
// import Menu from "../components/Menu";
import { cubeSharp } from "ionicons/icons";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
const { localStorage } = window;

const ScheduleDetail: React.FC = () => {
  const [schedulel_detail, setSchedulel_detail] = useState([] as any[]);
  const [schedulel_name, setSchedulel_name] = useState([] as any[]);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id = localStorage.getItem("id_schedule");
    var id_s = localStorage.getItem("id_student");
    var id_class_diagram = localStorage.getItem("id_class_diagram");
    // var idNo = localStorage.getItem("idNo");
    const loginData = {
      token: x,
      id_student: id_s,
      id_class_diagram: id_class_diagram
    };
    api
      .post(`/schedule_detail/` + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if(res.data.content==null){
            setShowToast(true);
            setSchedulel_detail([]);
          }
          else{
            setSchedulel_detail(res.data.content);
            setSchedulel_name(res.data.content.day);
          }
         
        }
      })
      .catch((error) => {});
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Chi tiết thời khóa biểu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="container">
      <IonToast
          isOpen={showToast}
          message="Không tìm thấy dữ liệu."
          duration={3000}
          onDidDismiss={() => setShowToast(false)}
          position="top"
          color="danger"
          cssClass="my-toast"
          buttons={[
            {
              text: 'Đóng',
              role: 'cancel',
              handler: () => {
                setShowToast(false);
              }
            }
          ]}
        />
        <div
          className="row d-flex justify-content-center px-2"
          style={{ marginTop: "10px" }}
        >
          <div className="col-md-6">
            <div className="main-card mb-3 card">
              <div className="card-body">
                <h2 className="card-title text-10 mt-1">Thời Khóa Biểu </h2>
                <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                  <div className="vertical-timeline-item vertical-timeline-element">
                    <div>
                      <span className="vertical-timeline-element-icon bounce-in">
                        <IonIcon
                          className="badge-dot-xl"
                          icon={cubeSharp}
                          size="large"
                          color="tertiary"
                        ></IonIcon>
                      </span>
                      {schedulel_detail.map((schedulel_detail, key) => {
                        if (
                          schedulel_detail.lesson == 1 
                        )
                          return (
                            <div className="vertical-timeline-element-content bounce-in">
                              <div
                                style={{
                                  marginLeft: "10px",
                                  padding: "10px",
                                  backgroundColor: "#FFCCCC",
                                  borderRadius: "10px",
                                  marginTop:"10px"
                                }}
                              >
                                <p>Môn học: {schedulel_detail.subject}</p>
                                <h4 className="timeline-title">
                                  Giáo viên :{" "}
                                  {schedulel_detail.firstname_teachers}{" "}
                                  {schedulel_detail.lastname_teachers}
                                </h4>
                              </div>
                              <div className="vertical-timeline-element-date">
                                <p>Tiết {schedulel_detail.lesson}</p>
                                6h30-7h20
                              </div>
                            </div>
                          );
                        else if (
                          schedulel_detail.lesson == 2 
                        )
                          return (
                            <div className="vertical-timeline-item mt-3 vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <IonIcon
                                    className="badge-dot-xl"
                                    icon={cubeSharp}
                                    size="large"
                                    color="tertiary"
                                  ></IonIcon>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      padding: "10px",
                                      backgroundColor: "#FFDAB9",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <p>Môn học: {schedulel_detail.subject}</p>
                                    <h4 className="timeline-title">
                                      Giáo viên : {schedulel_detail.firstname_teachers}{" "}
                                  {schedulel_detail.lastname_teachers}
                                    </h4>
                                  </div>
                                  <div className="vertical-timeline-element-date">
                                    <p>Tiết {schedulel_detail.lesson}</p>
                                    7h30-8h20
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        else if (
                          schedulel_detail.lesson == 3 
                        )
                          return (
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <IonIcon
                                    className="badge-dot-xl"
                                    icon={cubeSharp}
                                    size="large"
                                    color="tertiary"
                                  ></IonIcon>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      padding: "10px",
                                      backgroundColor: "#FFFFCC",
                                      borderRadius: "10px",
                                    }}
                                  >
                                   <p>Môn học: {schedulel_detail.subject}</p>
                                    <h4 className="timeline-title">
                                      Giáo viên : {schedulel_detail.firstname_teachers}{" "}
                                  {schedulel_detail.lastname_teachers}
                                    </h4>
                                  </div>
                                  <div className="vertical-timeline-element-date">
                                    <p>Tiết {schedulel_detail.lesson}</p>
                                    7h30-8h20
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                          else if (
                          schedulel_detail.lesson == 4
                        )
                          return (
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <IonIcon
                                    className="badge-dot-xl"
                                    icon={cubeSharp}
                                    size="large"
                                    color="tertiary"
                                  ></IonIcon>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      padding: "10px",
                                      backgroundColor: "#CCFFFF",
                                      borderRadius: "10px",
                                    }}
                                  >
                                   <p>Môn học: {schedulel_detail.subject}</p>
                                    <h4 className="timeline-title">
                                      Giáo viên : {schedulel_detail.firstname_teachers}{" "}
                                  {schedulel_detail.lastname_teachers}
                                    </h4>
                                  </div>
                                  <div className="vertical-timeline-element-date">
                                    <p>Tiết {schedulel_detail.lesson}</p>
                                    7h30-8h20
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                         if (
                          schedulel_detail.lesson == 5 
                        )
                          return (
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <IonIcon
                                    className="badge-dot-xl"
                                    icon={cubeSharp}
                                    size="large"
                                    color="tertiary"
                                  ></IonIcon>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      padding: "10px",
                                      backgroundColor: "rgb(184 182 255)",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <p>Môn học: {schedulel_detail.subject}</p>
                                    <h4 className="timeline-title">
                                      Giáo viên : {schedulel_detail.firstname_teachers}{" "}
                                  {schedulel_detail.lastname_teachers}
                                    </h4>
                                  </div>
                                  <div className="vertical-timeline-element-date">
                                    <p>Tiết {schedulel_detail.lesson}</p>
                                    7h30-8h20
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                       
                      })}
                    </div>
                  </div>
                  <div className="vertical-timeline-item vertical-timeline-element">
                    <div>
                      <span className="vertical-timeline-element-icon bounce-in">
                        <IonIcon
                          className="badge-dot-xl"
                          icon={cubeSharp}
                          size="large"
                          color="tertiary"
                        ></IonIcon>
                      </span>
                      <div className="vertical-timeline-element-content bounce-in">
                        <div
                          style={{
                            marginLeft: "10px",
                            padding: "10px",
                            // backgroundColor: "black",
                            borderRadius: "10px",
                          }}
                        >
                          {/* <p>Môn học: Tiếng Việt</p> */}
                          <h4 className="timeline-title">GIỜ NGHỈ TRƯA</h4>
                        </div>
                        <div className="vertical-timeline-element-date">
                          11h30-12h20
                        </div>
                      </div>
                    </div>
                  </div>
                  {schedulel_detail.map((schedulel_detail, key) => {
                        if (
                          schedulel_detail.lesson == 6 
                        )
                          return (
                            <div className="vertical-timeline-element-content bounce-in">
                              <div
                                style={{
                                  marginLeft: "10px",
                                  padding: "10px",
                                  backgroundColor: "#FFCCCC",
                                  borderRadius: "10px",
                                }}
                              >
                                <p>Môn học: {schedulel_detail.subject}</p>
                                <h4 className="timeline-title">
                                  Giáo viên :{" "}
                                  {schedulel_detail.firstname_teachers}{" "}
                                  {schedulel_detail.lastname_teachers}
                                </h4>
                              </div>
                              <div className="vertical-timeline-element-date">
                                <p>Tiết {schedulel_detail.lesson}</p>
                                6h30-7h20
                              </div>
                            </div>
                          );
                        else if (
                          schedulel_detail.lesson == 7 
                        )
                          return (
                            <div className="vertical-timeline-item mt-3 vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <IonIcon
                                    className="badge-dot-xl"
                                    icon={cubeSharp}
                                    size="large"
                                    color="tertiary"
                                  ></IonIcon>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      padding: "10px",
                                      backgroundColor: "#FFDAB9",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <p>Môn học: {schedulel_detail.subject}</p>
                                    <h4 className="timeline-title">
                                      Giáo viên : {schedulel_detail.firstname_teachers}{" "}
                                  {schedulel_detail.lastname_teachers}
                                    </h4>
                                  </div>
                                  <div className="vertical-timeline-element-date">
                                    <p>Tiết {schedulel_detail.lesson}</p>
                                    7h30-8h20
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        else if (
                          schedulel_detail.lesson == 8
                        )
                          return (
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <IonIcon
                                    className="badge-dot-xl"
                                    icon={cubeSharp}
                                    size="large"
                                    color="tertiary"
                                  ></IonIcon>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      padding: "10px",
                                      backgroundColor: "#FFFFCC",
                                      borderRadius: "10px",
                                    }}
                                  >
                                   <p>Môn học: {schedulel_detail.subject}</p>
                                    <h4 className="timeline-title">
                                      Giáo viên : {schedulel_detail.firstname_teachers}{" "}
                                  {schedulel_detail.lastname_teachers}
                                    </h4>
                                  </div>
                                  <div className="vertical-timeline-element-date">
                                    <p>Tiết {schedulel_detail.lesson}</p>
                                    7h30-8h20
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                          else if (
                          schedulel_detail.lesson == 9
                        )
                          return (
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <IonIcon
                                    className="badge-dot-xl"
                                    icon={cubeSharp}
                                    size="large"
                                    color="tertiary"
                                  ></IonIcon>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      padding: "10px",
                                      backgroundColor: "#CCFFFF",
                                      borderRadius: "10px",
                                    }}
                                  >
                                   <p>Môn học: {schedulel_detail.subject}</p>
                                    <h4 className="timeline-title">
                                      Giáo viên : {schedulel_detail.firstname_teachers}{" "}
                                  {schedulel_detail.lastname_teachers}
                                    </h4>
                                  </div>
                                  <div className="vertical-timeline-element-date">
                                    <p>Tiết {schedulel_detail.lesson}</p>
                                    7h30-8h20
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                         if (
                          schedulel_detail.lesson == 10
                        )
                          return (
                            <div className="vertical-timeline-item vertical-timeline-element">
                              <div>
                                <span className="vertical-timeline-element-icon bounce-in">
                                  <IonIcon
                                    className="badge-dot-xl"
                                    icon={cubeSharp}
                                    size="large"
                                    color="tertiary"
                                  ></IonIcon>
                                </span>
                                <div className="vertical-timeline-element-content bounce-in">
                                  <div
                                    style={{
                                      marginLeft: "10px",
                                      padding: "10px",
                                      backgroundColor: "rgb(184 182 255)",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <p>Môn học: {schedulel_detail.subject}</p>
                                    <h4 className="timeline-title">
                                      Giáo viên : {schedulel_detail.firstname_teachers}{" "}
                                  {schedulel_detail.lastname_teachers}
                                    </h4>
                                  </div>
                                  <div className="vertical-timeline-element-date">
                                    <p>Tiết {schedulel_detail.lesson}</p>
                                    7h30-8h20
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                          // if(schedulel_detail.lesson == 11 || schedulel_detail.lesson == 12 || schedulel_detail.lesson != 3 || schedulel_detail.lesson != 4 || schedulel_detail.lesson != 5 || schedulel_detail.lesson != 6 || schedulel_detail.lesson != 7 || schedulel_detail.lesson != 8 || schedulel_detail.lesson != 9 || schedulel_detail.lesson != 10 ){
                          //   return (
                          //     <div className="vertical-timeline-item vertical-timeline-element">
                          //       <div>
                          //         <span className="vertical-timeline-element-icon bounce-in">
                          //           <IonIcon
                          //             className="badge-dot-xl"
                          //             icon={cubeSharp}
                          //             size="large"
                          //             color="tertiary"
                          //           ></IonIcon>
                          //         </span>
                          //         <div className="vertical-timeline-element-content bounce-in">
                          //           <div
                          //             style={{
                          //               marginLeft: "10px",
                          //               padding: "10px",
                          //               backgroundColor: "rgb(184 182 255)",
                          //               borderRadius: "10px",
                          //             }}
                          //           >
                          //             <p>Môn học: {schedulel_detail.subject}</p>
                          //             <h4 className="timeline-title">
                          //               Giáo viên : {schedulel_detail.firstname_teachers}{" "}
                          //           {schedulel_detail.lastname_teachers}
                          //             </h4>
                          //           </div>
                          //           <div className="vertical-timeline-element-date">
                          //             <p>Tiết {schedulel_detail.lesson}</p>
                          //             7h30-8h20
                          //           </div>
                          //         </div>
                          //       </div>
                          //     </div>
                          //   );}
                       
                      })}
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </IonContent>
      {/* <FooterBar></FooterBar> */}
    </IonPage>
  );
};

export default ScheduleDetail;
