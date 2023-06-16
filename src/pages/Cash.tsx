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
  IonCard,
  IonCardContent,
  IonGrid,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonToast,
  IonBackButton,
} from "@ionic/react";

// import { useParams } from "react-router";
// import ExploreContainer from "../components/ExploreContainer";
import "./Cash.css";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
const Cash: React.FC = () => {
  const [cashclass, setCashclass] = useState([] as any[]);
  const [revenueExpenditure, setRevenueExpenditure] = useState([] as any[]);
  const [total, setTotal] = useState(0);
  const [total2, setTotal2] = useState(0);
  const [monthYear, setMonthYear] = useState([] as any[]);
  const [sum1, setSum1] = useState([] as any[]);
  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    // localStorage.removeItem("month");
    // localStorage.setItem("month", monthYear);
    var id = localStorage.getItem("id_student");
    var id_class_diagram = localStorage.getItem("id_class_diagram");
    // var idNo = localStorage.getItem("idNo");
    const loginData = {
      token: x,
      id_student: id,
      id_class_diagram:id_class_diagram
    };
    api
      .post(`/class_fund_book/` + id, loginData)
      .then((res) => {
        setMonthYear(res.data.month_year);

        if (res.data.status == "success") {
          if (res.data.content == null) {
            setShowToast(true);
            setCashclass([]);
          } else {
            const i = res.data.month_year;
            localStorage.setItem("month", i);
            setCashclass(res.data.content);
            setSum1(res.data.sum);

            console.log(res.data.content);
          }
        }
      })
      .catch((error) => {});
  }, []);

  function getMonth(e: any) {
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
      .post(`/class_fund_book_click/` + e, loginData)
      .then((res) => {
        setMonthYear(res.data.month_year);
        if (res.data.status == "success") {
          if (res.data.thu == null) {
            setShowToast(true);
            localStorage.removeItem("month");
            localStorage.setItem("month", e);
            setSum1([]);
            setCashclass([]);
          } else if (res.data.chi == null) {
            setShowToast(true);
            localStorage.removeItem("month");
            localStorage.setItem("month", e);
            setRevenueExpenditure([]);
            setSum2([]);
          } else {
            localStorage.removeItem("month");
            localStorage.setItem("month", e);
            setCashclass(res.data.thu);
            setRevenueExpenditure(res.data.chi);
            setSum1(res.data.sum1);
            setSum2(res.data.sum2);
          }
        }
      })
      .catch((error) => {});
  }
  const [showToast, setShowToast] = useState(false);
  const [sum2, setSum2] = useState([] as any[]);
  function getRevenueExpenditure(e: any) {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id = localStorage.getItem("id_student");
    var month = localStorage.getItem("month");
    var id_class_diagram = localStorage.getItem("id_class_diagram");
    const loginData = {
      token: x,
      id_student: id,
      id_class_diagram:id_class_diagram
      // month:month,
    };
    api
      .post(`/revenue_expenditure/` + month, loginData)
      .then((res) => {
        setMonthYear(res.data.month_year);
        if (res.data.status == "success") {
          if (res.data.content == null) {
            setShowToast(true);
            localStorage.removeItem("month");
            localStorage.setItem("month", e);
            setRevenueExpenditure([]);
            setSum2([]);
          } else {
            // localStorage.removeItem("month");
            // localStorage.setItem("month", e);
            setRevenueExpenditure(res.data.content);
            setSum2(res.data.sum);
            console.log("aaaaaaa");
            console.log(res.data);
            //console.log(res.data.sum);
          }
        }
      })
      .catch((error) => {});
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Sổ thu chi</IonTitle>
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
        <IonCard className="card-home-cash">
          <IonCardContent className="card-content">
            <IonGrid className="py-0">
              <IonRow className="row px-5 align-items-center d-flex">
                <IonCol>
                  <IonLabel className="lable-name">Tháng :</IonLabel>
                </IonCol>
                <IonCol size="8">
                  <div style={{ width: "100%" }}>
                    <IonInput
                      type="month"
                      onIonChange={(e: any) => getMonth(e.target.value)}
                      // value={monthYear}
                      // defaultValue={monthYear}
                      placeholder="chọn tháng"
                      className="bg-white p-1"
                    ></IonInput>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <div className="card border-0 border-top mt-3">
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
                  data-bs-target="#nav-thu-1"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  Qũy lớp
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  onClick={getRevenueExpenditure}
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#nav-chi-1"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  Chi tiêu
                </button>
              </li>
            </ul>
          </div>
          <form className="card-body tab-content px-2">
            <div className="tab-pane active" id="nav-thu-1">
              <IonLabel className="fw-bold text-end">
                <p>
                  Tổng tiền tháng {moment(monthYear).format("MM-YYYY")}: {sum1}{" "}
                  VND
                </p>
              </IonLabel>
              {cashclass.map((cashclass, key) => {
                return (
                  <IonAccordionGroup className="mt-3 mx-2">
                    <IonAccordion value="1" className="mt-3 acc">
                      <IonItem slot="header" color="red" className="item-Cash">
                        <div className="item-count bg-color-green">T</div>
                        <IonLabel className="fw-bold">
                          {cashclass.title}
                          <p className="mt-2 text-secondary">
                            Số tiền: {cashclass.price} VND
                          </p>
                        </IonLabel>
                      </IonItem>
                      <div className="ion-padding p-0 pe-2" slot="content">
                        <ol id="accordion" className="rounded-list accordion">
                          <li>
                            <ol>
                              <li>
                                <p className="link">
                                  <IonRow className="row text-align-center">
                                    <IonCol>
                                      <IonLabel className="lable-name">
                                        Nội dung:
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol size="8" className="nd">
                                      {cashclass.content}
                                    </IonCol>
                                  </IonRow>
                                </p>
                              </li>
                              <li>
                                <p className="link">
                                  <IonRow className="row text-align-center">
                                    <IonCol>
                                      <IonLabel className="lable-name">
                                        Số tiền :
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol size="8" className="nd">
                                      {cashclass.price} VND
                                    </IonCol>
                                  </IonRow>{" "}
                                </p>
                              </li>
                              <li>
                                <p className="link">
                                  <IonRow className="row text-align-center">
                                    <IonCol>
                                      <IonLabel className="lable-name">
                                        Ngày:
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol size="8" className="nd">
                                      {cashclass.date}
                                    </IonCol>
                                  </IonRow>
                                </p>
                              </li>
                            </ol>
                          </li>
                        </ol>
                      </div>
                    </IonAccordion>
                  </IonAccordionGroup>
                );
              })}
            </div>
            <div className="tab-pane" id="nav-chi-1">
              <IonLabel className="fw-bold text-end">
                <p>
                  Tổng tiền chi {moment(monthYear).format("MM-YYYY")}: {sum2}VND
                </p>
              </IonLabel>
              {revenueExpenditure.map((revenueExpenditure, key) => {
                return (
                  <IonAccordionGroup className="mt-3 mx-2">
                    <IonAccordion value="1" className="mt-3 acc">
                      <IonItem slot="header" color="red" className=" item-Cash">
                        <div className="item-count bg-color-green">C</div>
                        <IonLabel className="fw-bold">
                          {revenueExpenditure.content}
                          <p className="mt-2 text-secondary">
                            Số tiền: {revenueExpenditure.price} VND
                          </p>
                        </IonLabel>
                      </IonItem>
                      <div className="ion-padding p-0 pe-2" slot="content">
                        <ol id="accordion" className="rounded-list accordion">
                          <li>
                            <ol>
                              <li>
                                <p className="link">
                                  <IonRow className="row text-align-center">
                                    <IonCol>
                                      <IonLabel className="lable-name">
                                        Nội dung:
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol size="8" className="nd">
                                      {revenueExpenditure.content}
                                    </IonCol>
                                  </IonRow>
                                </p>
                              </li>
                              <li>
                                <p className="link">
                                  <IonRow className="row text-align-center">
                                    <IonCol>
                                      <IonLabel className="lable-name">
                                        Số tiền :
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol size="8" className="nd">
                                      {revenueExpenditure.price} VND
                                    </IonCol>
                                  </IonRow>{" "}
                                </p>
                              </li>
                              <li>
                                <p className="link">
                                  <IonRow className="row text-align-center">
                                    <IonCol>
                                      <IonLabel className="lable-name">
                                        Ngày:
                                      </IonLabel>
                                    </IonCol>
                                    <IonCol size="8" className="nd">
                                      {revenueExpenditure.date}
                                    </IonCol>
                                  </IonRow>
                                </p>
                              </li>
                            </ol>
                          </li>
                        </ol>
                      </div>
                    </IonAccordion>
                  </IonAccordionGroup>
                );
              })}
            </div>
          </form>
        </div>
      </IonContent>
      {/* <FooterBar></FooterBar> */}
    </IonPage>
  );
};

export default Cash;
