/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
import IconButton from "@material-ui/core/IconButton";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { connect } from "react-redux";
import { fetchNotifications } from "../../store/actions/notificationActions";
import { deleteNotification } from "../../store/actions/notificationActions";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "16px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  button: {
    color: "rgba(255,255,255)",
    margin: "0",
    fontSize: "18px",
    fontWeight: "400",
    //marginTop: "0px",
    //marginBottom: "0px",
    paddingLeft: "0px",
    paddingRight:"0px",
    paddingTop:"0px",
    paddingBottom:"0px"
  },
};

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false
    };
    props.fetchNotifications()
  }
  // to stop the warning of calling setState of unmounted component
  // componentWillUnmount() {
  //   var id = window.setTimeout(null, 0);
  //   while (id--) {
  //     window.clearTimeout(id);
  //   }
  // }
  // showNotification(place) {
  //   var x = [];
  //   x[place] = true;
  //   this.setState(x);
  //   this.alertTimeout = setTimeout(
  //     function() {
  //       x[place] = false;
  //       this.setState(x);
  //     }.bind(this),
  //     6000
  //   );
  // }
  deleteNotification = (key) => {
    console.log("remove button clicked", key)
    this.props.deleteNotification(key)
  }

  viewNotification = (key) => {
    console.log(key);
    if(this.props.notifications){
      for (let [id, notification] of Object.entries(this.props.notifications)){
        if(id==key){
          let userType = notification.userType;
          let userId = notification.id;
          let type = notification.type;
          this.props.deleteNotification(key)
          if(type=="remove"){
            this.props.history.push("./unregisteredusers")
          }
          else{
            this.props.history.push("./" + userType +"/" + userId)
          }
        }
      }
    }
  }
  render() {
    const { classes } = this.props;
    console.log("props from notifications", this.props)

    if(this.props.notifications){
      var data = []
      // var removedNotifications =[]

      // for(let [key, notification] of Object.entries(this.props.notifications)){
      //   if(notification.type == "remove"){
      //     removedNotifications.push(notification.id)
      //   }
      // }
      for (let [key, notification] of Object.entries(this.props.notifications)){
        if(notification.type != "remove"){
          data.push(
             <SnackbarContent
                id = {key}
                message={
                  <div>
                    {/* {removedNotifications.includes(notification.id) ? (
                      <p>{notification.title + ' : ' + notification.name.toUpperCase()} 
                    </p>
                    ): ( */}
                    <p>{notification.title + ' : ' } 
                    <Button color="transparent" className={classes.button} onClick = {this.viewNotification.bind(this,key)}>
                      {notification.name}
                    </Button>
                    </p>
                    {/* )} */}
                    <p className={classes.cardCategoryWhite}>{ notification.date + ' by ' + notification.user}</p>
                    <br/>
                  </div>
                }
                color={notification.type == "add" ? ("success"): ("info")}
                close
                closeNotification={(key) => this.deleteNotification(key)}
              />
          )
        }
        else {
          data.push(
            <SnackbarContent
               id = {key}
               message={
                 <div>
                   {notification.userType ? (
                     <p>{notification.title + ' : ' }
                      <Button color="transparent" className={classes.button} onClick = {this.viewNotification.bind(this,key)}>
                        {notification.name}
                      </Button>
                     </p>
                   ):(
                     <p>{notification.title + ' : ' + notification.name.toUpperCase()}</p>
                   )}
                   <p className={classes.cardCategoryWhite}>{ notification.date + ' by ' + notification.user}</p>
                   <br/>
                 </div>
               }
               color="danger"
               close
               closeNotification={(key) => this.deleteNotification(key)}
             />
         )
        }
      }
      var notifications = data.reverse()
    }

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>NOTIFICATIONS</h4>
              {/* <p className={classes.cardCategoryWhite}>
                Handcrafted by our friends from{" "}
                <a target="_blank" href="https://material-ui-next.com/">
                  Material UI
                </a>{" "}
                and styled by{" "}
                <a target="_blank" href="https://www.creative-tim.com/">
                  Creative Tim
                </a>
                . Please checkout the{" "}
                <a href="#pablo" target="_blank">
                  full documentation
                </a>
                .
              </p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                {/* <GridItem xs={12} sm={12} md={6}>
                  <h5>Notifications Style</h5>
                  <br />
                  <SnackbarContent message={"This is a plain notification"} />
                  <SnackbarContent
                    message={"This is a notification with close button."}
                    close
                  />
                  <SnackbarContent
                    message={"This is a notification with close button and icon."}
                    close
                    icon={AddAlert}
                  />
                  <SnackbarContent
                    message={
                      "This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style."
                    }
                    close
                    icon={AddAlert}
                  />
                </GridItem> */}
                {/* <GridItem xs={12} sm={12} md={6}>
                  <h5>Notifications States</h5>
                  <br />
                  <SnackbarContent
                    message={
                      'INFO - This is a regular notification made with color="info"'
                    }
                    close
                    color="info"
                  />
                  <SnackbarContent
                    message={
                      'SUCCESS - This is a regular notification made with color="success"'
                    }
                    close
                    color="success"
                  />
                  <SnackbarContent
                    message={
                      'WARNING - This is a regular notification made with color="warning"'
                    }
                    close
                    color="warning"
                  />
                  <SnackbarContent
                    message={
                      'DANGER - This is a regular notification made with color="danger"'
                    }
                    close
                    color="danger"
                  />
                  <SnackbarContent
                    message={
                      'PRIMARY - This is a regular notification made with color="primary"'
                    }
                    close
                    color="primary"
                  />
                </GridItem> */}
              {/* </GridContainer>
              <br />
              <br />
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
                  <h5>
                    Notifications Places
                    <br />
                    <small>Click to view notifications</small>
                  </h5>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10} lg={8}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => this.showNotification("tl")}
                      >
                        Top Left
                      </Button>
                      <Snackbar
                        place="tl"
                        color="info"
                        icon={AddAlert}
                        message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                        open={this.state.tl}
                        closeNotification={() => this.setState({ tl: false })}
                        close
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => this.showNotification("tc")}
                      >
                        Top Center
                      </Button>
                      <Snackbar
                        place="tc"
                        color="info"
                        icon={AddAlert}
                        message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                        open={this.state.tc}
                        closeNotification={() => this.setState({ tc: false })}
                        close
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => this.showNotification("tr")}
                      >
                        Top Right
                      </Button>
                      <Snackbar
                        place="tr"
                        color="info"
                        icon={AddAlert}
                        message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                        open={this.state.tr}
                        closeNotification={() => this.setState({ tr: false })}
                        close
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
              <GridContainer justify={"center"}>
                <GridItem xs={12} sm={12} md={10} lg={8}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => this.showNotification("bl")}
                      >
                        Bottom Left
                      </Button>
                      <Snackbar
                        place="bl"
                        color="info"
                        icon={AddAlert}
                        message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                        open={this.state.bl}
                        closeNotification={() => this.setState({ bl: false })}
                        close
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => this.showNotification("bc")}
                      >
                        Bottom Center
                      </Button>
                      <Snackbar
                        place="bc"
                        color="info"
                        icon={AddAlert}
                        message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                        open={this.state.bc}
                        closeNotification={() => this.setState({ bc: false })}
                        close
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Button
                        fullWidth
                        color="primary"
                        onClick={() => this.showNotification("br")}
                      >
                        Bottom Right
                      </Button>
                      <Snackbar
                        place="br"
                        color="info"
                        icon={AddAlert}
                        message="Welcome to MATERIAL DASHBOARD React - a beautiful freebie for every web developer."
                        open={this.state.br}
                        closeNotification={() => this.setState({ br: false })}
                        close
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem> */}

                <GridItem xs={12} sm={12} md={8}>
                  <div>{notifications}</div>
                </GridItem>

              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications.notifications,
    auth: state.firebase.auth,
    notificationCount: state.notifications.notificationCount
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchNotifications: () => {
      dispatch(fetchNotifications());
    },
    deleteNotification: (key) => {
      dispatch(deleteNotification(key));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Notifications));