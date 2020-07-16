import React, { Component } from "react";
import NewWindow from 'react-new-window'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";

import Button from "components/CustomButtons/Button.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTasks } from "../../store/actions/taskActions";
import { fetchSupervisor } from "../../store/actions/supervisorActions";
import { fetchCompletedTasks } from "../../store/actions/taskActions";
import { fetchWorkers } from "../../store/actions/workerActions";
import { fetchUnregisteredWorkers } from "../../store/actions/workerActions";

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
        //paddingTop: "100px",
        paddingBottom: "30px",
        fontSize: "18",
    },
    title: {
        textAlign: "center",
        paddingTop: "100px",
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

class SupervisorMonthlyReport extends Component {

    componentWillMount() {
        this.props.fetchSupervisor(this.props.id);
        this.props.fetchTasks();
        this.props.fetchCompletedTasks(this.props.id);
        this.props.fetchWorkers();
        this.props.fetchUnregisteredWorkers();
    }
    render() {
        
        var requiredMonth = this.props.date.split("d");
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        var data = [];
        var dt = new Date()
        if(this.props.supervisor){
            if (this.props.tasks) {
                const alltasks = this.props.tasks;
          
                for (let [taskId, task] of Object.entries(alltasks)) {
          
                    if(this.props.completedTasks && this.props.workers && this.props.unregisteredWorkers){
                        if(this.props.completedTasks.length>0 && this.props.completedTasks.includes(taskId) && task.status=="Complete"){ //completed
                            let completed = task.completedAt.split(" @")
                            let date = completed[0].split("/")

                            var workers = task.assignedEmployees ? (
                                JSON.parse(task.assignedEmployees)
                            ): (
                            ""
                            )
                            var assignedWorkersData = []

                            if(date[0]==requiredMonth[0] && date[1]==requiredMonth[1]){  //date[2]
                                for (let [key, worker] of Object.entries(this.props.workers)) {
                                    if(workers.includes(key)){
                                        assignedWorkersData.push(<Text style={styles.text}>{worker.firstName + " " + worker.lastName}</Text>)
                                    }
                                }
                                for (let [key, worker] of Object.entries(this.props.unregisteredWorkers)) {
                                    if(workers.includes(key)){
                                        assignedWorkersData.push(<Text style={styles.text}>{worker.firstName + " " + worker.lastName}</Text>)
                                    }
                                }
                                data.push(
                                    <Page size="A4" style={styles.body}>
                                    <View>
                                        <Text style={styles.heading}>{taskId}</Text>
                                        <Text style={styles.heading}>{task.title}</Text>                
                                    </View>
                                    <View>
                                        <Text style={styles.subHeading}>DESCRIPTION</Text>
                                        <Text style={styles.text}>{task.description}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.subHeading}>TYPE</Text>
                                        <Text style={styles.text}>{task.type}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.subHeading}>PRIORITY LEVEL</Text>
                                        <Text style={styles.text}>{task.priorityLevel}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.subHeading}>ASSIGNED WORKERS</Text>
                                        {assignedWorkersData}
                                    </View>
                                    <View>
                                        <Text style={styles.subHeading}>STARTED AT</Text>
                                        <Text style={styles.text}>{task.startedAt}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.subHeading}>COMPLETED AT</Text>
                                        <Text style={styles.text}>{task.completedAt}</Text>
                                    </View>
                                    <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (`${pageNumber} / ${totalPages}`)} fixed />
                                    <Text style={styles.date}>{dt.toLocaleDateString()}</Text>
                                    </Page>
                                )
                            }
                        }
                    }
                }
            }
        }

        var report = (this.props.supervisor && this.props.completedTasks)?(
              <Document>
                <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.title}>CBL Engineering Department</Text>
                    <Text style={styles.title}>Supervisor Monthly Report - {this.props.supervisor.firstName.toUpperCase()} {this.props.supervisor.lastName.toUpperCase()}</Text>
                    <Text style={styles.title}>{requiredMonth[0]} {months[requiredMonth[1]-1]}</Text>
                </View>
                </Page>
                {data}
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
                    Back
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
let date = ownProps.match.params.date;
    return {
        id: id,
        date:date,
        tasks: state.tasks.tasks,
        supervisor: state.supervisor.supervisor,
        completedTasks: state.tasks.completedTasks,
        workers: state.worker.workers,
        unregisteredWorkers: state.worker.unregisteredWorkers
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
        fetchCompletedTasks: (id) => {
            dispatch(fetchCompletedTasks(id));
        },
        fetchWorkers: () => {
            dispatch(fetchWorkers())
        },        
        fetchUnregisteredWorkers: () => {
            dispatch(fetchUnregisteredWorkers())
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SupervisorMonthlyReport));