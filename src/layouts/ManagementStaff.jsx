/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "../staffRouts";

import AddWorker from "../views/Worker/AddWorker"
import ViewWorker from "../views/Worker/ViewWorker"
import EditWorker from "../views/Worker/EditWorker"
import WorkerReport from "../views/Reports/WorkerReport"
import CompletedTasksExtended from "../views/Worker/CompletedTasksExtended"
import WorkerMonthlyReportList from "../views/Worker/MonthlyReports"
import WorkerMonthlyReport from "../views/Reports/WorkerMonthlyReport"

import AddSupervisor from "../views/Supervisor/AddSupervisor"
import ViewSupervisor from "../views/Supervisor/ViewSupervisor"
import EditSupervisor from "../views/Supervisor/EditSupervisor"
import SupervisorReport from "../views/Reports/SupervisorReport"
import SupervisorCompletedTasksExtended from "../views/Supervisor/CompletedTasksExtended"
import SupervisorMonthlyReportList from "../views/Supervisor/MonthlyReports"
import SupervisorMonthlyReport from "../views/Reports/SupervisorMonthlyReport"

import ViewTask from "../views/Tasks/ViewTask"
import TaskReport from "../views/Reports/TaskReport"

import AddMachine from "../views/Machines/AddMachine"
import ViewMachine from "../views/Machines/ViewMachine"
import EditMachine from "../views/Machines/EditMachine"

import EditUserProfile from "../views/UserProfile/EditUserProfile";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-5.jpg";
import logo from "assets/img/cbl.png";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/managementstaff") {
        return (
          <Route
            exact path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
    <Route exact path="/managementstaff/workers/add" component={AddWorker} />
    <Route exact path = "/managementstaff/workers/:worker_id" component = {ViewWorker}/>
    <Route exact path = "/managementstaff/workers/completedtasks/:worker_id" component = {CompletedTasksExtended}/>
    <Route exact path = "/managementstaff/workers/edit/:worker_id" component = {EditWorker}/>
    <Route exact path = "/managementstaff/workers/report/:worker_id" component = {WorkerReport}/>
    <Route exact path = "/managementstaff/workers/monthlyreport/:worker_id" component = {WorkerMonthlyReportList}/>
    <Route exact path = "/managementstaff/workers/monthlyreport/:worker_id/:date" component = {WorkerMonthlyReport}/>

    <Route exact path="/managementstaff/supervisors/add" component={AddSupervisor} />
    <Route exact path = "/managementstaff/supervisors/:supervisor_id" component = {ViewSupervisor}/>
    <Route exact path = "/managementstaff/supervisors/completedtasks/:supervisor_id" component = {SupervisorCompletedTasksExtended}/>
    <Route exact path = "/managementstaff/supervisors/edit/:supervisor_id" component = {EditSupervisor}/>
    <Route exact path = "/managementstaff/supervisors/report/:supervisor_id" component = {SupervisorReport}/>
    <Route exact path = "/managementstaff/supervisors/monthlyreport/:supervisor_id" component = {SupervisorMonthlyReportList}/>
    <Route exact path = "/managementstaff/supervisors/monthlyreport/:supervisor_id/:date" component = {SupervisorMonthlyReport}/>

    <Route exact path = "/managementstaff/tasks/:task_id" component = {ViewTask}/>
    <Route exact path = "/managementstaff/tasks/report/:task_id" component = {TaskReport}/>

    <Route exact path="/managementstaff/machines/add" component={AddMachine} />
    <Route exact path = "/managementstaff/machines/:machine_id" component = {ViewMachine}/>
    <Route exact path = "/managementstaff/machines/edit/:machine_id" component = {EditMachine}/>

    <Route exact path = "/managementstaff/user/edit" component = {EditUserProfile}/>
  </Switch>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false
    };
  }
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/admin/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
    //   const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      // this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, auth, ...rest } = this.props;
    if(!auth.uid || this.props.userType=="departmentHead") return <Redirect to='/signin'/>
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"TSEMS-CBL-DOE"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
          {/* <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          /> */}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
  return{
    auth:state.firebase.auth,
    userType: state.auth.userType
  }
}
export default connect(mapStateToProps)(withStyles(dashboardStyle)(Dashboard));
