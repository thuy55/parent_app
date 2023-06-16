import { useParams } from "react-router";
import {
  IonCol,
  IonAvatar,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonButton,
  IonGrid,
  IonRow,
  IonIcon,
  IonCard,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  useIonAlert,
  useIonLoading,
  IonAccordionGroup,
  IonAccordion,
  IonImg,
  IonBackButton,
} from "@ionic/react";
import { timer, home } from "ionicons/icons";
import React from "react";
import axios from "axios";
// import { setUserSession } from "./Common";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import moment from "moment";
const Page: React.FC = () => {
  const current = new Date();
  const [ward, setWard] = useState([] as any[]);
  const [province, setProvince] = useState([] as any[]);
  const [district, setDistrict] = useState([] as any[]);
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const { localStorage } = window;

  const [student, setStudent] = useState([] as any[]);

  const [parent, setParent] = useState([] as any[]);

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
      .post("/students-parent/" + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setStudent(res.data.students);
          setParent(res.data.parents.name);
          // setWard(res.data.ward);
          // setProvince(res.data.province);
          // setDistrict(res.data.district);
          // setSchool(res.data.school);
          // setPriority_object(res.data.priority_object);
          // setReligion(res.data.religion);
          // setEthnic(res.data.ethnic);
          // setNationality(res.data.nationality);
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
          <IonTitle>Hồ sơ học sinh</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="box_content">
        <article className="bg-xl pb-1">
          <IonAccordionGroup className="mt-4 mx-2">
            {student.map((student, key) => {
              return (
                <IonAccordion key={key} className="mt-3 acc">
                  <IonItem slot="header" color="red" className="item-teacher-1">
                    <IonAvatar slot="start">
                      <img alt="Avatar" src={`${student.avatar}`} />
                    </IonAvatar>
                    <IonLabel className="fw-bold py-2">
                      {student.firstname} {student.lastname}
                      <p className="mt-2 text-secondary">
                        Mã học sinh : {student.student}
                      </p>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding p-0 pe-2" slot="content">
                    <p
                      className="link text-center mt-2"
                      style={{ background: "#e3edf5" }}
                    >
                      <img
                        style={{ height: "180px" }}
                        className="w-50 rounded-circle"
                        alt="Avatar"
                        src={`${student.avatar}`}
                      />
                    </p>
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
                                <IonCol size="8" className="nd">
                                  {student.firstname} {student.lastname}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Mã học sinh :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.student}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Giới tính :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.gender}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Ngày sinh :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {moment(student.birthday).format(
                                    "DD-MM-YYYY"
                                  )}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Địa chỉ :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.address} {student.ward}{" "}
                                  {student.district} {student.province}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Sở thích :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.hobby}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Dị ứng :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.allergy}
                                </IonCol>
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
                                <IonCol size="8" className="nd">
                                  {student.course}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Trường :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.school}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Đối tượng :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.priority_object}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    BHYT :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.health_insurance_id}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    BHTT :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.body_insurance_id}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Dân tộc :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.ethnic}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Tôn giáo :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.religion}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow className="row text-align-center">
                                <IonCol>
                                  <IonLabel className="lable-name">
                                    Quốc tịch :
                                  </IonLabel>
                                </IonCol>
                                <IonCol size="8" className="nd">
                                  {student.nationality}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </div>
                </IonAccordion>
                // <div className=" before-bg-style pb-4 ">
                //   <div className="profile">
                //     <div className="avatar">
                //       <img
                //         className="avatar-img"
                //         src={`${student.avatar}`}
                //         alt=""
                //       />
                //     </div>

                //     <IonCardContent className="bg-3 ms-0 me-0 profile ps-2">
                //       <IonGrid className="pv">
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Mã học sinh:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             {student.student}
                //           </IonCol>
                //         </IonRow>
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Họ và tên:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             {student.firstname} {student.lastname}
                //           </IonCol>
                //         </IonRow>
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2"> Giới tính:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             {student.gender}
                //           </IonCol>
                //         </IonRow>
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Ngày sinh:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             {moment(student.birthday).format("DD-MM-YYYY")}
                //           </IonCol>
                //         </IonRow>
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2"> Địa chỉ:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             <b>
                //               {student.address} {student.ward} {student.district}{" "}
                //               {student.province}
                //             </b>
                //           </IonCol>
                //         </IonRow>
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Khóa học:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             <b>{student.course}</b>
                //           </IonCol>
                //         </IonRow>
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Trường:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             <b>{student.school}</b>
                //           </IonCol>
                //         </IonRow>

                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Đối tượng:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             <b>{student.priority_object}</b>
                //           </IonCol>

                //         </IonRow>
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Bảo hiểm y tế:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             {student.health_insurance_id}
                //           </IonCol>
                //         </IonRow>
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Bảo hiểm tai nạn:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             {student.body_insurance_id}
                //           </IonCol>
                //         </IonRow>
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Dân tộc:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             <b>{student.ethnic}</b>
                //           </IonCol>
                //         </IonRow>
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Tôn giáo:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             {student.religion}
                //           </IonCol>
                //         </IonRow>
                //         {/* <IonRow className="pt-3">
                //     <IonCol className="text-2">Nơi sinh:</IonCol>
                //     {student.map((student, key) => {
                //       return <IonCol className="text-1 pt-2" size="7">{student.id_student}</IonCol>;
                //     })}
                //   </IonRow> */}
                //         <IonRow className="pt-3">
                //           <IonCol className="text-2">Quốc tịch:</IonCol>
                //           <IonCol className="text-1 pt-2" size="7">
                //             <b> {student.nationality}</b>
                //           </IonCol>
                //         </IonRow>
                //       </IonGrid>
                //       <IonCardTitle className="fw-1 p-2"></IonCardTitle>
                //     </IonCardContent>
                //   </div>
                // </div>
              );
            })}
          </IonAccordionGroup>
          <IonCard className="card-profile">
            <IonCardHeader>
              <IonCardTitle className="fw-1">QUAN HỆ GIA ĐÌNH</IonCardTitle>
            </IonCardHeader>
            <IonCardHeader className="bg-2  p-1 ps-0 pt-3">
              <section className="page-section ps-4 pe-4 pb-0 pt-0">
                <ul className="linetime">
                  <li>
                    <div className="linetime-img rounded-circle">
                      <img
                        src="https://anhnendep.net/wp-content/uploads/2016/04/hinh-avata-chibi-de-thuong-cute-10.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="linetime-panel">
                      <div className="linetime-panel-heading">
                        <h4 className="size-18">Thông tin phụ huynh</h4>
                      </div>
                      <div className="linetime-panel-subheading">
                        <h3 className="size-18 text-primary fw-bold">
                          <b>{parent}</b>
                        </h3>
                      </div>
                      <div className="linetime-panel-content">
                        <Link
                          to="/Profile_mom"
                          className="list-group-item  p-0 list-group-item-action"
                        >
                          <IonButton
                            className="w-bt"
                            color="tertiary"
                            expand="block"
                          >
                            Xem thêm...
                          </IonButton>
                        </Link>
                      </div>
                    </div>
                  </li>
                  {/* <li>
                    <div className="linetime-img rounded-circle">
                      <img
                        src="https://anhnendep.net/wp-content/uploads/2016/04/hinh-avata-chibi-de-thuong-cute-10.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="linetime-panel inverted">
                      <div className="linetime-panel-heading">
                        <h4 className="size-18">Thông tin cha</h4>
                      </div>
                      <div className="linetime-panel-subheading">
                        <h3 className="size-18 text-primary fw-bold">
                          Nguyễn Văn Anh
                        </h3>
                      </div>
                      <div className="linetime-panel-content">
                        <Link
                          to="/Profile_dad"
                          className="list-group-item  p-0 list-group-item-action"
                        >
                          <IonButton
                            className="w-bt bg-bt"
                            color="warning"
                            expand="block"
                          >
                            Xem thêm...
                          </IonButton>
                        </Link>
                      </div>
                    </div>
                  </li> */}
                </ul>
              </section>
            </IonCardHeader>
          </IonCard>
        </article>
      </IonContent>
    </IonPage>
  );
};

export default Page;
