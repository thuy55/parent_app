import {
  createAnimation,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";

import { addOutline, alertCircleSharp, checkmarkDoneOutline, closeOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { IonChip, IonAvatar, IonLabel } from "@ionic/react";
import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonTextarea,
  IonRow,
  IonCol,
} from "@ionic/react";
import { IonModal, IonImg } from "@ionic/react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonButton,
} from "@ionic/react";
import React, { useState, useRef, useEffect } from "react";
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import axios from "axios";
import moment from "moment";

const NotificationsTeacher: React.FC = () => {
  const [notificationTeacher, setNotificationTeacher] = useState([] as any[]);
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
      id_student: id,
      id_school: id_school,
      id_class_diagram: id_class_diagram,
    };
    api
      .post(`/teacher_announcement/` + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.content == null) {
            setShowToast(true);
            setNotificationTeacher([]);
          } else {
            setNotificationTeacher(res.data.content);
          }
        }
      })
      .catch((error) => {});
  }, []);

  function handleItemClick(event2: any) {
    const itemId = event2.target.id;
    localStorage.removeItem("id_notificationTeacher");
    localStorage.setItem("id_notificationTeacher", itemId);
    console.log(itemId);

    // Lưu itemId vào state hoặc thực hiện các xử lý khác tùy vào nhu cầu của bạn
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start" style={{ color: "#f08c00" }}>
            {/* <IonMenuButton /> */}
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonTitle>Thông báo giáo viên</IonTitle>
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
              text: "Đóng",
              role: "cancel",
              handler: () => {
                setShowToast(false);
              },
            },
          ]}
        />
        {notificationTeacher.map((notificationTeacher, key) => {
          if (notificationTeacher.view == 0) {
            return (
              <IonCard>
                <Link to="/NotificationTeacherDeatail">
                  <IonItem
                    onClick={handleItemClick}
                    key={notificationTeacher.id}
                    id={notificationTeacher.id}
                    button
                    detail={true}
                    className="border border-3 rounded-3"
                    color={"light"}
                    style={{ backgroundColor: "primary", padding: "2px" }}
                  >
                    <IonAvatar
                      className="ms-2"
                      onClick={handleItemClick}
                      key={notificationTeacher.id}
                      id={notificationTeacher.id}
                    >
                      <img
                        alt="avatar"
                        src={`${notificationTeacher.avatar}`}
                        onClick={handleItemClick}
                        key={notificationTeacher.id}
                        id={notificationTeacher.id}
                      />
                    </IonAvatar>
                    <IonLabel style={{ marginLeft: "10px" }}>
                      <IonRow className="d-flex align-items-center w-100">
                        <IonCol>
                          <p>
                            {notificationTeacher.name_announcement}
                          </p>
                        </IonCol>
                        <IonCol className="text-end">
                          <IonIcon
                            icon={alertCircleSharp}
                            // size="large"
                            color="primary"
                            // style={{ marginBottom: 1, color: "#4169E1" }}
                          ></IonIcon>
                        </IonCol>
                      </IonRow>
                      <h2 className="ps-1">{notificationTeacher.content}</h2>

                      <IonChip className="w-100 mt-1" style={{ margin: 0 }}>
                        <IonAvatar>
                          <img
                            alt="Silhouette of a person's head"
                            src="https://png.pngtree.com/png-vector/20191103/ourlarge/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"
                          />
                        </IonAvatar>
                        <IonRow className="d-flex align-items-center w-100">
                          <IonCol>
                            <p className="text-black">
                              GV: {notificationTeacher.first_teacher}{" "}
                              {notificationTeacher.last_teacher}
                            </p>
                          </IonCol>
                          <IonCol className="text-end">
                            <h6 className="text-secondary">
                              {moment(notificationTeacher.birthday).format(
                                "DD-MM-YYYY"
                              )}
                            </h6>
                          </IonCol>
                        </IonRow>
                      </IonChip>
                    </IonLabel>
                  </IonItem>
                </Link>
              </IonCard>
            );
          } else {
            return (
              <IonCard>
                <Link to="/NotificationTeacherDeatail">
                  <IonItem
                    onClick={handleItemClick}
                    key={notificationTeacher.id}
                    id={notificationTeacher.id}
                    button
                    detail={true}
                  >
                    <IonAvatar
                      className="ms-2"
                      onClick={handleItemClick}
                      key={notificationTeacher.id}
                      id={notificationTeacher.id}
                    >
                      <img
                        alt="avatar"
                        src={`${notificationTeacher.avatar}`}
                        onClick={handleItemClick}
                        key={notificationTeacher.id}
                        id={notificationTeacher.id}
                      />
                    </IonAvatar>
                    <IonLabel className="ps-3">
                      <p>{notificationTeacher.name_announcement}</p>
                      <h2>{notificationTeacher.content}</h2>

                      <IonChip className="w-100 mt-1" style={{ margin: 0 }}>
                        <IonAvatar>
                          <img
                            alt="Silhouette of a person's head"
                            src="https://png.pngtree.com/png-vector/20191103/ourlarge/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"
                          />
                        </IonAvatar>
                        <IonRow className="d-flex align-items-center w-100">
                          <IonCol>
                            <p className="text-black">
                              GV: {notificationTeacher.first_teacher}{" "}
                              {notificationTeacher.last_teacher}
                            </p>
                          </IonCol>
                          <IonCol className="text-end">
                            <h6 className="text-secondary">
                              {moment(notificationTeacher.birthday).format(
                                "DD-MM-YYYY"
                              )}
                            </h6>
                          </IonCol>
                        </IonRow>
                      </IonChip>
                    </IonLabel>
                  </IonItem>
                </Link>
              </IonCard>
            );
          }
        })}
      </IonContent>
    </IonPage>
  );
};

export default NotificationsTeacher;
