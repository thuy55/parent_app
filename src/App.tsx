import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact,  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Leave from './pages/Leave';
import Home from './pages/Home';
import News_open from './pages/News_open';
import Profile from './pages/Profile';
import Profile_mom from './pages/Profile_mom';
import Profile_dad from './pages/Profile_dad';
import {useState, useEffect} from 'react';
import Move from './pages/Move';
// import PrivateRoute from './pages/PrivateRoute';
// import PublicRoute from './pages/PublicRoute';
// import { getToken, removeUserSession , setUserSession } from './pages/Common';

import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

import HealthRecord from './pages/HealthRecord';
import Opinion from './pages/Opinion';
import OpinionDetail from './pages/OpinionDetail';
import Scores from './pages/Scores';
import Teacher from './pages/teacher';
import Account from './pages/Account';
import Debt from './pages/Debt';
import Cash from './pages/Cash';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import ScheduleDetail from './pages/ScheduleDetail';
import ProfileDriver from './pages/ProfileDriver';
import RegisterMove from './pages/RegisterMove';

import AttendanceDiary from './pages/AttendanceDiary';
import Meals from './pages/Meals';
import MealsDetail from './pages/MealsDetail';
import Notifications from './pages/Notifications';
import NotificationDetail from './pages/NotificationDetail';
import NotificationTeacher from './pages/NotificationTeacher';

import NotificationTeacherDeatail from './pages/NotificationTeacherDetail';
import NotificationParent from './pages/NotificationParent';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import OneSignal from 'onesignal-cordova-plugin';

setupIonicReact();

const App: React.FC = () => {
  const OneSignalInit=()=>{
    const token=  localStorage.getItem("token");
    if(token){

    //const deviceId = OneSignal.getDeviceId();
   // OneSignal.setExternalUserId(deviceId);

    OneSignal.setAppId("c0bd1290-a222-4a69-b48f-e1a756d3e1b6");
    OneSignal.setNotificationOpenedHandler(function(jsonData: any) {
      console.log('notification log:',jsonData);
      
    });
  }
   
  };
   const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const getToken = () => {
        return localStorage.getItem('token') || null;
      }
    const token = getToken();
    if (!token) {
      return;
    }
    else {
      setAuthLoading(false);
    }
  }, []);
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route exact path="/">
               <Redirect to="/Welcome" />
            </Route>
            <Route path="/leave" exact={true}>
              <Leave />
            </Route>
            <Route path="/Profile" exact={true}>
              <Profile />
            </Route>
            <Route path="/news" exact={true}>
             <Home />
            </Route>
            <Route path="/News_open" exact={true}>
             <News_open />
            </Route>
            <Route path="/Move" exact={true}>
             <Move/>
            </Route>
            <Route path="/NotificationTeacherDeatail" exact={true}>
             <NotificationTeacherDeatail/>
            </Route>
            
            <Route path="/Profile_mom" exact={true}>
             <Profile_mom />
            </Route>
            <Route path="/Profile_dad" exact={true}>
             <Profile_dad />
            </Route>
            <Route path="/notificationTeacher" exact={true}>
             <NotificationTeacher />
            </Route>
            <Route path="/notificationParent" exact={true}>
             <NotificationParent />
            </Route>
            <Route path="/ProfileDriver" exact={true}>
             <ProfileDriver />
            </Route>
            <Route path="/RegisterMove" exact={true}>
             <RegisterMove />
            </Route>
            


            {/* Thúy */}
            <Route path="/dashboard" exact={true}>
              <Dashboard />
            </Route>
            <Route path="/schedule" exact={true}>
              <Schedule />
            </Route>
            <Route path="/healthRecord" exact={true}>
              <HealthRecord />
            </Route>
            <Route path="/scheduleDetail" exact={true}>
              <ScheduleDetail />
            </Route>
            <Route path="/opinion" exact={true}>
              <Opinion />
            </Route>
            <Route path="/opinionDetail" exact={true}>
              <OpinionDetail />
            </Route>
            <Route path="/scores" exact={true}>
              <Scores />
            </Route>
            <Route path="/teacher" exact={true}>
              <Teacher />
            </Route>
            <Route path="/Account" exact={true}>
              <Account />
            </Route>
            <Route path="/Debt" exact={true}>
              <Debt />
            </Route>
            <Route path="/Cash" exact={true}>
              <Cash />
            </Route>


            {/* Thọ */}
            <Route path="/notificationDetail" exact={true}>
              <NotificationDetail />
            </Route>
            <Route path="/notifications" exact={true}>
              <Notifications />
            </Route>
            <Route path="/meals" exact={true}>
              <Meals />
            </Route>
            <Route path="/mealsDetail" exact={true}>
              <MealsDetail />
            </Route>
            <Route path="/attendancediary" exact={true}>
              <AttendanceDiary />
            </Route>

            <Route  path="/Welcome"  exact={true} >
              <Welcome />
            </Route>
              <Route path="/Register"  exact={true} >
                <Register />
              </Route>
              <Route  path="/Login"  exact={true} >
                <Login />
              </Route>
              <Route  path="/Forgot-Password" exact={true} >
                <ForgotPassword />
              </Route>
              {/* <PrivateRoute exact path="/Home" component={Home} /> */}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
