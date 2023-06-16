import { useParams } from "react-router";
import {
  IonCol,
  IonBackButton,
  IonButton,
  IonGrid,
  IonRow,
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
} from "@ionic/react";
import {} from "ionicons/icons";
import "./Profile_mom.css";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Page: React.FC = () => {
  const current = new Date();
  const [parent, setParent] = useState([] as any[]);
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var studentId = localStorage.getItem("id_student");
    const loginData = {
      token: x,
    };

    api
      .post("/students/" + studentId, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setParent(res.data.parent);
        }
      })
      .catch((error) => {});
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="box_content">
        <article className="bg-xl3 h-100 pb-1">
          <div className="before-bg-style">
            <div className="profile">
              <div className="avatar">
                {parent.map((parent, key) => {
                  return (
                    <img
                      className="avatar-img"
                      src={`${parent.avatar}`}
                      alt=""
                    />
                  );
                })}
              </div>

              <IonCardContent className="bg-3 ms-0 me-0 profile ps-2">
                <IonGrid className="pv2">
                  <IonRow className="pt-4">
                    <IonCol className="text-2">Quan hệ:</IonCol>
                    <IonCol className="text-1 pt-2" size="7">
                      {parent.map((parent, key) => {
                        return <b>{parent.type}</b>;
                      })}
                    </IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Họ và tên:</IonCol>
                    <IonCol className="text-1 pt-2" size="7">
                      {parent.map((parent, key) => {
                        return <b>{parent.name}</b>;
                      })}
                    </IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Ngày sinh:</IonCol>
                    <IonCol className="text-1 pt-2" size="7">
                      {parent.map((parent, key) => {
                        return <b>{parent.birthday}</b>;
                      })}
                    </IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Số điện thoại:</IonCol>
                    <IonCol className="text-1 pt-2" size="7">
                      {parent.map((parent, key) => {
                        return <b>{parent.phone_number}</b>;
                      })}
                    </IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Gmail:</IonCol>
                    <IonCol className="text-1 pt-2" size="7"></IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Nghề nghiệp:</IonCol>
                    <IonCol className="text-1 pt-2" size="7"></IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Tôn giáo:</IonCol>
                    <IonCol className="text-1 pt-2" size="7"></IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Nơi sinh:</IonCol>
                    <IonCol className="text-1 pt-2" size="7"></IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Quố tịch:</IonCol>
                    <IonCol className="text-1 pt-2" size="7"></IonCol>
                  </IonRow>
                  <IonRow className="pt-3">
                    <IonCol className="text-2">Địa chỉ:</IonCol>
                    <IonCol className="text-1 pt-2" size="7"></IonCol>
                  </IonRow>
                </IonGrid>
                <IonCardTitle className="fw-1 p-2"></IonCardTitle>
              </IonCardContent>
            </div>
          </div>
        </article>
      </IonContent>
    </IonPage>
  );
};

export default Page;
