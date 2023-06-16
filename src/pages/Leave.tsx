import {
  IonButtons,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonCol,
  IonGrid,
  IonModal,
  createAnimation,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonTextarea,
  IonFabList,
  IonRow,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonChip,
  useIonAlert,
  IonToast,
  IonBackButton,
} from "@ionic/react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import { add } from "ionicons/icons";
import "./Leave.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment";
const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
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

  // const [student, setStudent] = useState([] as any[]);
  const [leave, setLeave] = useState([] as any[]);
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");

    var id = localStorage.getItem("id_student");
    var id_class_diagram = localStorage.getItem("id_class_diagram");
    const loginData = {
      token: x,
      id_student: id,
      id_class_diagram:id_class_diagram
    };
    api
      .post(`/furlough/` + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.content == null) {
            setShowToast(true);
            setLeave([]);
          } else {
          setLeave(res.data.content);
          }
        }
      })
      .catch((error) => {});
  }, []);

  const [date_start, setdate_start] = useState("");
  const [date_end, setdate_end] = useState("");
  const [reason, setreason] = useState("");
  const [presentAlert] = useIonAlert();

  function addLeave() {
    if (!date_start) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng chọn ngày bắt đầu",
        buttons: ["OK"],
      });
    } else if (!date_end) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng chọn ngày kết thúc",
        buttons: ["OK"],
      });
    } else if (!reason) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng nhập lý do xin nghỉ",
        buttons: ["OK"],
      });
    }
    else{
      var id = localStorage.getItem("id_student");
    var x = localStorage.getItem("token");
       var id_school = localStorage.getItem("id_school");
    var id_class_diagram = localStorage.getItem("id_class_diagram");
    const add_opinion = {
      date_start: date_start,
      date_end: date_end,
      reason: reason,
      token: x,
      id_student: id,
      id_school: id_school,
      id_class_diagram: id_class_diagram
    };

    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    api
      .post("/furlough-add/" + id, add_opinion)
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
          console.log(date_start);
          console.log(date_end);
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
  const [showToast, setShowToast] = useState(false);
  const [student, setStudent] = useState([] as any[]);
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");

    var id = localStorage.getItem("id_student");
    var id_class_diagram = localStorage.getItem("id_class_diagram");

    const loginData = {
      token: x,
      id_student: id,
      id_class_diagram:id_class_diagram
    };

    api
      .post(`/students/` + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setStudent(res.data.content);
        }
      })
      .catch((error) => {});
  }, []);

  return (
    <IonPage>
      <IonHeader className="text-1">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            {/* <IonBackButton></IonBackButton> */}
          </IonButtons>
          <IonTitle>Xin nghỉ phép</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="box_content m-3">
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
        <IonAccordionGroup className="bg-x">
          {leave.map((leave, key) => {
            if (key % 2 == 0) {
              return (
                <IonAccordion className="bg-t" value={`${leave.id}`}>
                  <IonItem className="clo-1" slot="header" color="red">
                    <IonLabel>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="1">{key + 1}</IonCol>
                          <IonCol>Ngày xin phép:</IonCol>
                          <IonCol>
                            {moment(leave.datecurrent).format("DD-MM-YYYY")}
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding p-0 pe-2" slot="content">
                    <ol id="accordion" className="rounded-list accordion">
                      <li>
                        <ol>
                          <li>
                            <p className="link">
                              <IonRow>
                                <IonCol className="clo-3">Số lượng</IonCol>
                                <IonCol size="9">
                                  {leave.numberday}
                                  {/* {Math.ceil((leave.date_end).getDate - (leave.date_start).getDate)} */}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow>
                                <IonCol className="clo-3">Bắt đầu</IonCol>
                                <IonCol size="9">
                                  {moment(leave.date_start).format(
                                    "DD-MM-YYYY"
                                  )}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow>
                                <IonCol className="clo-3">Kết thúc</IonCol>
                                <IonCol size="9">
                                  {moment(leave.date_end).format("DD-MM-YYYY")}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow>
                                <IonCol className="clo-3">Trạng thái</IonCol>
                                <IonCol size="9">{leave.statu}</IonCol>
                              </IonRow>
                            </p>
                          </li>

                          <li>
                            <p className="link">
                              <IonRow>
                                <IonCol className="clo-3">Nội dung</IonCol>
                                <IonCol size="9">{leave.reason}</IonCol>
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
                <IonAccordion className="bg-t" value={`${leave.id}`}>
                  <IonItem className="clo-2" slot="header" color="red">
                    <IonLabel>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="1">{key + 1}</IonCol>
                          <IonCol>Ngày xin phép:</IonCol>
                          <IonCol>
                            {moment(leave.datecurrent).format("DD-MM-YYYY")}
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding p-0 pe-2" slot="content">
                    <ol id="accordion" className="rounded-list accordion">
                      <li>
                        <ol>
                          <li>
                            <p className="link">
                              <IonRow>
                                <IonCol className="clo-3">Số lượng</IonCol>
                                <IonCol size="9">
                                  {leave.numberday}
                                  {/* {Math.ceil((leave.date_end).getDate - (leave.date_start).getDate)} */}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow>
                                <IonCol className="clo-3">Bắt đầu</IonCol>
                                <IonCol size="9">
                                  {moment(leave.date_start).format(
                                    "DD-MM-YYYY"
                                  )}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow>
                                <IonCol className="clo-3">Kết thúc</IonCol>
                                <IonCol size="9">
                                  {moment(leave.date_end).format("DD-MM-YYYY")}
                                </IonCol>
                              </IonRow>
                            </p>
                          </li>
                          <li>
                            <p className="link">
                              <IonRow>
                                <IonCol className="clo-3">Trạng thái</IonCol>
                                <IonCol size="9">{leave.statu}</IonCol>
                              </IonRow>
                            </p>
                          </li>

                          <li>
                            <p className="link">
                              <IonRow>
                                <IonCol className="clo-3">Nội dung</IonCol>
                                <IonCol size="9">{leave.reason}</IonCol>
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
          <IonFabButton id="open-modal">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonModal id="example-modal2" ref={modal} trigger="open-modal">
          <IonContent>
            <IonToolbar>
              <IonTitle>Thêm</IonTitle>
              <IonButtons slot="end">
                <IonButton color="light" onClick={() => dismiss()}>
                  X
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonList className="p-0">
              <div className="d-flex flex-row justify-content-center">
                <form className="w-xl-50 w-lg-75">
                  <div className="container mb-0 pt-0 mt-0">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Học sinh:</label>
                          <div className="input-field">
                            <div style={{ width: "100%" }}>
                              {student.map((student, key) => {
                                return (
                                  <h6 className="ms-2">
                                    {student.firstname} {student.lastname}
                                  </h6>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Ngày bắt đầu:</label>
                          <div className="input-field">
                            <span className="fa fa-envelope-o p-2"></span>
                            <input
                              type="date"
                              required
                              onChange={(e: any) =>
                                setdate_start(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Ngày kết thúc:</label>
                          <div className="input-field">
                            <span className="fa fa-envelope-o p-2"></span>
                            <input
                              type="date"
                              required
                              onChange={(e: any) => setdate_end(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Lý do:</label>
                          <div className="input-field bg-light">
                            <textarea
                              name="message"
                              id="msg"
                              className="form-control bg-light"
                              placeholder="Lý do"
                              onChange={(e: any) => setreason(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-center w-100">
                        <input
                          type="button"
                          value="Gửi"
                          className="btn"
                          onClick={addLeave}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Page;
