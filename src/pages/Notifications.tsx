import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonItem } from "@ionic/react";
import { alertCircleSharp, checkmarkDoneOutline } from "ionicons/icons";
import { Link } from "react-router-dom";
import { IonChip, IonAvatar, IonLabel, IonIcon } from "@ionic/react";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
const { localStorage } = window;
// import TabApp from "./TabApp";
const Notifications: React.FC = () => {
  const [notificationSchool, setNotificationSchool] = useState([] as any[]);

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
      id_class_diagram: id_class_diagram,
    };
    api
      .post(`/school_announcement/` + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setNotificationSchool(res.data.content);
        }
      })
      .catch((error) => {});
  }, []);
  function handleItemClick(event: any) {
    const itemId = event.target.id;
    localStorage.removeItem("id_notification");
    localStorage.setItem("id_notification", itemId);

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
          {/* <IonButtons slot="end">
            <IonIcon
              icon={checkmarkDoneOutline}
              size="large"
              style={{ color: "#f08c00" }}
            ></IonIcon>
          </IonButtons> */}
          <IonTitle>Thông báo trường</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="container m-4">
        <div className="mx-1">
          {notificationSchool.map((notificationSchool, key) => {
            if (notificationSchool.view == 0) {
              return (
                <Link to="/NotificationDetail">
                  <IonItem
                    onClick={handleItemClick}
                    key={notificationSchool.id}
                    id={notificationSchool.id}
                    button
                    detail={true}
                    color={"light"}
                    style={{ backgroundColor: "primary", padding: "2px" }}
                    className="border border-3 rounded-3 mt-1 "
                  >
                    <IonAvatar
                      onClick={handleItemClick}
                      key={notificationSchool.id}
                      id={notificationSchool.id}
                    >
                      <img
                        onClick={handleItemClick}
                        key={notificationSchool.id}
                        id={notificationSchool.id}
                        alt="Silhouette of a person's head"
                        src="https://png.pngtree.com/png-vector/20191103/ourlarge/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"
                      />
                    </IonAvatar>
                    <IonLabel style={{ marginLeft: "10px" }}>
                      <IonRow className="d-flex align-items-center w-100">
                        <IonCol size="10">
                          <IonLabel>
                            <h2>{notificationSchool.name}</h2>
                          </IonLabel>
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
                      <p className="ms-2">{notificationSchool.content}</p>
                      <IonChip style={{ margin: 0 }}>
                        <IonAvatar>
                          <img
                            alt="Silhouette of a person's head"
                            src="https://png.pngtree.com/png-vector/20191103/ourlarge/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"
                          />
                        </IonAvatar>
                        <IonLabel className="d-flex">
                          {notificationSchool.description},{" "}
                          <b className="text-danger  m-0">
                            {notificationSchool.date}
                          </b>
                        </IonLabel>
                      </IonChip>
                    </IonLabel>
                  </IonItem>
                </Link>
              );
            } else {
              return (
                <Link to="/NotificationDetail">
                  <IonItem
                    onClick={handleItemClick}
                    key={notificationSchool.id}
                    id={notificationSchool.id}
                    button
                    detail={true}
                    className="border border-3 rounded-3 mt-1"
                  >
                    <IonAvatar
                      onClick={handleItemClick}
                      key={notificationSchool.id}
                      id={notificationSchool.id}
                    >
                      <img
                        onClick={handleItemClick}
                        key={notificationSchool.id}
                        id={notificationSchool.id}
                        alt="Silhouette of a person's head"
                        src="https://png.pngtree.com/png-vector/20191103/ourlarge/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"
                      />
                    </IonAvatar>
                    <IonLabel style={{ marginLeft: "10px" }}>
                      <h2>{notificationSchool.name} </h2>
                      <p>{notificationSchool.content}</p>
                      <IonChip style={{ margin: 0 }}>
                        <IonAvatar>
                          <img
                            alt="Silhouette of a person's head"
                            src="https://png.pngtree.com/png-vector/20191103/ourlarge/pngtree-handsome-young-guy-avatar-cartoon-style-png-image_1947775.jpg"
                          />
                        </IonAvatar>
                        <IonLabel className="d-flex">
                          {notificationSchool.description},{" "}
                          <b className="text-danger  m-0">
                            {notificationSchool.date}
                          </b>
                        </IonLabel>
                      </IonChip>
                    </IonLabel>
                  </IonItem>
                </Link>
              );
            }
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
