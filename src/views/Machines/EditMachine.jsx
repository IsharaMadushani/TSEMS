import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
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
import { fetchMachine } from "../../store/actions/machineActions";
import { editMachine} from '../../store/actions/machineActions';
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

class EditMachine extends Component {
  state = {
    open: false //to handle pop-up dialog box
  };

  //open dialog box
  handleClickOpen = e => {
    e.preventDefault();
    this.setState({
      open: true
    });
  };

  //close dialog box
  handleClose = e => {
    this.setState({
      open: false
    });
  };

  constructor(props) {
    super(props)
    props.fetchMachine(props.id); //fetch machine data
    props.fetchUserData(props.auth.uid); //fetch current user data for notifications
  };

  //update state with new props
  componentWillReceiveProps(nextProps) {
    if (nextProps.machine != this.props.machine) {
      this.setState({ ... nextProps.machine, ...this.state });
    }
  };

  componentWillMount() {
    this.props.fetchMachine(this.props.id);
    this.setState ({...this.props.machine, ...this.state})
  };

  handleEdit = e => {
    e.preventDefault();
    let machine = {
      label: this.state.label,
    }
    this.props.editMachine(this.props.id, machine , this.props.user, this.props.auth.uid, this.props.machine.label);
    this.props.history.push("../" + this.props.id);
  };

  //update state when input field change
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const machine = this.props.machine ? (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Edit</h4>
                <p className={classes.cardCategoryWhite}>Edit Machine Details</p>
              </CardHeader>
              <form onSubmit={this.handleClickOpen}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Machine ID"
                        id="machineid"
                        type="text"
                        value={this.props.id}
                        handleChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true}}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Machine Label"
                        id="label"
                        type="text"
                        value={this.state.label}
                        handleChange={this.handleChange}
                        formControlProps={{
                          fullWidth: true
                        }}
                      />
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
    return <div>{machine}</div>;
  }
}

//load required data from reducer to props
const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.machine_id;
  return {
    id: id,
    machine: state.machines.machine,
    auth: state.firebase.auth,
    user: state.auth.user,
  };
};

//load required functions from actions to props
const mapDispatchToProps = (dispatch) => {
    return{
        editMachine: (id,machine,user,uid,machineName) => {
            dispatch(editMachine(id,machine,user,uid,machineName))
        },
        fetchMachine: (id) => {
            dispatch(fetchMachine(id))
        },
        fetchUserData: (uid) => {
            dispatch(fetchUserData(uid));
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(EditMachine));
