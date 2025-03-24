import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationConstant } from "../../Helper/Contants/Navigation";

const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: NavigationConstant.LOGIN_SCREEN }],
            });
        }, 2000);
    }, []);

    return (
        <LinearGradient
            colors={["#94BCEB", "#D9DDDF", "#94BCEB"]}
            start={{ x: 2, y: 0.01 }}
            end={{ x: 0.1, y: 1.3 }}
            style={styles.container}
        >
            <Image
                style={styles.logoImage}
                source={require("../../../assets/logo.png")}
            ></Image>
            <Text style={styles.logoText}>Task Management</Text>
        </LinearGradient>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    logoText: {
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: 2,
        color: "rgb(9, 167, 246)",
        fontStyle: "normal",
        marginTop: 8,
    },
    logoImage: {
        height: 100,
        width: 100,
    },
});
