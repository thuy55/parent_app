import {
  IonButtons,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonAvatar,
  IonImg,
  IonToast,
  IonBackButton,
} from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

// import { useParams } from "react-router";
// import ExploreContainer from "../components/ExploreContainer";
import "./teacher.css";

const Teacher: React.FC = () => {
  const [teachers, setTeachers] = useState([] as any[]);
  const [teacherAssign, setTeacherAssign] = useState([] as any[]);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id_school = localStorage.getItem("id_school");
    var id = localStorage.getItem("id_student");
    var id_class_diagram = localStorage.getItem("id_class_diagram");
    const loginData = {
      token: x,
      id_school: id_school,
      id_student: id,
      id_class_diagram:id_class_diagram
    };
    api
      .post(`/teacher-class/` + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.homeroom_teacher == null) {
            setShowToast(true);
            setTeachers([]);
          } else if (res.data.assigning_teacher == null) {
            setShowToast(true);
            setTeacherAssign([]);
          } else {
            setTeachers(res.data.homeroom_teacher);
            setTeacherAssign(res.data.assigning_teacher);
          }
        }
      })
      .catch((error) => {});
  }, []);

  // useEffect(() => {
  //   const api = axios.create({
  //     baseURL: "https://school.hewo.vn/api",
  //   });
  //   var x = localStorage.getItem("token");

  //   var id = localStorage.getItem("id_student");
  //   const loginData = {
  //     token: x,
  //     id_student: id,
  //   };
  //   api
  //     .post(`/teacher-class/` + id, loginData)
  //     .then((res) => {
  //       if (res.data.status == "success") {
  //         if (res.data.assigning_teacher == null) {
  //           setShowToast(true);
  //           setTeacherAssign([]);
  //         } else {
  //         setTeacherAssign(res.data.assigning_teacher);
  //         }
  //       }
  //     })
  //     .catch((error) => {});
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Danh sách giáo viên </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="box_content">
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
              text: "Đóng",
              role: "cancel",
              handler: () => {
                setShowToast(false);
              },
            },
          ]}
        />
        <IonAccordionGroup className="mt-3 mx-2">
          <IonLabel className="p-3 mb-3 fw-bold">
            GIÁO VIÊN CHỦ NHIỆM :
          </IonLabel>
          {teachers.map((teacher, key) => {
            return (
              <IonAccordion value={`${teacher.id}`} className="mt-3 acc">
                <IonItem slot="header" color="red" className="item-teacher-1">
                  <IonAvatar slot="start">
                    <img alt="Avatar" src={`${teacher.avatar}`} />
                    <IonImg>{teacher.avatar}</IonImg>
                  </IonAvatar>
                  <IonLabel className="fw-bold">
                    {teacher.firstname} {teacher.lastname}
                    <p className="mt-2 text-secondary">
                      Môn dạy : {teacher.subject}
                    </p>
                  </IonLabel>
                </IonItem>
                <div
                  className="ion-padding p-0 pe-2"
                  slot="content"
                  style={{ marginTop: "13px" }}
                >
                  <p
                    className="link text-center mt-2"
                    style={{ background: "#e3edf5" }}
                  >
                    <img
                      style={{ height: "180px" }}
                      className="w-50 rounded-circle"
                      alt="Avatar"
                      src={`${teacher.avatar}`}
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
                                {teacher.firstname} {teacher.lastname}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  Môn dạy :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {teacher.subject}
                              </IonCol>
                            </IonRow>{" "}
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  Học hàm :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {teacher.academic_function}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  Điện thoại :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {teacher.phone_number}
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
                                {teacher.gender}
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
                                {moment(teacher.birthday).format("DD-MM-YYYY")}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  Email :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {teacher.email}
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
                                {teacher.address} {teacher.ward},{" "}
                                {teacher.district}, {teacher.province}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </IonAccordion>
            );
          })}
        </IonAccordionGroup>

        <IonAccordionGroup className="mt-4 mx-2">
          <IonLabel className="p-3 mb-2 fw-bold">GIÁO VIÊN BỘ MÔN :</IonLabel>
          {teacherAssign.map((teacherAssign, key) => {
            return (
              <IonAccordion key={key} className="mt-3 acc">
                <IonItem slot="header" color="red" className="item-teacher-1">
                  <IonAvatar slot="start">
                    <img alt="Avatar" src={`${teacherAssign.avatar}`} />
                    <IonImg>{teacherAssign.avatar}</IonImg>
                  </IonAvatar>
                  <IonLabel className="fw-bold">
                    {teacherAssign.firstname} {teacherAssign.lastname}
                    <p className="mt-2 text-secondary">
                      Môn dạy : {teacherAssign.subject}
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
                      src={`${teacherAssign.avatar}`}
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
                                {teacherAssign.firstname}{" "}
                                {teacherAssign.lastname}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  Môn dạy :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {teacherAssign.subject}
                              </IonCol>
                            </IonRow>{" "}
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  Học hàm :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {teacherAssign.academic_function}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  Điện thoại :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {teacherAssign.phone_number}
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
                                {teacherAssign.gender}
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
                                {moment(teacherAssign.birthday).format(
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
                                  Email :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {teacherAssign.email}
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
                                {teacherAssign.address} {teacherAssign.ward},{" "}
                                {teacherAssign.district},{" "}
                                {teacherAssign.province}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                      </ol>
                    </li>
                  </ol>
                </div>
              </IonAccordion>
            );
          })}
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Teacher;
