import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace("/login"); // Redireciona para a tela de login
        }, 2000); // Tempo de exibição da splash screen (2 segundos)
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meu App</Text>
            <ActivityIndicator size="large" color="#007bff" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});
