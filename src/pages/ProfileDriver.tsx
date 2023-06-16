// import { useParams } from "react-router";
import {
  IonCol,
  IonGrid,
  IonRow,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  createAnimation,
  IonTitle,
  IonContent,
  IonLabel,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonFooter,
  IonTabsContext,
  IonTabButton,
  IonIcon,
  IonCardContent,
  IonCardTitle,
  IonBackButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { home, library, playCircle, radio, search } from "ionicons/icons";
import "./Account.css";

// import { removeUserSession } from "./Common";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
const { localStorage } = window;

const ProfileDriver: React.FC = () => {
  const [profileDriver, setProfileDriver] = useState([] as any[]);
  const [ward, setWard] = useState([] as any[]);
  const [district, setDistrict] = useState([] as any[]);
  const [province, setProvince] = useState([] as any[]);
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id = localStorage.getItem("id_driver");
    const loginData = {
      token: x,
      id_driver: id,
    };
    api
      .post(`/car_driver/` + id, loginData)
      .then((res) => {
        const w= res.data.ward;
        setWard(w);
        const d= res.data.district;
        setDistrict(d);
        const p= res.data.province;
        setProvince(p);
        if (res.data.status == "success") {
          setProfileDriver(res.data.driver);
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
          <IonTitle>Thông tin tài xế</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="box_content">
        <article className="bg-xl pb-2">
          <div className=" before-bg-style">
            {profileDriver.map((driver) => {
              return (
                <div className="profile">
                  <div className="avatar">
                    <img
                      className="avatar-img"
                      src="https://toquoc.mediacdn.vn/2019/9/5/001a3513-15676514560451166952689.jpg"
                      alt=""
                    />
                  </div>

                  <IonCardContent className="bg-3 ms-0 me-0 profile ps-2">
                    <IonGrid className="pv mt-4">
                      <IonRow className="align-items-center my-2">
                        <IonCol>Tên tài xế:</IonCol>
                        <IonCol className="text-1" size="7">
                          <IonInput readonly>{driver.name}</IonInput>
                        </IonCol>
                      </IonRow>
                      <IonRow className="align-items-center my-2">
                        <IonCol>Số điện thoại:</IonCol>
                        <IonCol className="text-1" size="7">
                          <IonInput readonly={true}>
                            {driver.phone_number}
                          </IonInput>
                        </IonCol>
                      </IonRow>

                      <IonRow className="align-items-center my-2">
                        <IonCol>Ngày sinh:</IonCol>
                        <IonCol className="text-1" size="7">
                          <IonInput>
                            {" "}
                            {moment(driver.birthday).format("DD-MM-YYYY")}
                          </IonInput>
                        </IonCol>
                      </IonRow>

                      <IonRow className="align-items-center my-2">
                        <IonCol>Giới tính :</IonCol>
                        <IonCol className="text-1" size="7">
                          <IonInput>{driver.gender}</IonInput>
                        </IonCol>
                      </IonRow>
                      <IonRow className="align-items-center my-2">
                        <IonCol>Bằng lái:</IonCol>
                        <IonCol className="text-1" size="7">
                          <IonInput>{driver.driver_license_id}</IonInput>
                        </IonCol>
                      </IonRow>

                      <IonRow className="align-items-center my-2">
                        <IonCol>CMND/CCCD :</IonCol>
                        <IonCol className="text-1" size="7">
                          <IonInput >{driver.citizenId}</IonInput>
                        </IonCol>
                      </IonRow>

                      {/* <IonRow className="align-items-center my-2">
                        <IonCol>Quốc tịch :</IonCol>
                        <IonCol className="text-1" size="7">
                          <IonInput value="Việt Nam"></IonInput>
                        </IonCol>
                      </IonRow> */}

                      <IonRow className="align-items-center my-2">
                        <IonCol>Ngày bắt đầu:</IonCol>
                        <IonCol className="text-1" size="7">
                          <IonInput readonly>
                            {moment(driver.date_start_work).format(
                              "DD-MM-YYYY"
                            )}
                          </IonInput>
                        </IonCol>
                      </IonRow>
                      

                      <IonRow className="align-items-center my-2">
                        <IonCol>Địa chỉ:</IonCol>
                        <IonCol className="text-1" size="7">
                          <IonTextarea>{driver.address} {ward} {district} {province}</IonTextarea>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </div>
              );
            })}
          </div>
        </article>
      </IonContent>

      {/* <FooterBar></FooterBar> */}
    </IonPage>
  );
};

export default ProfileDriver;
