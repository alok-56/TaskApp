import React, { useEffect, useState } from 'react';
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
import { SignupApi } from '../../Api/Auth';

const Signup = () => {
    const navigation = useNavigation()
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false);


    const HandlSignup = async () => {
        if (!name) {
            Alert.alert("Name is required");
            return;
        } else if (!username) {
            Alert.alert("Email  is required");
            return
        } else if (!password) {
            Alert.alert("Password  is required");
            return
        } else if (password.length < 8) {
            Alert.alert("Password  must be 8 digit");
            return
        }

        setLoading(true)

        try {
            let response = await SignupApi({
                Name: name,
                Email: username,
                Password: password
            })
            if (response.status) {
                Alert.alert("Account Created Successfully")
                navigation.navigate(NavigationConstant.LOGIN_SCREEN)
            } else {
                Alert.alert(response.message)
            }
            console.log(response)
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
            <ScrollView style={{ marginTop: 20 }}>
                <SafeAreaView style={styles.container}>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/logo.png')}></Image>
                    <View style={{ width: '80%', alignSelf: 'center', marginTop: 10 }}>
                        <Text style={styles.signText}>Sign up to create new Account</Text>
                        <Text style={styles.signsmallText}>
                            Enter your information to sign up{' '}
                        </Text>
                        <View style={{ marginTop: 10 }}>
                            <TextInput
                                value={name}
                                onChangeText={text => setName(text)}
                                placeholder="Enter Your Name"
                                style={styles.inputbox}></TextInput>
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
                            text="Signup"
                            loading={loading}
                            onClick={HandlSignup}
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

                        <TouchableOpacity style={{ marginTop: 35, alignSelf: "center" }} onPress={() => navigation.navigate(NavigationConstant.LOGIN_SCREEN)}>
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Already have account? <Text style={{ color: "#4E8AFD", fontWeight: "700", fontSize: 18 }}>Login</Text></Text>
                        </TouchableOpacity>


                    </View>
                </SafeAreaView>
            </ScrollView>

        </LinearGradient>
    );
};

export default Signup;

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

