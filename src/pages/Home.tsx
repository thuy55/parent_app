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
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAvatar,
  IonItem,
  IonChip,
  IonBackButton,
} from "@ionic/react";
import moment from "moment";

import "./Home.css";
import { IonLabel } from "@ionic/react";
import { IonBreadcrumb, IonBreadcrumbs } from "@ionic/react";
import { home, notifications, newspaper } from "ionicons/icons";

import { IonSearchbar } from "@ionic/react";

import React, { useEffect, useState } from "react";
import { IonList, IonThumbnail } from "@ionic/react";
import { IonCol, IonRow } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { image, earth, call, location } from "ionicons/icons";
import { Link } from "react-router-dom";
import axios from "axios";
const Home: React.FC = () => {
  const [news, setNews] = useState([] as any[]);
  const [newss, setNewss] = useState([] as any[]);
  const [notificationSchool, setNotificationSchool] = useState([] as any[]);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://school.hewo.vn/api",
    });

    var x = localStorage.getItem("token");
    var id = localStorage.getItem("id_student");

    const loginData = {
      token: x,
      id_student: id,
    };
    api
      .post(`/news/` + id, loginData)
      .then((res) => {
        if (res.data.status === "success") {
          setNews(res.data.news);
          setNotificationSchool(res.data.school_announcement);
        }
      })
      .catch((error) => {});
  }, []);

  function handleItemClick(event: any) {
    const itemId = event.target.id;
    localStorage.removeItem("id_notification");
    localStorage.setItem("id_notification", itemId);
  }

  function handleItemClickNew(e: any) {
    const itemId2 = e.target.id;
    localStorage.removeItem("id_newsDetail");
    localStorage.setItem("id_newsDetail", itemId2);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Hoạt động trường</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="container">
        <IonLabel>
          <div className="titie2 ">Hoạt động tiêu biểu</div>
        </IonLabel>
        <IonItem className="itemTt">
          <div className="container2">
            <div id="carousel">
              <figure>
                <img src="https://edu.viettel.vn/upload/49555/fck/files/cb4d9baaa7ed5ab303fc.jpg" />
              </figure>
              <figure>
                <img src="https://kinhtenongthon.vn/srv_thumb.ashx?w=300&h=200&f=data/data/Baoinktnt/2017/Thang%2011/Ngay%2024/tr13.JPG" />
              </figure>
              <figure>
                <img src="https://cdnmedia.baotintuc.vn/Upload/gYJXHsn6VBCJnSv7rj8xYQ/files/2022/04/anhdo.jpg" />
              </figure>
              <figure>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzlhxXOkqcxaDelO0kpUFTWLSvQeyYaz-woQ&usqp=CAU" />
              </figure>
              <figure>
                <img src="https://lawnet.vn/uploads/image/2020/02/12/084151060.jpg" />
              </figure>
              <figure>
                <img src="https://lawnet.vn/uploads/image/2020/02/12/084151060.jpg" />
              </figure>
              <figure>
                <img src="https://media.baodansinh.vn/files/content/2022/01/19/mam-non-151911.jpg" />
              </figure>
              <figure>
                <img src="https://i.imgur.com/DjwL2R8.jpg" />
              </figure>
              <figure>
                <img src="https://i.imgur.com/ZCeK0MQ.jpg" />
              </figure>
            </div>
          </div>
        </IonItem>
        <IonItem className="itemTt2">
          <IonBreadcrumbs>
            <IonBreadcrumb href="/dashboard">
              Home
              <IonIcon slot="end" icon={home}></IonIcon>
            </IonBreadcrumb>
            <IonBreadcrumb href="/notifications">
              Thông báo
              <IonIcon slot="end" icon={notifications}></IonIcon>
            </IonBreadcrumb>
            <IonBreadcrumb href="/news">
              Tin tức
              <IonIcon slot="end" icon={newspaper}></IonIcon>
            </IonBreadcrumb>
          </IonBreadcrumbs>
        </IonItem>
        <IonSearchbar></IonSearchbar>
        <div className="list-group">
          {news.map((newss, key) => {
            return (
              <>
                <Link
                  to="/News_open"
                  className="list-group-item p-0 list-group-item-action"
                  onClick={handleItemClickNew}
                  key={newss.id}
                  id={newss.id}
                >
                  <IonCard className="card-news cl">
                    <img
                      onClick={handleItemClickNew}
                      key={newss.id}
                      id={newss.id}
                      alt="Silhouette of mountains"
                      src={`${newss.avatar}`}
                    />
                    <IonCardHeader
                      className="pd"
                      onClick={handleItemClickNew}
                      key={newss.id}
                      id={newss.id}
                    >
                      <IonCardTitle
                        className="font"
                        onClick={handleItemClickNew}
                        key={newss.id}
                        id={newss.id}
                      >
                        {newss.name}
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent
                      className="news"
                      onClick={handleItemClickNew}
                      key={newss.id}
                      id={newss.id}
                    >
                      <IonLabel
                        className="text-content-home"
                        onClick={handleItemClickNew}
                        key={newss.id}
                        id={newss.id}
                      >
                        {/* <img src='https://school.hewo.vn/images/accounts/513Nailstik_foto_Kiengcanteam_29.jpg' alt='' width='3821' height='5724' /> */}
                        {newss.description}
                        {/* <div dangerouslySetInnerHTML={{ __html: newss.content }}></div> */}
                      </IonLabel>

                      <IonCardSubtitle
                        className="color-tt"
                        onClick={handleItemClickNew}
                        key={newss.id}
                        id={newss.id}
                      >
                        Ngày đăng tải:
                        {moment(newss.date).format("DD-MM-YYYY")}
                      </IonCardSubtitle>
                      <IonCardSubtitle
                        className="color-11"
                        onClick={handleItemClickNew}
                        key={newss.id}
                        id={newss.id}
                      >
                        Đọc thêm...
                      </IonCardSubtitle>
                      <IonCardSubtitle className=""></IonCardSubtitle>
                    </IonCardContent>
                  </IonCard>
                </Link>
              </>
            );
          })}
        </div>
        <IonCard>
          <IonCardHeader className="notifile">
            <IonCardTitle>Thông báo mới</IonCardTitle>
            <IonCardSubtitle className="colordate">
              ngày 22/12/2022
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent className="pg">
            {notificationSchool.map((notificationSchool, key) => {
              return (
                <>
                  <IonList>
                    <Link to="/NotificationDetail">
                      <IonItem
                        className="item-inner"
                        button
                        detail={true}
                        onClick={handleItemClick}
                        id={notificationSchool.id}
                        key={notificationSchool.id}
                      >
                        <IonThumbnail className="img" slot="start">
                          <img
                            onClick={handleItemClick}
                            id={notificationSchool.id}
                            key={notificationSchool.id}
                            className="img2"
                            alt="Silhouette of mountains"
                            src={`${notificationSchool.avatar}`}
                          />
                        </IonThumbnail>
                        <IonLabel>
                          <IonRow>
                            <IonCol>
                              <IonLabel>
                                <h2>{notificationSchool.name}</h2>
                                <div className="dp">
                                  <IonIcon
                                    className="icondownload"
                                    icon={image}
                                  ></IonIcon>{" "}
                                  <div className="noti">
                                    {notificationSchool.description}
                                  </div>
                                </div>
                              </IonLabel>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonItem>
                    </Link>
                  </IonList>
                </>
              );
            })}
            <IonCardHeader className="notifile2">
              <IonCardSubtitle className="colordate">
                <IonRow>
                  <IonCol className="text1" size="6">
                    January 20, 2015
                  </IonCol>
                  {/* <IonCol className="text2" size="6">
                    Xem thêm...
                  </IonCol> */}
                </IonRow>
              </IonCardSubtitle>
            </IonCardHeader>
          </IonCardContent>

          <IonLabel>
            <h1 className="titiel mt-2 mb-2">Giới thiệu:</h1>
          </IonLabel>
          <IonCard className="card-news cl-2 m-0">
            <img
              alt="Silhouette of mountains"
              src="https://bcp.cdnchinhphu.vn/Uploaded/phungthithuhuyen/2020_06_16/Resize%20of%20truonghoc.png"
            />
            <IonCardHeader className="pd">
              <IonCardTitle className="font font2">
                Trường tiểu học Lê Qúy Đôn
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="news">
              Thông tin sở giáo dục và đào tạo hoạt động trường dự trên, tin sở
              giáo dục và đào tạo hoạt động trường dự trên ...
              <IonCardSubtitle className="">
                <IonCardContent className="pg p-0 cl">
                  <IonList className="pd0">
                    <IonList className="">
                      <IonItem className="h ">
                        <IonThumbnail
                          className="m-0   text-center"
                          slot="start"
                        >
                          <IonIcon className="iconic " icon={earth}></IonIcon>
                        </IonThumbnail>
                        <IonLabel className="m-0 p-0 ">www.eclo.vn</IonLabel>
                      </IonItem>

                      <IonItem className="h">
                        <IonThumbnail className="m-0 text-center" slot="start">
                          <IonIcon className="iconic" icon={call}></IonIcon>
                        </IonThumbnail>
                        <IonLabel className="m-0">070099999</IonLabel>
                      </IonItem>

                      <IonItem className="h">
                        <IonThumbnail className="m-0 text-center" slot="start">
                          <IonIcon className="iconic" icon={location}></IonIcon>
                        </IonThumbnail>
                        <IonLabel className="m-0">
                          54 bàu cát 6 phường 12 quận tân bình
                        </IonLabel>
                      </IonItem>

                      <IonItem className="h">
                        <IonThumbnail className="m-0 text-center" slot="start">
                          <IonIcon className="iconic" icon={earth}></IonIcon>
                        </IonThumbnail>
                        <IonLabel className="m-0">eclo@gmail.com </IonLabel>
                      </IonItem>
                    </IonList>
                  </IonList>
                  <IonCardHeader className="notifile2">
                    <IonCardSubtitle className="colordate">
                      <IonRow>
                        <IonCol className="text1" size="6">
                          January 20, 2015
                        </IonCol>
                      </IonRow>
                    </IonCardSubtitle>
                  </IonCardHeader>
                </IonCardContent>
              </IonCardSubtitle>
            </IonCardContent>
          </IonCard>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
