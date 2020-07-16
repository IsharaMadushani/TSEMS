import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from '@material-ui/core/Tooltip';

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSupervisor } from "../../store/actions/supervisorActions";
import {editSupervisor} from '../../store/actions/supervisorActions';
import { fetchUserData } from "../../store/actions/authActions";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

//styles for error tooltip
const ErrorTooltip = withStyles({
  tooltip: {
    fontSize: "15px",
    color: "#000000",
    backgroundColor: "#ff9999",
  }
})(Tooltip);

class EditSupervisor extends Component {
  state = {
    open: false, //dialog box state
    tooltipOpen: false //tooltip state
  };

  //open dialog box
  handleClickOpen = e => {
    e.preventDefault();
    //if contact number is valid open dialog box to confirm edits
    if(this.state.contactNumber.match(/^[0][7][0-9]{8}$/)){
      this.setState({
        open: true
      });
    }
    //if contact number is not valid show error tooltip
    else{
      this.setState({
        tooltipOpen:true
      })
    }
  };

  //close dialog box
  handleClose = e => {
    this.setState({
      open: false
    });
  };

  //close tooltip
  handleTooltipClose = () => {
    this.setState({
      tooltipOpen:false
    })
  };

  constructor(props) {
    super(props)
    props.fetchSupervisor(props.id);
    props.fetchUserData(props.auth.uid); //get current user data to set notification
  } 

  //update state with new props
  componentWillReceiveProps(nextProps) {
    if (nextProps.supervisor != this.props.supervisor) {
      this.setState({ ... nextProps.supervisor, ...this.state });
    }
  }

  componentWillMount() {
    this.props.fetchSupervisor(this.props.id);
    this.setState ({...this.props.supervisor, ...this.state})
  }
  
  handleEdit = e => {
    e.preventDefault();
    let supervisor = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      contactNumber: this.state.contactNumber
    }
    let supervisorName = this.props.supervisor.firstName + " " + this.props.supervisor.lastName;
    this.props.editSupervisor(this.props.id, supervisor, this.props.user, this.props.auth.uid,supervisorName);
    this.props.history.push("../" + this.props.id);
  };

  //update state when input fields change
  handleChange = e => {
    //close tooltip when typing in input fields
    this.setState({
      tooltipOpen:false
    })
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    if (this.props.supervisor) {
    }
    const supervisor = this.props.supervisor ? (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Edit</h4>
                <p className={classes.cardCategoryWhite}>Edit Supervisor Details</p>
              </CardHeader>
              <form onSubmit={this.handleClickOpen}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="First Name"
                        id="firstName"
                        type="text"
                        value={this.state.firstName}
                        handleChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Last Name"
                        id="lastName"
                        type="text"
                        value={this.state.lastName}
                        handleChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email"
                        id="email"
                        type="email"
                        value={this.state.email}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                        disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <ErrorTooltip
                        PopperProps={{
                          disablePortal: true,
                        }}
                        onClose={this.handleTooltipClose}
                        open={this.state.tooltipOpen}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title="Please enter a valid phone number"
                        arrow
                      >
                      <CustomInput
                        labelText="Contact Number"
                        id="contactNumber"
                        type="text"
                        value={this.state.contactNumber}
                        handleChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
                      </ErrorTooltip>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                        <Button type="submit" color="info">
                            Save
                        </Button>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                        <Link to={"../" + this.props.id}>
                            <Button color="grey">
                            Cancel
                            </Button>
                        </Link>
                        </GridItem>
                    </GridContainer>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogContent>
            <p className={classes.cardCategoryBlack}>
              Are you sure you want to save changes?
            </p>
          </DialogContent>
          <DialogActions>
            <Button color="success" size="sm" onClick={this.handleEdit}>
              Save
            </Button>
            <Button onClick={this.handleClose} color="transparent" size="sm">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    ) : (
      <div>loading....</div>
    );
    return <div>{supervisor}</div>;
  }
}

//load required data from reducer to props
const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.supervisor_id;
  return {
    id: id,
    supervisor: state.supervisor.supervisor,
    auth: state.firebase.auth,
    user: state.auth.user,
  };
};

//load required functions from actions to props
const mapDispatchToProps = (dispatch) => {
    return{
        editSupervisor: (id,supervisor,user,uid,supervisorName) => {
          dispatch(editSupervisor(id,supervisor,user,uid,supervisorName))
        },
        fetchSupervisor: (id) => {
          dispatch(fetchSupervisor(id))
        },
        fetchUserData: (uid) => {
          dispatch(fetchUserData(uid));
        },   
     }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditSupervisor));
