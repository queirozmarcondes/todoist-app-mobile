import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Input } from "../../components/ui/Input";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleLogin() {
        if (!email || !password) {
            return Alert.alert("Erro", "Preencha todos os campos.");
        }

        try {
            setLoading(true);

            const response = await api.post("/login", { email, password });

            const { token, user } = response.data;
            await AsyncStorage.setItem("token", token);

            console.log("Usuário logado:", user);
            router.replace("/todo");
        } catch (error: any) {
            console.error("Erro ao logar:", error?.response?.data || error.message);

            let errorMessage = "Erro ao fazer login. Tente novamente.";

            if (error?.response?.data) {
                if (typeof error.response.data === "string") {
                    errorMessage = error.response.data;
                } else if (error.response.data.message) {
                    errorMessage = error.response.data.message;
                }
            }

            Alert.alert("Erro", errorMessage);

        } finally {
            setLoading(false);
        }
    }



    function handleRegister() {
        router.push("/auth/register");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Input
                label="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={[styles.loginButton, loading && styles.disabledButton]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.loginButtonText}>Entrar</Text>
                )}
            </TouchableOpacity>

            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>ou</Text>
                <View style={styles.separatorLine} />
            </View>

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
        backgroundColor: Colors.default.background,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: Colors.default.text,
    },
    loginButton: {
        backgroundColor: Colors.default.button,
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    disabledButton: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    separatorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.default.tabIconDefault,
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.default.icon,
    },
    registerText: {
        textAlign: "center",
        color: Colors.default.icon,
        fontSize: 16,
        fontWeight: "bold",
    },
});

