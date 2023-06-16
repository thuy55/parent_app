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
  IonFab,
  IonFabList,
  IonFabButton,
  IonIcon,
  IonButton,
  IonModal,
  IonLabel,
  IonInput,
  IonTextarea,
  IonCol,
  useIonAlert,
} from "@ionic/react";
import React, { useRef } from "react";
import "./Opinion.css";
import axios from "axios";

import {
  IonItem,
  IonGrid,
  IonRow,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonSearchbar,
  createAnimation,
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import {
  chevronUpCircle,
  closeOutline,
  duplicateOutline,
  trashOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import moment from "moment";

const Opinion: React.FC = () => {
  const [student, setStudent] = useState([] as any[]);
  const [opinion, setOpinion] = useState([] as any[]);
  const history = useHistory();
  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [presentAlert] = useIonAlert();

  function addOpinion() {
    if (!title) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng nhập tiêu đề góp ý",
        buttons: ["OK"],
      });
    } else if (!content) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng nhập nội dung góp ý",
        buttons: ["OK"],
      });
    } else {
      var id = localStorage.getItem("id_student");
      var x = localStorage.getItem("token");
      var id_class_diagram = localStorage.getItem("id_class_diagram");
      const add_opinion = {
        title: title,
        content: content,
        token: x,
        id_student: id,
        id_class_diagram: id_class_diagram,
      };

      const api = axios.create({
        baseURL: "https://school.hewo.vn/api",
      });
      api
        .post("/opinion-add/" + id, add_opinion)
        .then((res) => {
          if (res.data.status == "error") {
            dismiss();
            presentAlert({
              header: "Lỗi",
              message: res.data.content,
              buttons: ["OK"],
            });
          } else if (res.data.status == "success") {
            // console.log(res.data.content);
            dismiss();

            window.location.reload();
            console.log("aaaaaaaa", res.data.content)
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
      .post(`/students/` + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setStudent(res.data.content);
        }
      })
      .catch((error) => {});
  }, []);

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
      .post(`/opinion/` + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setOpinion(res.data.content);
        }
      })
      .catch((error) => {});
  }, []);

  function handleItemClick(event: any) {
    const itemId = event.target.id;
    localStorage.removeItem("id_opinion");
    localStorage.setItem("id_opinion", itemId);
    console.log(itemId);

    // Lưu itemId vào state hoặc thực hiện các xử lý khác tùy vào nhu cầu của bạn
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Đóng góp ý kiến</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="container">
        {/* <IonCard className="card-home">
          <IonCardContent className="card-content">
            <IonGrid>
              <IonRow className="row">
                <IonSearchbar
                  style={{ textAlign: "start" }}
                  className="searchbar"
                  debounce={1000}
                ></IonSearchbar>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard> */}
        {opinion.map((opinion, key) => {
          return (
            <Link to="/opinionDetail">
              <IonItem
                button
                detail={true}
                onClick={handleItemClick}
                key={opinion.id}
                id={opinion.id}
                className="list-item"
              >
                <IonCardHeader
                  onClick={handleItemClick}
                  key={opinion.id}
                  id={opinion.id}
                  style={{ padding: "10px" }}
                >
                  <IonCardTitle
                    className="title-card"
                    onClick={handleItemClick}
                    key={opinion.id}
                    id={opinion.id}
                  >
                    {opinion.title}
                  </IonCardTitle>
                  <IonCardSubtitle
                    onClick={handleItemClick}
                    key={opinion.id}
                    id={opinion.id}
                  >
                    {moment(opinion.date).format("DD-MM-YYYY")}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonItem>
            </Link>
          );
        })}

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon size="large" icon={chevronUpCircle}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton id="open-modal-opinion">
              <IonIcon color="success" icon={duplicateOutline}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon color="danger" icon={trashOutline}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>

        <IonModal
          id="example-modal"
          ref={modal}
          trigger="open-modal-opinion"
          enterAnimation={enterAnimation}
          leaveAnimation={leaveAnimation}
          style={{ alignItems: "start", marginTop: "20px" }}
        >
          <IonContent>
            <IonToolbar>
              <IonTitle
                color={"white"}
                style={{ textAlign: "center", fontStyle: "bold" }}
              >
                THÊM GÓP Ý
              </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>
                  <IonIcon color={"white"} icon={closeOutline}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonCard color={"light"}>
              <IonCardContent style={{ height: "100%" }}>
                <IonItem fill="outline">
                  {student.map((student, key) => {
                    return (
                      <h4 className="ms-2">
                        Phụ huynh em: {student.firstname} {student.lastname}
                      </h4>
                    );
                  })}
                  {/* <IonInput readonly>Phụ huynh của em: Nguyễn Văn A</IonInput> */}
                </IonItem>
                <IonItem
                  fill="outline"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <IonLabel position="floating">Tiêu đề góp ý</IonLabel>
                  <IonInput
                    placeholder="Tiêu đề góp ý"
                    onIonChange={(e: any) => setTitle(e.target.value)}
                  ></IonInput>
                </IonItem>

                <IonItem
                  fill="outline"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <IonLabel position="floating">Nội dung góp ý</IonLabel>
                  {/* <div style={{height:"200px"}}> */}
                  <IonTextarea
                    placeholder="Nội dung góp ý"
                    onIonChange={(e: any) => setContent(e.target.value)}
                  ></IonTextarea>

                  {/* </div> */}
                </IonItem>

                <IonRow
                  class="row-btn"
                  style={{ textAlign: "center", marginTop: "20px" }}
                >
                  <IonCol>
                    <IonButton
                      color="success"
                      onClick={addOpinion}
                      style={{ width: "110px" }}
                    >
                      GÓP Ý
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      onClick={() => dismiss()}
                      color="danger"
                      style={{ width: "110px" }}
                    >
                      CANCEL
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>
      </IonContent>
      {/* <FooterBar></FooterBar> */}
    </IonPage>
  );
};

export default Opinion;
