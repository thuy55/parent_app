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
  IonAlert,
  IonToast,
  IonIcon,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonModal,
  createAnimation,
  IonButton,
  IonTextarea,
  useIonAlert,
} from "@ionic/react";

// import { useParams } from "react-router";
// import ExploreContainer from "../components/ExploreContainer";
import "./Debt.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  addCircleOutline,
  addOutline,
  closeCircleOutline,
  closeOutline,
} from "ionicons/icons";
import moment from "moment";

const NotificationParent: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
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

  const [notificationParent, setNotificationParent] = useState([] as any[]);
  const [student, setStudent] = useState([] as any[]);
  const [teacher, setTeacher] = useState([] as any[]);
  const [showToast, setShowToast] = useState(false);
  const [type, setType] = useState();
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
      .post(`/parent_announcement`, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setType(res.data.type);
          if (res.data.content == null) {
            setShowToast(true);
            setNotificationParent([]);
          } else {
            setNotificationParent(res.data.content);
          }
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    var id_class_diagram = localStorage.getItem("id_class_diagram");
    var id = localStorage.getItem("id_student");
    const loginData = {
      token: x,
      id_student:id,
      id_class_diagram: id_class_diagram,
    };
    api
      .post(`/getstudent_parent_announcement`, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setTeacher(res.data.teacher);
          setStudent(res.data.student);
        }
      })
      .catch((error) => {});
  }, []);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [presentAlert] = useIonAlert();

  function addNoti() {
    if (!name) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng nhập tiêu đề thông báo",
        buttons: ["OK"],
      });
    } else if (!description) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng nhập mô tả thông báo",
        buttons: ["OK"],
      });
    } else if (!content) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng nhập nội dung thông báo",
        buttons: ["OK"],
      });
    } else {
      var x = localStorage.getItem("token");
      var id = localStorage.getItem("id_student");
      var id_class_diagram = localStorage.getItem("id_class_diagram");
      var id_school = localStorage.getItem("id_school");
      const add_noti = {
        name: name,
        description: description,
        content: content,
        token: x,
        id_student: id,
        id_school: id_school,
        id_class_diagram: id_class_diagram,
      };

      const api = axios.create({
        baseURL: "https://school.hewo.vn/api",
      });
      api
        .post("/announcement_add_parent" , add_noti)
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
            console.log("vvvvv", res.data.content);
        
            dismiss();
            window.location.reload();
            console.log("aaaaaaaa", res.data.content);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            {/* <IonBackButton></IonBackButton> */}
          </IonButtons>
          <IonTitle>Phụ huynh thông báo</IonTitle>
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
        <IonAccordionGroup className="px-3">
          {notificationParent.map((notificationParent, key) => {
            return (
              <IonAccordion value={notificationParent.id} className="mt-3 acc">
                <IonItem slot="header" color="red" className="item-Cash ps-0">
                  <div className="item-count ms-2 bg-success">P</div>
                  <IonLabel className="fw-bold">
                    Tiêu đề: {notificationParent.name}
                    <IonRow className="d-flex align-items-center w-100 mt-2">
                      <IonCol className="ps-0">
                        <p className="text-secondary">
                          {notificationParent.firstname}{" "}
                          {notificationParent.lastname}
                        </p>
                      </IonCol>
                      <IonCol className="text-end">
                        <h6 className="text-danger">
                          {moment(notificationParent.date).format("DD-MM-YYYY")}
                        </h6>
                      </IonCol>
                    </IonRow>
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
                                  Tiêu đề :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {notificationParent.name}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  Mô tả :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {notificationParent.description}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  Nội dung :
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {notificationParent.content}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  Học sinh:
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {notificationParent.firstname}{" "}
                                {notificationParent.lastname}
                              </IonCol>
                            </IonRow>
                          </p>
                        </li>
                        <li>
                          <p className="link">
                            <IonRow className="row text-align-center">
                              <IonCol>
                                <IonLabel className="lable-name">
                                  GVCN:
                                </IonLabel>
                              </IonCol>
                              <IonCol size="8" className="nd">
                                {notificationParent.firstname_teachers}{" "}
                                {notificationParent.lastname_teachers}
                              </IonCol>
                            </IonRow>
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
                                {moment(notificationParent.date).format(
                                  "DD-MM-YYYY"
                                )}
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
        {type === 1 && (
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton onClick={openModal}>
              <IonIcon
                onClick={openModal}
                size="large"
                color="white"
                icon={addOutline}
              ></IonIcon>
            </IonFabButton>
          </IonFab>
        )}
        <IonModal
          id="example-modal"
          ref={modal}
          isOpen={isOpen}
          onDidDismiss={closeModal}
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
                THÔNG BÁO ĐẾN GIÁO VIÊN
              </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={closeModal}>
                  <IonIcon color={"white"} icon={closeOutline}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonCard color={"light"}>
              <IonCardContent style={{ height: "100%" }}>
                <div className="form-group">
                  <label>Học sinh:</label>
                  <IonItem
                    fill="outline"
                    style={{ width: "100%", marginTop: "5px" }}
                  >
                    {student.map((student, key) => {
                      return (
                        <h6 className="ms-2">
                          {student.firstname} {student.lastname}
                        </h6>
                      );
                    })}
                  </IonItem>
                </div>
                <div className="form-group">
                  <label className="mt-3">Giáo viên:</label>
                  <IonItem
                    fill="outline"
                    style={{ width: "100%", marginTop: "5px" }}
                  >
                    {teacher.map((teacher, key) => {
                      return (
                        <h6 className="ms-2">
                          {teacher.firstname} {teacher.lastname}
                        </h6>
                      );
                    })}
                  </IonItem>
                </div>
                <IonItem
                  fill="outline"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <IonLabel position="floating" className="ms-2">
                    Tiêu đề thông báo
                  </IonLabel>
                  <IonInput
                    className="ms-2"
                    placeholder="Tiêu đề thông báo"
                    onIonChange={(e: any) => setName(e.target.value)}
                  ></IonInput>
                </IonItem>

                <IonItem
                  fill="outline"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <IonLabel position="floating" className="ms-2">
                    Mô tả thông báo
                  </IonLabel>
                  {/* <div style={{height:"200px"}}> */}
                  <IonTextarea
                    placeholder="Mô tả thông báo"
                    className="ms-2"
                    onIonChange={(e: any) => setDescription(e.target.value)}
                  ></IonTextarea>

                  {/* </div> */}
                </IonItem>
                <IonItem
                  fill="outline"
                  style={{ width: "100%", marginTop: "20px" }}
                >
                  <IonLabel position="floating" className="ms-2">
                    Nội dung thông báo
                  </IonLabel>
                  {/* <div style={{height:"200px"}}> */}
                  <IonTextarea
                    placeholder="Nội dung thông báo"
                    className="ms-2"
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
                        onClick={addNoti}
                      style={{ width: "110px" }}
                    >
                      THÔNG BÁO
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      onClick={closeModal}
                      color="danger"
                      style={{ width: "110px" }}
                    >
                      HỦY
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

export default NotificationParent;
