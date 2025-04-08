// app/splash-screen.tsx
import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const token = await AsyncStorage.getItem("token");

            setTimeout(() => {
                if (token) {
                    router.replace("/todo");
                } else {
                    router.replace("/auth/login");
                }
            }, 2000);
        }

        checkAuth();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todoist</Text>
            <ActivityIndicator size="large" color={Colors.default.tint} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.default.background,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: Colors.default.text,
    },
});
