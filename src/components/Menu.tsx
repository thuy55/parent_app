import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRow,
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { getToken, removeUserSession, setUserSession } from "../pages/Common";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  homeOutline,
  homeSharp,
  alarmOutline,
  alarmSharp,
  layersOutline,
  layersSharp,
  backspaceOutline,
  backspaceSharp,
  schoolOutline,
  schoolSharp,
  busOutline,
  busSharp,
  notificationsOutline,
  notificationsSharp,
  personCircleOutline,
  personCircleSharp,
  gitCompareOutline,
  gitBranchSharp,
  checkmarkCircleOutline,
  checkmarkCircleSharp,
} from "ionicons/icons";
import "./Menu.css";
import {
  createOutline,
  createSharp,
  fitnessOutline,
  fitnessSharp,
  calendarOutline,
  calendarSharp,
  brushOutline,
  brushSharp,
  peopleOutline,
  peopleSharp,
  personOutline,
  personSharp,
  printOutline,
  printSharp,
  calculatorOutline,
  calculatorSharp,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import axios from "axios";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Trang chủ",
    url: "/dashboard",
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: "Nhật ký điểm danh",
    url: "/attendanceDiary",
    iosIcon: alarmOutline,
    mdIcon: alarmSharp,
  },
  {
    title: "Kết quả học tập",
    url: "/scores",
    iosIcon: brushOutline,
    mdIcon: brushSharp,
  },
  {
    title: "Thời khóa biểu",
    url: "/schedule",
    iosIcon: calendarOutline,
    mdIcon: calendarSharp,
  },
  {
    title: "Thực đơn",
    url: "/meals",
    iosIcon: layersOutline,
    mdIcon: layersSharp,
  },
  {
    title: "Xin nghỉ phép",
    url: "/leave",
    iosIcon: backspaceOutline,
    mdIcon: backspaceSharp,
  },
  {
    title: "Hồ sơ sức khỏe",
    url: "/healthRecord",
    iosIcon: fitnessOutline,
    mdIcon: fitnessSharp,
  },
  {
    title: "Hoạt động trường",
    url: "/news",
    iosIcon: schoolOutline,
    mdIcon: schoolSharp,
  },

  {
    title: "Hồ sơ học sinh",
    url: "/Profile",
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp,
  },

  {
    title: "Danh sách giáo viên",
    url: "/Teacher",
    iosIcon: peopleOutline,
    mdIcon: peopleSharp,
  },
  {
    title: "Thông tin tài khoản",
    url: "/Account",
    iosIcon: personOutline,
    mdIcon: personSharp,
  },
  {
    title: "Tra cứu công nợ",
    url: "/Debt",
    iosIcon: printOutline,
    mdIcon: printSharp,
  },
  {
    title: "Sổ thu chi",
    url: "/Cash",
    iosIcon: calculatorOutline,
    mdIcon: calculatorSharp,
  },
  {
    title: "Đăng ký đưa đón",
    url: "/RegisterMove",
    iosIcon: checkmarkCircleOutline,
    mdIcon: checkmarkCircleSharp,
  },
  {
    title: "Đưa đón học sinh",
    url: "/Move",
    iosIcon: busOutline,
    mdIcon: busSharp,
  },

  {
    title: "Đóng góp ý kiến",
    url: "/opinion",
    iosIcon: createOutline,
    mdIcon: createSharp,
  },
  {
    title: "Thông báo",
    url: "/notifications",
    iosIcon: notificationsOutline,
    mdIcon: notificationsSharp,
  },
  {
    title: "Thông báo giáo viên",
    url: "/notificationTeacher",
    iosIcon: notificationsOutline,
    mdIcon: notificationsSharp,
  },
  {
    title: "Phụ huynh thông báo",
    url: "/notificationParent",
    iosIcon: notificationsOutline,
    mdIcon: notificationsSharp,
  },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const removeUserSession = () => {
      localStorage.removeItem('token');
    }
  const handleLogout = () => {
    removeUserSession();
    window.location.href = "/";
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

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {paren.map((paren, key) => {
            return (
              <>
                <IonListHeader>{paren.name}</IonListHeader>
                <IonNote>SĐT: {paren.phone_number}</IonNote>
              </>
            );
          })}

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <Link to={appPage.url} style={{ textDecoration: "none" }}>
                  <IonItem
                    className={
                      location.pathname === appPage.url ? "selected" : ""
                    }
                    // routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon
                      aria-hidden="true"
                      slot="start"
                      ios={appPage.iosIcon}
                      md={appPage.mdIcon}
                    />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </Link>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonRow className="justify-content-center mt-4 d-flex">
          {/* <IonButton className='w-50'  color="dark">ĐĂNG XUẤT</IonButton> */}
          <input
            type="button"
            className="w-50 bg-danger text-white p-2 fw-bold rounded-3"
            onClick={handleLogout}
            value="ĐĂNG XUẤT"
          />
        </IonRow>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
