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
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Workers from "views/Worker/ViewWorkers.jsx";
import Supervisors from "views/Supervisor/ViewSupervisors.jsx";
import ManagementStaffs from "views/ManagementStaff/ViewManagementStaffs.jsx";
import Tasks from "views/Tasks/ViewTasks.jsx"
import Machines from "views/Machines/ViewMachines.jsx";
import UnregisteredUsers from "views/UnregisteredUsers/UnregisteredUsers.jsx";

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
    layout: "/admin"
  },
  {
    path: "/workers",
    name: "Workers",
    rtlName: "قائمة الجدول",
    icon: SupervisorAccount,
    component: Workers,
    layout: "/admin"
  },
  {
    path: "/supervisors",
    name: "Supervisors",
    rtlName: "طباعة",
    icon: GroupIcon,
    component: Supervisors,
    layout: "/admin"
  },
  {
    path: "/staff",
    name: "Management Staff",
    rtlName: "الرموز",
    icon: SupervisedUserCircleIcon,
    component: ManagementStaffs,
    layout: "/admin"
  },
  {
    path: "/tasks",
    name: "Tasks",
    rtlName: "الرموز",
    icon: AssignmentIcon,
    component: Tasks,
    layout: "/admin"
  },
  {
    path: "/machines",
    name: "Machines",
    rtlName: "طباعة",
    icon: SettingsApplicationsIcon,
    component: Machines,
    layout: "/admin"
  },
  {
    path: "/unregisteredusers",
    name: "Unregistered Users",
    rtlName: "قائمة الجدول",
    icon: SupervisorAccount,
    component: UnregisteredUsers,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: User,
    component: UserProfile,
    layout: "/admin"
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/logout",
    name: "LOGOUT",
    rtlName: "التطور للاحترافية",
    icon: ExitToAppIcon,
    component: UpgradeToPro,
    layout: "/admin"
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
