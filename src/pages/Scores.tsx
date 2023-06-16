import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { starSharp } from "ionicons/icons";
import { useEffect, useState } from "react";

import "./Scores.css";
import { log } from "console";

const OpinionDetail: React.FC = () => {
  const [semester, setSemester] = useState([] as any[]);
  const [diemtrungbinh, setDTB] = useState();
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
      .post("/scores/" + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          // localStorage.removeItem("id_semester");

          setSemester(res.data.semester);
          // setSubject(res.data.subject_teacher);
          // }
        }
      })
      .catch((error) => {});
  }, []);
  const [showToast, setShowToast] = useState(false);
  const [subject, setSubject] = useState([] as any[]);
  function getSubject(e: any) {
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
      .post(`/subject_scores/` + e, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          if (res.data.semester == null) {
            setShowToast(true);
            setSubject([]);
          } else {
            localStorage.removeItem("id_semester");
            localStorage.setItem("id_semester", e);
            console.log("wwww");
            setSubject(res.data.semester);
          }
        }
      })
      .catch((error) => {});
  }
  // function handleItemClick(event: any) {
  //     const itemId = event.target.id;
  //     localStorage.removeItem("id_subject");
  //     localStorage.setItem("id_subject", itemId);
  //     console.log(itemId);
  //   }

  const [scores, setScores] = useState([] as any[]);
  // const [tb, setTb] = useState([] as any[]);
  function getScore(e: any) {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id = localStorage.getItem("id_student");
    var id_se = localStorage.getItem("id_semester");
    // var id_sub = localStorage.getItem("id_subject");
    const assigning_teachers = e.target.id;
    console.log("abc", assigning_teachers);
    var id_class_diagram = localStorage.getItem("id_class_diagram");

    const loginData = {
      token: x,
      semester: id_se,
      id_student: id,
      id_class_diagram: id_class_diagram,
    };

    api
      .post(`/scores-detail/` + assigning_teachers, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setDTB(res.data.diemTrungBinh);
          if (res.data.subject_teacher == null) {
            setShowToast(true);
            setScores([]);
          } else {
            setScores(res.data.subject_teacher);
            console.log(res.data.subject_teacher);
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
          <IonTitle>Kết quả học tập</IonTitle>
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
         <IonCard className="card-home">
          <IonCardContent className="card-content">
            <IonGrid className="py-0">
              <IonRow className="me-2 d-flex align-items-center ms-2">
                <IonCol>
                  <IonLabel className="lable-name">Học kì :</IonLabel>
                </IonCol>
                <IonCol size="9">
                  <div style={{ width: "100%" }}>
                    <select
                      className="select-name w-100"
                      color="primary"
                      slot="start"
                      // interface="popover"
                      placeholder="HỌC KÌ"
                      onChange={(e: any) => getSubject(e.target.value)}
                    >
                      {semester.length > 0 ? (
                        <option value={""}>Chọn học kì</option>
                      ) : null}
                      {semester.map((semester, key) => {
                    return (
                      <option value={semester.id} key={key}>
                        HỌC KÌ {semester.name} ({semester.course_name})
                      </option>
                    );
                  })}
                    </select>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            </IonCardContent>
        </IonCard>
        <IonGrid style={{ marginTop: "10px" }}>
      

          <IonAccordionGroup className="mt-2 p-2">
            {subject.map((subject, key) => {
              return (
                <IonAccordion
                  // value={subject.id_teacher}
                  key={key}
                  className="p-1 bg-color  mb-2"
                >
                  <IonItem
                    slot="header"
                    color="red"
                    className="item-scores"
                    onClick={getScore}
                    key={subject.id_assigning_teachers}
                    id={subject.id_assigning_teachers}
                  >
                    <IonIcon
                      onClick={getScore}
                      key={subject.id_assigning_teachers}
                      id={subject.id_assigning_teachers}
                      icon={starSharp}
                      style={{ marginBottom: 1, marginRight: "20px" }}
                    ></IonIcon>
                    <IonLabel
                      className="ten"
                      onClick={getScore}
                      key={subject.id_assigning_teachers}
                      id={subject.id_assigning_teachers}
                    >
                      {subject.subject}
                      <p
                        className="mt-2 text-secondary fw-medium"
                        onClick={getScore}
                        key={subject.id_assigning_teachers}
                        id={subject.id_assigning_teachers}
                      >
                        Giáo viên: {subject.teacher_firstname}{" "}
                        {subject.teacher_lastname}
                      </p>
                    </IonLabel>
                  </IonItem>
                  <div className="p-1" slot="content">
                    <IonCard className="bg-card">
                      <IonCardContent className="card-content-grid-list">
                        {scores.map((scores, key) => {
                          return (
                            <IonRow className="row">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  {scores.typescore}:
                                </IonLabel>
                              </IonCol>
                              <IonCol className="tt" size="3">
                                <h5>{scores.scores}</h5>
                              </IonCol>
                            </IonRow>
                          );
                        })}
                        <IonRow className="row" style={{color:"#f9b1b1"}}>
                          <IonCol>
                            <IonLabel className="lable-name fw-bold">
                              ĐIỂM TRUNG BÌNH:
                            </IonLabel>
                          </IonCol>
                          <IonCol className="tt fw-bold" size="3">
                            <h5>{diemtrungbinh}</h5>
                          </IonCol>
                        </IonRow>
                      </IonCardContent>
                    </IonCard>
                  </div>
                </IonAccordion>
              );
            })}
          </IonAccordionGroup>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OpinionDetail;
