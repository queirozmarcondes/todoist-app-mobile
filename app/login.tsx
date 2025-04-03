import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useState } from "react";

import { useRouter } from "expo-router";


export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        console.log("Login:", { email, password });
    }
    const router = useRouter();

    function handleRegister() {
        router.push("/register"); // Navega para a tela de cadastro
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />

            <Button title="Entrar" onPress={handleLogin} />

            {/* Linha separadora */}
            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>ou</Text>
                <View style={styles.separatorLine} />
            </View>

            {/* Botão de Cadastro */}
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerText}>Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    separatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#ccc",
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 14,
        fontWeight: "bold",
        color: "#888",
    },
    registerText: {
        textAlign: "center",
        color: "#007bff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
