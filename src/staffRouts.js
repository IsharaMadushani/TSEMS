// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import User from "@material-ui/icons/AccountCircle";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import GroupIcon from "@material-ui/icons/Group";
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Workers from "views/Worker/ViewWorkers.jsx";
import Supervisors from "views/Supervisor/ViewSupervisors.jsx";
import Tasks from "views/Tasks/ViewTasks.jsx"
import Machines from "views/Machines/ViewMachines.jsx";

import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/managementstaff"
  },
  {
    path: "/workers",
    name: "Workers",
    rtlName: "قائمة الجدول",
    icon: SupervisorAccount,
    component: Workers,
    layout: "/managementstaff"
  },
  {
    path: "/supervisors",
    name: "Supervisors",
    rtlName: "طباعة",
    icon: GroupIcon,
    component: Supervisors,
    layout: "/managementstaff"
  },
  {
    path: "/tasks",
    name: "Tasks",
    rtlName: "الرموز",
    icon: AssignmentIcon,
    component: Tasks,
    layout: "/managementstaff"
  },
  {
    path: "/machines",
    name: "Machines",
    rtlName: "طباعة",
    icon: SettingsApplicationsIcon,
    component: Machines,
    layout: "/managementstaff"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: User,
    component: UserProfile,
    layout: "/managementstaff"
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/managementstaff"
  // },
  {
    path: "/logout",
    name: "LOGOUT",
    rtlName: "التطور للاحترافية",
    icon: ExitToAppIcon,
    component: UpgradeToPro,
    layout: "/managementstaff"
  }
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // }
];

export default dashboardRoutes;
