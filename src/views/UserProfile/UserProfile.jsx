import React, { Component } from "react";
import { Redirect,Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import avatar from "assets/img/faces/default.jpg";

import { connect } from "react-redux";

import { getUserType } from "../../store/actions/authActions";
import { fetchUserData } from "../../store/actions/authActions";
import { resetPassword } from "../../store/actions/authActions";
import { setResetPasswordState } from "../../store/actions/authActions";
import { resetEmail } from "../../store/actions/authActions";
import { setResetEmailState } from "../../store/actions/authActions";
import { uploadProfilePhoto } from "../../store/actions/authActions";
import { removeProfilePhoto } from "../../store/actions/authActions";
import { setUploadPhotoState } from "../../store/actions/authActions";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardCategoryBlack: {
    color: "rgba(0,0,0)",
    margin: "0",
    fontSize: "18px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardCategoryRed: {
    color: "rgba(255,0,0,.62)",
    margin: "0",
    fontSize: "20px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends Component {
  state = {
    openPassword: false,
    openEmail: false,
    openPhoto: false,
    fullWidth: true,
    maxWidth: "sm",
  };
  constructor(props) {
    super(props)
    props.fetchUserData(props.auth.uid);
  } 
  componentWillReceiveProps(nextProps) {
    if (nextProps.user != this.props.user) {
      this.setState({ ... nextProps.user, ...this.state });
    }
  }
  componentWillMount() {
    this.props.getUserType(this.props.auth.uid)
    this.props.fetchUserData(this.props.auth.uid);
    this.setState({ ...this.props.user, ...this.state });
  }

  handleClickOpenPassword = e => {
    e.preventDefault();
    this.setState({
      openPassword: true
    });
  };

  handleClickOpenEmail = e => {
    e.preventDefault();
    this.setState({
      openEmail: true
    });
  };

  handleClickOpenPhoto = e => {
    e.preventDefault();
    this.setState({
      openPhoto: true
    });
  };

  handleClose = e => {
    this.setState({
      openPassword: false,
      openEmail: false,
      openPhoto: false,
      currentPassword: "",
      newPassword:"",
      newEmail: ""
    });
    this.props.setResetPasswordState();
    this.props.setResetEmailState();
    this.props.setUploadPhotoState();
  };

  handleResetPassword = e => {
    e.preventDefault();
    this.props.resetPassword(this.state.currentPassword, this.state.newPassword);
  };

  handleResetEmail = e => {
    e.preventDefault();
    this.props.resetEmail(this.props.userType,this.state.currentPassword, this.state.newEmail);
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleCapture = e => {
    if(e.target.files[0]){
      const photo = e.target.files[0];
      this.setState({
        photo:photo
      })
    }
  }

  handleUpload = e => {
    e.preventDefault()
    this.props.uploadProfilePhoto(this.props.auth.uid, this.props.userType, this.state.photo)
  }

  handleDelete = e => {
    e.preventDefault()
    this.props.removeProfilePhoto(this.props.auth.uid, this.props.userType)
  }
  componentWillUnmount(){
    this.props.setResetPasswordState()
    this.props.setResetEmailState()
    this.props.setUploadPhotoState()
  }
  render() {
    const { classes } = this.props;

    if (this.props.resetPasswordError == "success" || this.props.resetEmailError == "success" || this.props.uploadPhotoError == "success") this.handleClose();

    const user = this.props.user ? (
       <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card profile>
              <CardAvatar profile>
                  {this.props.user.profilePictureURL ? (
                    <img src={this.props.user.profilePictureURL} alt="..." />
                  ): (
                    <img src={avatar} alt="..." />
                  )}
              </CardAvatar>
              <CardBody profile>
                {this.props.userType == "departmentHead" ? (
                  <h6 className={classes.cardCategory}>Department Head</h6>
                ) : (
                  <h6 className={classes.cardCategory}>Management Staff</h6>
                )}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="First Name"
                      id="firstName"
                      type="text"
                      value={this.props.user.firstName}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Last Name"
                      id="lastName"
                      type="text"
                      value={this.props.user.lastName}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      type="email"
                      value={this.props.user.email}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
                    <CustomInput
                      labelText="Contact Number"
                      id="contactNumber"
                      type="text"
                      value={this.props.user.contactNumber}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        readOnly: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <br/>
                <br/>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <Link to={"./user/edit"}>
                      <Button color="info" round>
                        Edit Profile
                      </Button>
                    </Link>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button onClick={this.handleClickOpenPhoto} color="info" round>Change Profile Photo</Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button onClick={this.handleClickOpenEmail} color="info" round>Change Email</Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button onClick={this.handleClickOpenPassword} color="info" round>Change Password</Button>
                  </GridItem>
                </GridContainer>             
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.openPassword}
          onClose={this.handleClose}
          className={classes.dialog}
          id="changePassword"
        >
        <form onSubmit={this.handleResetPassword}>
          <DialogContent>
              <GridContainer>
              {this.props.resetPasswordError ? (
                <p className={classes.cardCategoryRed}>
                  Error: {this.props.resetPasswordError}
                </p>
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
                  value={this.props.user.email}
                  handleChange={this.handleChange}
                  formControlProps={{
                  fullWidth: true
                  }}
                  inputProps={{
                  disabled: true
                  }}
              />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                  labelText="Current Password"
                  id="currentPassword"
                  type="password"
                  value={this.state.currentPassword}
                  handleChange={this.handleChange}
                  formControlProps={{
                  fullWidth: true
                  }}
              />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                  labelText="New Password"
                  id="newPassword"
                  type="password"
                  value={this.state.newPassword}
                  handleChange={this.handleChange}
                  formControlProps={{
                  fullWidth: true
                  }}
              />
              </GridItem>
              </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="success" size="sm">
              Reset
            </Button>
            <Button onClick={this.handleClose} color="transparent" size="sm">
              Cancel
            </Button>
          </DialogActions>
          </form>
        </Dialog>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.openEmail}
          onClose={this.handleClose}
          className={classes.dialog}
          id="changeEmail"
        >
        <form onSubmit={this.handleResetEmail}>
          <DialogContent>
              <GridContainer>
              {this.props.resetEmailError ? (
                <p className={classes.cardCategoryRed}>
                  Error: {this.props.resetEmailError}
                </p>
              ):(
                <h4 className={classes.cardCategoryBlack}>
                  RESET EMAIL
                </h4>
              )}
              <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                  labelText="Email"
                  id="email"
                  type="email"
                  value={this.props.user.email}
                  handleChange={this.handleChange}
                  formControlProps={{
                  fullWidth: true
                  }}
                  inputProps={{
                  disabled: true
                  }}
              />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                  labelText="Password"
                  id="currentPassword"
                  type="password"
                  value={this.state.currentPassword}
                  handleChange={this.handleChange}
                  formControlProps={{
                  fullWidth: true
                  }}
              />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                  labelText="New Email"
                  id="newEmail"
                  type="text"
                  value={this.state.newEmail}
                  handleChange={this.handleChange}
                  formControlProps={{
                  fullWidth: true
                  }}
              />
              </GridItem>
              </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="success" size="sm">
              Reset
            </Button>
            <Button onClick={this.handleClose} color="transparent" size="sm">
              Cancel
            </Button>
          </DialogActions>
          </form>
        </Dialog>
        <Dialog
          open={this.state.openPhoto}
          onClose={this.handleClose}
          className={classes.dialog}
          id="changePhoto"
        >
        <form onSubmit={this.handleUpload}>
          <DialogContent>
              <GridContainer>
              {this.props.uploadPhotoError ? (
                <p className={classes.cardCategoryRed}>
                  Error: {this.props.uploadPhotoError}
                </p>
              ):(
                <h4 className={classes.cardCategoryBlack}>
                  CHANGE PROFILE PHOTO
                </h4>
              )}
              <GridItem xs={12} sm={12} md={12}>
                <center>
                <label htmlFor="icon-button-photo">
                  <IconButton color="primary" component="span">
                      <PhotoCamera /> 
                  </IconButton>
                </label>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-photo"
                    onChange={this.handleCapture}
                    type="file"
                    required
                />
                </center>
              </GridItem>
              </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete} color="danger" size="sm">
              Remove
            </Button>
            <Button type="submit" color="success" size="sm">
              Change
            </Button>
            <Button onClick={this.handleClose} color="transparent" size="sm">
              Cancel
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
    ) : (
      <div>loading....</div>
    )
    return <div>{user}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    userType: state.auth.userType,
    user: state.auth.user,
    resetPasswordError: state.auth.resetPasswordError,
    resetEmailError: state.auth.resetEmailError,
    uploadPhotoError: state.auth.uploadPhotoError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserType: (uid) => {
      dispatch(getUserType(uid))
    },
    fetchUserData: (uid) => {
      dispatch(fetchUserData(uid));
    },
    resetPassword: (currentPassword, newPassword) => {
      dispatch(resetPassword(currentPassword, newPassword))
    },
    setResetPasswordState: () => {
      dispatch(setResetPasswordState())
    },
    resetEmail: (userType,currentPassword, newEmail) => {
      dispatch(resetEmail(userType,currentPassword, newEmail))
    },
    setResetEmailState: () => {
      dispatch(setResetEmailState())
    },
    uploadProfilePhoto: (uid,userType,photo) => {
      dispatch(uploadProfilePhoto(uid,userType,photo))
    },
    removeProfilePhoto: (uid,userType) => {
      dispatch(removeProfilePhoto(uid,userType))
    },
    setUploadPhotoState: () => {
      dispatch(setUploadPhotoState())
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UserProfile));
