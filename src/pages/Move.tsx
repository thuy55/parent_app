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
  IonIcon,
  IonButton,
  IonToast,
  IonBackButton,
} from "@ionic/react";
import "./Move.css";

import { IonLabel, IonCol, IonGrid, IonRow } from "@ionic/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { key } from "ionicons/icons";
import moment from "moment";
const HealthRecord: React.FC = () => {
  const [go, setGo] = useState([] as any[]);
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
      .post(`/car_schedule_go/` + id_class_diagram, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.content == null) {
            setShowToast(true);
            setGo([]);
          } else {
            setGo(res.data.content);
          }
        }
      })
      .catch((error) => {});
  }, []);
  const [showToast, setShowToast] = useState(false);
  const [back, setBack] = useState([] as any[]);
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
      .post(`/car_schedule_comeback/` + id_class_diagram, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.content == null) {
            setShowToast(true);
            setBack([]);
          } else {
            setBack(res.data.content);
          }
        }
      })
      .catch((error) => {});
  }, []);

  function handleItemClick(event: any) {
    const itemId = event.target.id;
    localStorage.removeItem("id_driver");
    localStorage.setItem("id_driver", itemId);
    console.log(itemId);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Đưa đón học sinh</IonTitle>
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
        <div className="card border-0 mb-0 border-top mt-0">
          <div className="card-header">
            <ul
              className="nav nav-pills  d-flex justify-content-around"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Xe đón đi
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#nav-ts"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Xe đón về
                </button>
              </li>
            </ul>
          </div>
          <form className="card-body tab-content p-0">
            <div className="tab-pane active" id="nav-home">
              <div className="page-content page-container" id="page-content">
                <div className="">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="timeline mb-0 p-1 pt-3 block mb-4">
                        {go.map((go, key) => {
                          if (go.day_of_week == "Thứ 2") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {go.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(go.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{ backgroundColor: "#FFCCCC" }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={go.driver}
                                            id={go.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (go.day_of_week == "Thứ 3") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {go.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(go.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{ backgroundColor: "#FFDAB9" }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={go.driver}
                                            id={go.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (go.day_of_week == "Thứ 4") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {go.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(go.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{ backgroundColor: "#FFFFCC" }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={go.driver}
                                            id={go.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (go.day_of_week == "Thứ 5") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {go.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(go.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{ backgroundColor: "#CCFFFF" }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={go.driver}
                                            id={go.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (go.day_of_week == "Thứ 6") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {go.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(go.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{
                                      backgroundColor: "rgb(184 182 255)",
                                    }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={go.driver}
                                            id={go.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (go.day_of_week == "Thứ 7") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {go.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(go.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard className="me-2 move-1">
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={go.driver}
                                            id={go.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (go.day_of_week == "Chủ nhật") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {go.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(go.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{
                                      backgroundColor: "rgb(249 215 247)",
                                    }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {go.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={go.driver}
                                            id={go.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane" id="nav-ts">
              <div className="page-content page-container" id="page-content">
                <div className="">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="timeline mb-0 p-1 pt-3 block mb-4">
                        {back.map((back, key) => {
                          if (back.day_of_week == "Thứ 2") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {back.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(back.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{ backgroundColor: "#FFCCCC" }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={back.driver}
                                            id={back.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (back.day_of_week == "Thứ 3") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {back.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(back.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{ backgroundColor: "#FFDAB9" }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={back.driver}
                                            id={back.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (back.day_of_week == "Thứ 4") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {back.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(back.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{ backgroundColor: "#FFFFCC" }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={back.driver}
                                            id={back.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (back.day_of_week == "Thứ 5") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {back.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(back.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{ backgroundColor: "#CCFFFF" }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={back.driver}
                                            id={back.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (back.day_of_week == "Thứ 6") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {back.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(back.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{
                                      backgroundColor: "rgb(184 182 255)",
                                    }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={back.driver}
                                            id={back.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (back.day_of_week == "Thứ 7") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {back.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(back.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    // style={{
                                    //   backgroundColor: "rgb(184 182 255)",
                                    // }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={back.driver}
                                            id={back.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          } else if (back.day_of_week == "Chủ nhật") {
                            return (
                              <div className="tl-item active">
                                <div className="tl-dot">
                                  <a
                                    className="tl-author"
                                    href="#"
                                    data-abc="true"
                                  >
                                    <span className="w-32 avatar2 circle gd-warning">
                                      {back.day_of_week}
                                    </span>
                                  </a>
                                </div>
                                <div className="tl-content w-100">
                                  <div className="tl-date text-muted mt-1">
                                    {moment(back.date).format("DD-MM-YYYY")}
                                  </div>
                                  <IonCard
                                    className="me-2 move-1"
                                    style={{
                                      backgroundColor: "rgb(249 215 247)",
                                    }}
                                  >
                                    <IonCardContent>
                                      <IonGrid className="">
                                        <IonRow className="pt-1">
                                          <IonCol className="text-2">
                                            Loại xe
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.typecar}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Biển số:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.license_plates}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            tài xế:{" "}
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.namedriver}
                                          </IonCol>
                                        </IonRow>
                                        <IonRow className="pt-3">
                                          <IonCol className="text-2">
                                            Tuyến xe:
                                          </IonCol>
                                          <IonCol className="text-1" size="7">
                                            {back.route}
                                          </IonCol>
                                        </IonRow>

                                        <Link to="/ProfileDriver">
                                          <IonButton
                                            expand="block"
                                            className="mt-3"
                                            onClick={handleItemClick}
                                            key={back.driver}
                                            id={back.driver}
                                          >
                                            Xem thêm...
                                          </IonButton>
                                        </Link>
                                      </IonGrid>
                                    </IonCardContent>
                                  </IonCard>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HealthRecord;
