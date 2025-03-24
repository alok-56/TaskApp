import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Taskcard from "../../Components/TaskCard";
import CustomModal from "../../Components/CustomModal";
import CustomButton from "../../Components/CustomButton";
import { CreateTaskApi, DeleteTaskApi, GetAllTaskApi, GetMYTaskApi, UpdateTaskApi } from "../../Api/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authcontext } from "../../Context/AuthContext";


const Home = () => {
    const navigation = useNavigation();
    const [isvisible, setIsvisible] = useState(false)
    const [editvisible, setEditvisible] = useState(false)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState([])
    const [id, setId] = useState("")

    let { islogin, setislogin } = useContext(authcontext);


    useEffect(() => {
        GetTask()
    }, [])


    const AddTask = async () => {
        if (!title) {
            Alert.alert("Title is required");
            return;
        } else if (!description) {
            Alert.alert("Description  is required");
        }
        setLoading(true);

        try {
            let response = await CreateTaskApi({
                Title: title,
                Description: description
            })
            if (response.status) {
                Alert.alert("Task Created Successfully")
                setIsvisible(false)
                setTitle("")
                setDescription("")
                GetTask()
            } else {
                Alert.alert(response.message)
            }
            console.log(response)
        } catch (error) {

        } finally {
            setLoading(false)
        }

    };

    const GetTask = async () => {


        try {
            let response = await GetMYTaskApi()
            if (response.status) {
                setTask(response.data)
            } else {
                setTask([])
            }
            console.log(response)
        } catch (error) {

        }
    }

    const DeleteTask = async (id) => {
        let response = await DeleteTaskApi(id)
        if (response.status) {
            GetTask()
        } else {
            Alert.alert(response.message)
        }

    }

    const EditTask = async (id, item) => {
        setTitle(item.Title)
        setDescription(item.Description)
        setId(id)
        setEditvisible(true)
    }


    const UpdateEditTask = async () => {
        if (!title) {
            Alert.alert("Title is required");
            return;
        } else if (!description) {
            Alert.alert("Description  is required");
        }
        setLoading(true);

        try {
            let response = await UpdateTaskApi({
                Title: title,
                Description: description
            }, id)
            if (response.status) {
                Alert.alert("Task Updated Successfully")
                setEditvisible(false)
                setTitle("")
                setDescription("")
                GetTask()
            } else {
                Alert.alert(response.message)
            }
            console.log(response)
        } catch (error) {

        } finally {
            setLoading(false)
        }

    }

    const Logoutasync = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await AsyncStorage.clear()
                        setislogin(false)
                    },
                },
            ],
            { cancelable: false }
        );
    };



    return (
        <LinearGradient
            colors={["#94BCEB", "#D9DDDF", "#94BCEB"]}
            start={{ x: 2, y: 0.01 }}
            end={{ x: 0.1, y: 1.3 }}
            style={styles.container}
        >
            <CustomModal isvisible={isvisible} close={() => setIsvisible(false)}>

                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        placeholder="Enter Your Title"
                        style={styles.inputbox}
                        placeholderTextColor="#000"
                    ></TextInput>
                    <TextInput
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="Enter Your Description"
                        style={[styles.inputbox, { height: 100 }]}
                        multiline={true}
                        numberOfLines={100}
                        placeholderTextColor="#000"
                    ></TextInput>
                </View>

                <CustomButton
                    buttonStyle={{
                        height: 45,
                        backgroundColor: "#4E8AFD",
                        marginTop: 30,
                        borderRadius: 10,
                    }}
                    TextStyle={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "500",
                        letterSpacing: 1,
                    }}
                    text="Add Task"
                    loading={loading}
                    onClick={AddTask}
                />

            </CustomModal>

            <CustomModal isvisible={editvisible} close={() => setEditvisible(false)}>
                <View style={{ marginTop: 10 }}>
                    <TextInput
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                        placeholder="Enter Your Title"
                        style={styles.inputbox}
                        placeholderTextColor="#000"
                    ></TextInput>
                    <TextInput
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                        placeholder="Enter Your Description"
                        style={[styles.inputbox, { height: 100 }]}
                        multiline={true}
                        numberOfLines={100}
                        placeholderTextColor="#000"
                    ></TextInput>
                </View>

                <CustomButton
                    buttonStyle={{
                        height: 45,
                        backgroundColor: "#4E8AFD",
                        marginTop: 30,
                        borderRadius: 10,
                    }}
                    TextStyle={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "500",
                        letterSpacing: 1,
                    }}
                    text="Edit Task"
                    loading={loading}
                    onClick={UpdateEditTask}
                />

            </CustomModal>

            <View style={styles.headerContainer}>
                <View style={styles.headerInnerContainer}>
                    <Text style={styles.headerTitle}>Task Manager</Text>
                    <TouchableOpacity onPress={Logoutasync}>
                        <View style={styles.avatarContainer}>
                            <Image style={styles.avatarImage} source={require('../../../assets/avatar.jpg')} />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.tasksContainer}>
                <View style={styles.taskHeaderContainer}>
                    <Text style={styles.taskHeader}>Tasks</Text>
                    <TouchableOpacity style={styles.addTaskButton} onPress={() => setIsvisible(true)}>
                        <View style={styles.addTaskButtonContent}>
                            <Text style={styles.addTaskButtonText}>+ Add Task</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    task?.length === 0 ? <Image style={{ height: 400, width: 400, justifyContent: "center", alignItems: "center" }} source={require('../../../assets/nodata.png')}></Image> : <Taskcard data={task} deletefun={DeleteTask} editfun={EditTask}></Taskcard>
                }

            </View>

        </LinearGradient>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        width: "100%",
        height: 120,
        backgroundColor: "rgb(244, 245, 245)",
    },
    headerInnerContainer: {
        height: 80,
        width: "90%",
        flexDirection: "row",
        marginTop: Platform.OS === "ios" ? 50 : 40,
        alignSelf: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#4E8AFD",
        marginTop: 20,
    },
    avatarContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: "red",
        marginTop: 5,
    },
    avatarImage: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    tasksContainer: {
        width: "100%",
        marginTop: 20,
    },
    taskHeaderContainer: {
        width: "90%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    taskHeader: {
        fontSize: 18,
        fontWeight: "600",
        color: "#4E8AFD",
        marginTop: 3,
    },
    addTaskButton: {
        width: 100,
        height: 30,
        backgroundColor: "#4E8AFD",
        borderRadius: 50,
    },
    addTaskButtonContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    addTaskButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    taskCardContainer: {
        width: "90%",
        height: 70,
        backgroundColor: "#fff",
        borderRadius: 8,
        alignSelf: "center",
        flexDirection: "row",
        marginTop: 20,
    },
    taskCardDate: {
        height: "100%",
        width: "20%",
        backgroundColor: '#4E8AFD',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    taskCardDateText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
    },
    taskCardContent: {
        height: "100%",
        width: "70%",
        marginLeft: 15,
        justifyContent: "center",
    },
    taskCardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    taskCardDescription: {
        fontSize: 14,
        fontWeight: "400",
        color: "gray",
    },
    taskCardEmpty: {
        height: "100%",
        width: "10%",
    },
    inputbox: {
        height: 50,
        backgroundColor: "#fff",
        marginTop: 25,
        borderRadius: 8,
        paddingLeft: 15,
    },
});
