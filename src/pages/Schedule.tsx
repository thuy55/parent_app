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
  IonBackButton,
} from "@ionic/react";
// import { useParams } from 'react-router';
// import ExploreContainer from '../components/ExploreContainer';
import "./Schedule.css";
import {
  IonItem,
  IonLabel,
  IonCol,
  IonGrid,
  IonRow,
  IonAvatar,
} from "@ionic/react";
// import { IonList, IonSelect, IonSelectOption, IonIcon, IonThumbnail } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
const { localStorage } = window;

// import Menu from '../components/Menu';

const Schedule: React.FC = () => {
  const [schedule, setSchedule] = useState([] as any[]);
  const [student, setStudent] = useState([] as any[]);
  useEffect(() => {
      const api = axios.create({
        baseURL: "https://school.hewo.vn/api",
      });
      const api2 = axios.create({
          baseURL: "https://school.hewo.vn/api",
        });
      var x = localStorage.getItem("token");
  
      var id = localStorage.getItem("id_student");
      // var idNo = localStorage.getItem("idNo");
      const loginData = {
        token: x,
        id_student: id,
      };
      api2
      .post(`/students/` + id, loginData)
      .then((res) => {
        if (res.data.status == "success") {
          setStudent(res.data.content);
          console.log(res.data.content);
          
        }
      })
      .catch((error) => {});
      api
        .post(`/schedule/` + id, loginData)
        .then((res) => {
          if (res.data.status == "success") {
            setSchedule(res.data.content);
          }
        })
        .catch((error) => {});
    }, []);
    function handleItemClick(event: any) {
      const itemId = event.target.id;
      localStorage.removeItem("id_schedule");
      localStorage.setItem("id_schedule", itemId);
  
      // Lưu itemId vào state hoặc thực hiện các xử lý khác tùy vào nhu cầu của bạn
    }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Thời khóa biểu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="container">
        <IonCard className="card-home mt-3 mb-0">
          <IonCardContent className="card-content">
            <IonGrid>
              <IonRow className="row">
                <IonCol>
                  <IonLabel className="lable-name">Họ và tên :</IonLabel>
                </IonCol>
                <IonCol className="tt" size="7">
                {student.map((student, key) => {
                      return (
                  <h5>{student.firstname}{student.lastname}</h5>
                  );
              })}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
       
        <div className="justify-content-center d-flex mt-4 ">
          <ul>
          {schedule.map((schedule, key) => {
              // console.log(schedule.name);
              
           if (schedule.name =="Thứ 2"|| schedule.name =="Thứ 4" || schedule.name =="Thứ 6"){
          return (
            <li className="bg1 li">
              <Link to="/scheduleDetail">
                <button onClick={handleItemClick}
                key={schedule.id}
                id={schedule.id} type="button" className="w-100 h-100 bg text-start text-white">
                  {schedule.name}
                </button>
              </Link>
            </li>
            );}
           
             else if (schedule.name =="Chủ nhật"){
                  return (
                      <li className="mt-3 bg3 li">
              <Link to="/scheduleDetail">
                <button type="button" 
                onClick={handleItemClick}
                key={schedule.id}
                id={schedule.id} 
                className="w-100 bgcn h-100 bg text-start text-white">
                  Chủ nhật
                </button>
              </Link>
            </li>
                    );}
            else{
              return (
              <li className="mt-3 bg2 li">
                  <Link to="/scheduleDetail">
                      <button type="button" 
                      onClick={handleItemClick}
                      key={schedule.id}
                      id={schedule.id}
                      className="w-100 h-100 bgr text-end text-white">
                      {schedule.name}
                      </button>
                  </Link>
              </li>
              );
            }
        })}
            
          </ul>
        </div>
      
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
