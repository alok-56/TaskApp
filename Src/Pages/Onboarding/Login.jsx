import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NavigationConstant } from '../../Helper/Contants/Navigation';
import { LoginApi } from '../../Api/Auth';
import { authcontext } from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation()
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    let { islogin, setislogin } = useContext(authcontext);


    const HandlLogin = async () => {
        if (!username) {
            Alert.alert("Email  is required");
            return
        } else if (!password) {
            Alert.alert("Password  is required");
            return
        }

        setLoading(true)

        try {
            let response = await LoginApi({
                Email: username,
                Password: password
            })
            if (response.status) {
                Alert.alert("Login Success")
                setislogin(true)
                await AsyncStorage.setItem("token", response.token)
                navigation.navigate(NavigationConstant.APP_STACK)
            } else {
                Alert.alert(response.message)
            }
           

        } catch (error) {

        } finally {
            setLoading(false)
        }


    };

    return (
        <LinearGradient
            colors={['#94BCEB', '#D9DDDF', '#94BCEB']}
            start={{ x: 2, y: 0.01 }}
            end={{ x: 0.1, y: 1.3 }}
            style={styles.container}>
            <ScrollView style={{ marginTop: 40 }}>
                <SafeAreaView style={styles.container}>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/logo.png')}></Image>
                    <View style={{ width: '80%', alignSelf: 'center', marginTop: 10 }}>
                        <Text style={styles.signText}>Sign in to your Account</Text>
                        <Text style={styles.signsmallText}>
                            Enter your email and password to log in{' '}
                        </Text>
                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                value={username}
                                onChangeText={text => setUserName(text)}
                                placeholder="Enter Your Email"
                                style={styles.inputbox}></TextInput>
                            <TextInput
                                value={password}
                                onChangeText={text => setPassword(text)}
                                placeholder="Enter Your Password"
                                style={styles.inputbox}></TextInput>
                        </View>

                        <CustomButton
                            buttonStyle={{
                                height: 50,
                                backgroundColor: '#4E8AFD',
                                marginTop: 30,
                                borderRadius: 10,
                            }}
                            TextStyle={{
                                color: '#fff',
                                fontSize: 20,
                                fontWeight: '500',
                                letterSpacing: 1,
                            }}
                            text="Login"
                            loading={loading}
                            onClick={HandlLogin}
                        />

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 40,
                                justifyContent: 'space-around',
                            }}>
                            <Text style={styles.line}></Text>
                            <Text style={{ textAlign: 'center', fontSize: 14 }}>OR</Text>
                            <Text style={styles.line}></Text>
                        </View>

                        <TouchableOpacity style={{ marginTop: 35, alignSelf: "center" }} onPress={() => navigation.navigate(NavigationConstant.SIGNUP_SCREEN)}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>New Users? <Text style={{ color: "#4E8AFD", fontWeight: "700", fontSize: 18 }}>Signup</Text></Text>
                        </TouchableOpacity>


                    </View>
                </SafeAreaView>
            </ScrollView>

        </LinearGradient>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        marginTop: 20,
    },
    signText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 1,
    },
    signsmallText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: 'gray',
    },
    inputbox: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        marginTop: 25,
        borderRadius: 8,
        paddingLeft: 15,
    },
    line: {
        width: '40%',
        height: 1,
        backgroundColor: 'gray',
        marginTop: 7,
    },
});
