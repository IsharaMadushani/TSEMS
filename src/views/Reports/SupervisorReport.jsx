import React, { Component } from "react";
import NewWindow from 'react-new-window'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";

import Button from "components/CustomButtons/Button.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTasks } from "../../store/actions/taskActions";
import { fetchSupervisor } from "../../store/actions/supervisorActions";
import { fetchSupervisorStatistics } from "../../store/actions/supervisorActions";
import { fetchWorkers } from "../../store/actions/workerActions";
import { fetchAssignedWorkers } from "../../store/actions/supervisorActions";
import { fetchAssignedTasks } from "../../store/actions/taskActions";
import { fetchCompletedTasks } from "../../store/actions/taskActions";

// Create styles

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    body: {
        paddingTop:200,
        padding: 60
    },
    heading: {
        textAlign: "center",
        // paddingTop: "20px",
        paddingBottom: "30px",
        fontSize: "18",
    },
    subHeading:{
        textAlign: "left",
        // paddingVertical: "20px",
        paddingBottom: "10px",
        paddingTop: "30px",
        fontSize: "14"
    },
    text:{
        textAlign: "left",
        paddingBottom: "10px",
        // paddingTop: "30px",
        fontSize: "12"
    },
    pageNumbers: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'right',
        fontSize: "10"
    },
    date: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'left',
        fontSize: "10"
    }
});

// Create Document Component
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//     </Page>
//   </Document>
// );

class SupervisorReport extends Component {

    componentWillMount() {
        this.props.fetchSupervisor(this.props.id);
        this.props.fetchWorkers();
        this.props.fetchTasks();
        this.props.fetchSupervisorStatistics(this.props.id);
        this.props.fetchAssignedWorkers(this.props.id);
        this.props.fetchAssignedTasks(this.props.id);
        this.props.fetchCompletedTasks(this.props.id);
    }

    render() {
        var assignedWorkerData = [];
        var assignedTasksData = [];
        var completedTasksData = [];

        var dt = new Date()
        if(this.props.supervisor){
            if (this.props.workers) {
                const allworkers = this.props.workers;
          
                for (let [workerId, worker] of Object.entries(allworkers)) {
                  if(this.props.assignedWorkers && this.props.assignedWorkers.includes(workerId)){
                    assignedWorkerData.push(<Text style={styles.text}>{worker.firstName + " " + worker.lastName}</Text>)
                  }
                }
              }
            if (this.props.tasks) {
                const alltasks = this.props.tasks;
          
                for (let [taskId, task] of Object.entries(alltasks)) {
                  var data = [];
          
                  if(this.props.assignedTasks && this.props.completedTasks){
                    if(this.props.assignedTasks.length>0 && this.props.assignedTasks.includes(taskId)){
                      assignedTasksData.push(<Text style={styles.text}>{taskId + " - " + task.title}</Text>)
                    }
                    if(this.props.completedTasks.length>0 && this.props.completedTasks.includes(taskId)){
                        completedTasksData.push(<Text style={styles.text}>{taskId + " - " + task.title}</Text>)
                    }
                  }
                }
            }
        }

        var report = (this.props.supervisor && this.props.workers && this.props.supervisorStatistics)?(
              <Document>
                <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.heading}>CBL Engineering Department</Text>
                    <Text style={styles.heading}>Supervisor Report</Text>                
                </View>
                <View>
                    <Text style={styles.subHeading}>NAME</Text>
                    <Text style={styles.text}>{this.props.supervisor.firstName+" "+this.props.supervisor.lastName}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>E-MAIL</Text>
                    <Text style={styles.text}>{this.props.supervisor.email}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>CONTACT NUMBER</Text>
                    <Text style={styles.text}>{this.props.supervisor.contactNumber}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>ASSIGNED WORKERS</Text>
                    {assignedWorkerData.length>0 ? assignedWorkerData : (<Text style={styles.text}>None</Text>)}
                </View>
                <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
                <Text style={styles.date}>{dt.toLocaleDateString()}</Text>
                </Page>
                <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.subHeading}>CURRENT TASKS</Text>
                    {assignedTasksData.length>0? assignedTasksData : (<Text style={styles.text}>None</Text>)}
                </View>
                <View>
                    <Text style={styles.subHeading}>COMPLETED TASKS</Text>
                    {completedTasksData.length>0? completedTasksData : (<Text style={styles.text}>None</Text>)}
                </View>
                <View>
                    <Text style={styles.subHeading}>STATISTICS</Text>
                    <Text style={styles.text}>Current Tasks  :  {this.props.supervisorStatistics.numberOfCurrentTasks}</Text>
                    <Text style={styles.text}>Tasks in Progress  :  {this.props.supervisorStatistics.numberOfTasksInProgress}</Text>
                    <Text style={styles.text}>Tasks on Hold  :  {this.props.supervisorStatistics.numberOfTasksOnHold}</Text>
                    <Text style={styles.text}>Overdue Tasks  :  {this.props.supervisorStatistics.numberOfTasksOverdue}</Text>
                    <Text style={styles.text}>Pending Tasks  :  {this.props.supervisorStatistics.numberOfTasksPending}</Text>
                    <Text style={styles.text}>Tasks to be Rescheduled  :  {this.props.supervisorStatistics.numberOfTasksToBeRescheduled}</Text>
                    <Text style={styles.text}>Tasks Under Review  :  {this.props.supervisorStatistics.numberOfTasksUnderReview}</Text>
                </View>
                <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
                <Text style={styles.date}>{dt.toLocaleDateString()}</Text>
                </Page>
            </Document>
          ):(
              <Document>
                  loading...
              </Document>
          )
      return (
            <div>
                <Link to={"../" + this.props.id}>
                    <Button color="info" round>
                    Go To Supervisor Details
                    </Button>
                </Link>
                <NewWindow>
                    <PDFViewer style={{width:"100%", height:"100%"}}>{report}</PDFViewer>
                </NewWindow>
            </div>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
let id = ownProps.match.params.supervisor_id;
    return {
        id: id,
        tasks: state.tasks.tasks,
        supervisor: state.supervisor.supervisor,
        workers: state.worker.workers,
        supervisorStatistics: state.supervisor.supervisorStatistics,
        assignedWorkers: state.supervisor.assignedWorkers,
        assignedTasks: state.tasks.assignedTasks,
        completedTasks: state.tasks.completedTasks,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTasks: () => {
            dispatch(fetchTasks());
        },
        fetchSupervisor: (supervisorId) => {
            dispatch(fetchSupervisor(supervisorId))
        },
        fetchSupervisorStatistics: (supervisorId) => {
            dispatch(fetchSupervisorStatistics(supervisorId))
        },
        fetchWorkers: () => {
            dispatch(fetchWorkers())
        },
        fetchAssignedWorkers: (supervisorId) => {
            dispatch(fetchAssignedWorkers(supervisorId))
        },
        fetchAssignedTasks: (id) => {
            dispatch(fetchAssignedTasks(id));
        },
        fetchCompletedTasks: (id) => {
            dispatch(fetchCompletedTasks(id));
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SupervisorReport));