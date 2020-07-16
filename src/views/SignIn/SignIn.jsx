import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import {forgotPassword  } from "../../store/actions/authActions";
import { setForgotPasswordState} from "../../store/actions/authActions";
import { getUserType } from "../../store/actions/authActions";


import avatar from "assets/img/logo.png";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "30px",
    fontWeight: "400",
    marginTop: "30px",
    marginBottom: "0"
  },
  cardCategoryRed: {
    color: "rgba(255,0,0,.62)",
    margin: "0",
    fontSize: "30px",
    fontWeight: "400",
    marginTop: "30px",
    marginBottom: "0"
  },
  link: {
    color: "#FFFFFF",
    margin: "0",
    marginBottom: "50px",
    fontSize: "18px",
    fontWeight: "100",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontSize: "38px",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  button: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "18px",
    fontWeight: "400",
    marginTop: "30px",
    marginBottom: "20px",
    paddingLeft: "100px",
    paddingRight:"100px"
  },
  title: {
    color: "#FFFFFF",
    marginTop: "0px",
    marginBottom: "40px",
    minHeight: "auto",
    fontSize: "40px",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: "none",
    textAlign: "center"
  },
  container: {
    // minHeight: "100%",
    paddingTop: "10%",
    paddingBottom: "50%",
    // background: "rgba(0,0,0,0.9)",
    backgroundImage: "linear-gradient(#0f1e33, #000000, #000000)"
  }
};

class AddWorker extends Component {
  constructor(props) {
    super(props);
    props.getUserType(props.auth.uid);
  }
  state = {
    email: "",
    password: "",
    open: false,
    fullWidth: true,
    maxWidth: "sm",
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  handleClickOpen = e => {
    e.preventDefault();
    this.setState({
      email:"",
      open: true
    });
  };

  handleClose = e => {
    this.setState({
      open: false,
      email: ""
    });
    this.props.setForgotPasswordState()
  };

  handleForgotPassword = e => {
    e.preventDefault();
    this.props.forgotPassword(this.state.email)
  }

  render() {
    
    const { classes, authError, auth } = this.props;
    if (auth.uid && this.props.userType=="managementStaff") return <Redirect to="/managementstaff/dashboard" />;
    if (auth.uid && this.props.userType=="departmentHead") return <Redirect to="/admin/dashboard" />;
    return (
      <div className={classes.container}>
        <GridContainer>
          {/* <h4 className={classes.title}>CBL - ENGINEERING DEPARTMENT</h4> */}
          {/* <Card profile> */}
            <GridItem xs={12} sm={12} md={5}>
              <CardAvatar profile>
                  <img src={avatar} alt="..." />
              </CardAvatar>
            </GridItem>      
            {/* </Card> */}
        </GridContainer>
        <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
              <h4 className={classes.title}>DEPARTMENT OF ENGINEERING</h4>
              <hr/>
            </GridItem> 
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            <GridItem xs={12} sm={12} md={12}>
              {/* <h4 className={classes.cardTitleWhite}>LOGIN</h4> */}
              {authError ? (
                <p className={classes.cardCategoryRed}><b>{authError}</b></p>
              ) : (
                <p className={classes.cardCategoryWhite}>
                  Enter Login Credentials
                </p>
              )}
              {/* <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>LOGIN</h4>
                  {authError ? (
                    <p className={classes.cardCategoryRed}><b>{authError}</b></p>
                  ) : (
                    <p className={classes.cardCategoryWhite}>
                      Enter Login Credentials
                    </p>
                  )}
                </CardHeader> */}
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  {/* <CardBody> */}
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Email"
                          id="email"
                          type="email"
                          handleChange={this.handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                          style={{
                            color: "white"
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Password"
                          id="password"
                          type="password"
                          handleChange={this.handleChange}
                          formControlProps={{
                            fullWidth: true
                          }}
                          style={{
                            color: "white"
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  {/* </CardBody>
                  <CardFooter> */}
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <center>
                      <Button type="submit" color="info" className={classes.button} round>
                        LOGIN
                      </Button>
                      </center>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <center>
                      <a href="" onClick={this.handleClickOpen} className={classes.link}>Forgot Password?</a>
                      </center>
                    </GridItem>
                  </GridContainer>
                  {/* </CardFooter> */}
                </form>
              {/* </Card> */}
            </GridItem>
          </GridItem>
        </GridContainer>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.dialog}
          id="changeEmail"
        >
        <form onSubmit={this.handleForgotPassword}>
          <DialogContent>
              <GridContainer>
              {/* <h4 className={classes.cardCategoryBlack}>
                RESET PASSWORD
              </h4> */}
              {this.props.forgotPasswordError ? (
                this.props.forgotPasswordError == "success" ? (
                  <p className={classes.cardCategoryBlack}>
                    Password reset link has been sent to your email. Follow the link to reset password.
                  </p>
                ):(
                  <p className={classes.cardCategoryRed}>
                    Error: {this.props.forgotPasswordError}
                  </p>
                )
              ):(
                <h4 className={classes.cardCategoryBlack}>
                  RESET PASSWORD
                </h4>
              )}
              <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                  labelText="Email"
                  id="email"
                  type="email"
                  value={this.state.email}
                  handleChange={this.handleChange}
                  formControlProps={{
                  fullWidth: true
                  }}
              />
              </GridItem>
              </GridContainer>
          </DialogContent>
          <DialogActions>
            {this.props.forgotPasswordError == "success" ? (
              <Button onClick={this.handleClose} color="transparent" size="sm">
                OK
              </Button>
            ): (
              <div>
                <Button type="submit" color="success" size="sm">
                  Reset
                </Button>
                <Button onClick={this.handleClose} color="transparent" size="sm">
                  Cancel
                </Button>
              </div>
            )}
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    signedIn: state.auth.signedIn,
    userType: state.auth.userType,
    forgotPasswordError: state.auth.forgotPasswordError
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
    getUserType: uid => dispatch(getUserType(uid)),
    forgotPassword: email => dispatch(forgotPassword(email)),
    setForgotPasswordState: () => dispatch(setForgotPasswordState())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddWorker));
