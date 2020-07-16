import React, { Component } from "react";
import NewWindow from 'react-new-window'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";

import Button from "components/CustomButtons/Button.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTasks } from "../../store/actions/taskActions";
import { fetchWorker } from "../../store/actions/workerActions";
import { fetchWorkerStatistics } from "../../store/actions/workerActions";
import { fetchSupervisors } from "../../store/actions/supervisorActions";
import { fetchAssignedSupervisors } from "../../store/actions/workerActions";
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

class WorkerReport extends Component {

    componentWillMount() {
        this.props.fetchWorker(this.props.id);
        this.props.fetchSupervisors();
        this.props.fetchTasks();
        this.props.fetchWorkerStatistics(this.props.id);
        this.props.fetchAssignedSupervisors(this.props.id);
        this.props.fetchAssignedTasks(this.props.id);
        this.props.fetchCompletedTasks(this.props.id);
    }
    
    render() {
        var assignedSupervisorData = [];
        var assignedTasksData = [];
        var completedTasksData = [];

        var dt = new Date()
        if(this.props.worker){
            if (this.props.supervisors) {
                const allsupervisors = this.props.supervisors;
          
                for (let [supervisorId, supervisor] of Object.entries(allsupervisors)) {
                  if(this.props.assignedSupervisors && this.props.assignedSupervisors.includes(supervisorId)){
                    assignedSupervisorData.push(<Text style={styles.text}>{supervisor.firstName + " " + supervisor.lastName}</Text>)
                  }
                }
              }
            if (this.props.tasks) {
                const alltasks = this.props.tasks;
          
                for (let [taskId, task] of Object.entries(alltasks)) {
          
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

        var report = (this.props.worker && this.props.supervisors && this.props.workerStatistics)?(
              <Document>
                <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.heading}>CBL Engineering Department</Text>
                    <Text style={styles.heading}>Worker Report</Text>                
                </View>
                <View>
                    <Text style={styles.subHeading}>NAME</Text>
                    <Text style={styles.text}>{this.props.worker.firstName+" "+this.props.worker.lastName}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>E-MAIL</Text>
                    <Text style={styles.text}>{this.props.worker.email}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>CONTACT NUMBER</Text>
                    <Text style={styles.text}>{this.props.worker.contactNumber}</Text>
                </View>
                <View>
                    <Text style={styles.subHeading}>ASSIGNED SUPERISORS</Text>
                    {assignedSupervisorData.length>0 ? assignedSupervisorData : (<Text style={styles.text}>None</Text>)}
                </View>
                <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
                <Text style={styles.date}>{dt.toLocaleDateString()}</Text>
                </Page>
                <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.subHeading}>CURRENT TASKS</Text>
                    {assignedTasksData.length>0 ? assignedTasksData : (<Text style={styles.text}>None</Text>)}
                </View>
                <View>
                    <Text style={styles.subHeading}>COMPLETED TASKS</Text>
                    {assignedTasksData.length>0 ? completedTasksData : (<Text style={styles.text}>None</Text>)}
                </View>
                <View>
                    <Text style={styles.subHeading}>STATISTICS</Text>
                    <Text style={styles.text}>Completed Tasks  :  {this.props.workerStatistics.numberOfCompletedTasks}</Text>
                    <Text style={styles.text}>Current Tasks  :  {this.props.workerStatistics.numberOfCurrentTasks}</Text>
                    <Text style={styles.text}>Incomplete Tasks  :  {this.props.workerStatistics.numberOfIncompletedTasks}</Text>
                    <Text style={styles.text}>Tasks in Progress  :  {this.props.workerStatistics.numberOfTasksInProgress}</Text>
                    <Text style={styles.text}>Tasks on Hold  :  {this.props.workerStatistics.numberOfTasksOnHold}</Text>
                    <Text style={styles.text}>Overdue Tasks  :  {this.props.workerStatistics.numberOfTasksOverdue}</Text>
                    <Text style={styles.text}>Pending Tasks  :  {this.props.workerStatistics.numberOfTasksPending}</Text>
                    <Text style={styles.text}>Feedback Score  :  {this.props.workerStatistics.feedbackScore}</Text>
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
                    Go To Worker Details
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
let id = ownProps.match.params.worker_id;
    return {
        id: id,
        tasks: state.tasks.tasks,
        worker: state.worker.worker,
        supervisors: state.supervisor.supervisors,
        workerStatistics: state.worker.workerStatistics,
        assignedSupervisors: state.worker.assignedSupervisors,
        assignedTasks: state.tasks.assignedTasks,
        completedTasks: state.tasks.completedTasks,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTasks: () => {
            dispatch(fetchTasks());
        },
        fetchWorker: (workerId) => {
            dispatch(fetchWorker(workerId))
        },
        fetchWorkerStatistics: (workerId) => {
            dispatch(fetchWorkerStatistics(workerId))
        },
        fetchSupervisors: () => {
            dispatch(fetchSupervisors())
        },
        fetchAssignedSupervisors: (workerId) => {
            dispatch(fetchAssignedSupervisors(workerId))
        },
        fetchAssignedTasks: (id) => {
            dispatch(fetchAssignedTasks(id));
        },
        fetchCompletedTasks: (id) => {
            dispatch(fetchCompletedTasks(id));
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(WorkerReport));