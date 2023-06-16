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
  useIonAlert,
  IonSelect,
  IonSelectOption,
  IonBackButton,
} from "@ionic/react";
import axios from "axios";
import { home, library, playCircle, radio, search } from "ionicons/icons";
import "./Account.css";
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
// import { removeUserSession } from "./Common";

const Account: React.FC = () => {
  const history = useHistory();
  const removeUserSession = () => {
      localStorage.removeItem('token');
    }
  const handleLogout = () => {
    removeUserSession();
    history.push("/");
  };
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

  const [paren, setParen] = useState([] as any[]);
  const [ward, setWard] = useState([] as any[]);
  const [province, setProvince] = useState([] as any[]);
  const [district, setDistrict] = useState([] as any[]);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });
    var x = localStorage.getItem("token");
    const loginData = {
      token: x,
    };

    api
      .post("/parent", loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setParen(res.data.content);
          setWard(res.data.ward);
          setProvince(res.data.province);
          setDistrict(res.data.district);
        }
      })
      .catch((error) => {});
  }, []);

  const [passwordold, setPasswordold] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcomfirm, setPasswordcomfirm] = useState("");
  const [message, setMessage] = useState("");
  const [presentAlert] = useIonAlert();
  function changePass() {
    if (!passwordold) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng nhập mật khẩu cũ",
        buttons: ["OK"],
      });
    } else if (!password) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng nhập mật khẩu mới",
        buttons: ["OK"],
      });
    } else if (!passwordcomfirm) {
      presentAlert({
        header: "Lỗi",
        message: "Vui lòng nhập lại mật khẩu mới",
        buttons: ["OK"],
      });
    }else{
      if (password != passwordcomfirm) {
        setMessage("Nhập lại mật khẩu mới sai.");
        return;
      }
      var x = localStorage.getItem("token");
      const change = {
        passwordold: passwordold,
        password: password,
        passwordcomfirm: passwordcomfirm,
        token: x,
      };
  
      const api = axios.create({
        baseURL: "https://school.hewo.vn/api",
      });
      api
        .post("/changepass-parent", change)
        .then((res) => {
          if (res.data.status == "error") {
            dismiss();
            presentAlert({
              header: "Lỗi",
              message: res.data.content,
              buttons: ["OK"],
            });
          } else if (res.data.status == "success") {
            setMessage("Password changed successfully.");
            setPasswordold("");
            setPassword("");
            setPasswordcomfirm("");
            dismiss();
            presentAlert({
              header: "Thành công",
              message: "Cập nhật mật khẩu thành công",
              buttons: ["OK"],
            });
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
            {/* <IonMenuButton /> */}
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Thông tin tài khoản</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="box_content">
        <article className="bg-xl">
          <div className=" before-bg-style">
            <div className="profile">
              {paren.map((paren, key) => {
                return (
                  <div className="avatar">
                    <img
                      className="avatar-img"
                      src={`${paren.avatar}`}
                      alt=""
                    />
                  </div>
                );
              })}
              <IonCardContent className="bg-3 ms-0 me-0 profile ps-2">
                <IonGrid className="pv mt-4">
                  <IonRow className="align-items-center my-2">
                    <IonCol>Họ và tên:</IonCol>
                    {paren.map((paren, key) => {
                      return (
                        <IonCol className="text-1" size="7">
                          <IonInput readonly value={paren.name}></IonInput>
                        </IonCol>
                      );
                    })}
                  </IonRow>

                  <IonRow className="align-items-center my-2">
                    <IonCol>Số điện thoại:</IonCol>
                    {paren.map((paren, key) => {
                      return (
                        <IonCol className="text-1" size="7">
                          <IonInput
                            readonly
                            value={paren.phone_number}
                          ></IonInput>
                        </IonCol>
                      );
                    })}
                  </IonRow>

                  <IonRow className="align-items-center my-2">
                    <IonCol>Ngày sinh:</IonCol>
                    {paren.map((paren, key) => {
                      return (
                        <IonCol className="text-1" size="7">
                          <IonInput readonly>
                            {moment(paren.birthday).format("DD-MM-YYYY")}
                          </IonInput>
                        </IonCol>
                      );
                    })}
                  </IonRow>

                  <IonRow className="align-items-center my-2">
                    <IonCol>Chức vụ :</IonCol>
                    {paren.map((paren, key) => {
                      return (
                        <IonCol className="text-1" size="7">
                          <IonInput value={paren.type} readonly></IonInput>
                        </IonCol>
                      );
                    })}
                  </IonRow>

                  <IonRow className="align-items-center my-2">
                    <IonCol>Địa chỉ:</IonCol>
                    <IonCol
                      className="text-1"
                      style={{ textAlign: "justify" }}
                      size="7"
                    >
                      {paren.map((paren, key) => {
                        return <b>{paren.address}</b>;
                      })}

                      {ward.map((ward, key) => {
                        return <b>, {ward.name}</b>;
                      })}

                      {district.map((district, key) => {
                        return <b>, {district.name}</b>;
                      })}
                      {province.map((province, key) => {
                        return <b>, {province.name}</b>;
                      })}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </div>
          </div>
        </article>
        {/* <IonRow className="justify-content-center mt-4 d-flex">
          <IonButton
            className="w-75"
            color="warning"
            id="open-modal-update"
            expand="block"
            onClick={openModal}
          >
            CẬP NHẬT THÔNG TIN
          </IonButton>
          <IonModal
            id="example-modal"
            ref={modal}
            trigger="open-modal-update"
            enterAnimation={enterAnimation}
            leaveAnimation={leaveAnimation}
            isOpen={isOpen}
          >
            <IonContent>
              <IonToolbar>
                <IonTitle className="text-center">Cập nhật tài khoản</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={closeModal}>X</IonButton>
                </IonButtons>
              </IonToolbar>
              <IonList className="p-3">
                <IonLabel>Họ và tên :</IonLabel>
                <IonItem fill="outline" className="mt-2 mb-3">
                  {paren.map((paren, key) => {
                    return (
                      <IonInput className="ps-3" value={paren.name}></IonInput>
                    );
                  })}
                </IonItem>
                <IonLabel>Số điện thoại :</IonLabel>
                <IonItem fill="outline" className="mt-2 mb-3">
                  {paren.map((paren, key) => {
                    return (
                      <IonInput
                        readonly
                        className="ps-3"
                        value={paren.phone_number}
                      ></IonInput>
                    );
                  })}
                </IonItem>
                <IonLabel>Ngày sinh :</IonLabel>
                <IonItem fill="outline" className="mt-2 mb-3">
                  {paren.map((paren, key) => {
                    return (
                      <IonInput
                        className="ps-3"
                        value={paren.birthday}
                      ></IonInput>
                    );
                  })}
                </IonItem>
                <IonLabel>Chức vụ :</IonLabel>
                <IonItem fill="outline" className="mt-2 mb-3">
                  {paren.map((paren, key) => {
                    return (
                      <IonInput className="ps-3" value={paren.type}></IonInput>
                    );
                  })}
                </IonItem>
                <IonLabel>Địa chỉ :</IonLabel>
                <IonItem fill="outline" className="mt-2 mb-3">
                  <IonInput className="ps-3">
                   
                  </IonInput>
                </IonItem>

                <IonRow
                  class="row-btn"
                  style={{ textAlign: "center", marginTop: "20px" }}
                >
                  <IonCol>
                    <IonButton color="tertiary" style={{ width: "110px" }}>
                      CẬP NHẬT
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      onClick={closeModal}
                      color="dark"
                      style={{ width: "110px" }}
                    >
                      HUỶ
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonList>
            </IonContent>
          </IonModal>
        </IonRow> */}

        <IonRow className="justify-content-center mt-2 d-flex">
          <IonButton
            className="w-75 fw-bold rounded-3"
            color="tertiary"
            id="open-modal-repass"
            expand="block"
          >
            ĐỔI MẬT KHẨU
          </IonButton>
          <IonModal
            id="example-modal"
            ref={modal}
            trigger="open-modal-repass"
            enterAnimation={enterAnimation}
            leaveAnimation={leaveAnimation}
          >
            <IonContent>
              <IonToolbar>
                <IonTitle className="text-center">Đổi mật khẩu</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => dismiss()}>X</IonButton>
                </IonButtons>
              </IonToolbar>
              <IonList className="p-3">
                <IonLabel>Nhập mật khẩu cũ :</IonLabel>
                <IonItem fill="outline" className="mt-2 mb-3">
                  <IonInput
                    className="ps-3"
                    id="passwordold"
                    type="password"
                    placeholder="******"
                    onIonChange={(e: any) => setPasswordold(e.target.value)}
                  ></IonInput>
                </IonItem>
                <IonLabel>Nhập mật khẩu mới :</IonLabel>
                <IonItem fill="outline" className="mt-2 mb-3">
                  <IonInput
                    className="ps-3"
                    type="password"
                    placeholder="******"
                    onIonChange={(e: any) => setPassword(e.target.value)}
                  ></IonInput>
                </IonItem>
                <IonLabel>Nhập lại mật khẩu mới :</IonLabel>
                <IonItem fill="outline" className="mt-2 mb-3">
                  <IonInput
                    className="ps-3"
                    type="password"
                    placeholder="******"
                    onIonChange={(e: any) => setPasswordcomfirm(e.target.value)}
                  ></IonInput>
                </IonItem>

                <IonRow
                  class="row-btn"
                  style={{ textAlign: "center", marginTop: "20px" }}
                >
                  <IonCol>
                    <IonButton
                      onClick={changePass}
                      color="tertiary"
                      style={{ width: "110px" }}
                    >
                      CẬP NHẬT
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      onClick={() => dismiss()}
                      color="dark"
                      style={{ width: "110px" }}
                    >
                      HUỶ
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonList>
            </IonContent>
          </IonModal>
        </IonRow>
        <IonRow className="justify-content-center mt-2 d-flex">
         
          <input
            type="button"
            className="w-75 bg-dark text-white p-2 fw-bold rounded-3"
            onClick={handleLogout}
            value="ĐĂNG XUẤT"
          />
        </IonRow>
      </IonContent>

      {/* <FooterBar></FooterBar> */}
    </IonPage>
  );
};

export default Account;
