import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useState } from "react";
import { useRouter } from "expo-router";
import api from "@/services/api";
import { Colors } from "@/constants/Colors";

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        try {
            const response = await api.post("/users", {
                name,
                email,
                password,
            });

            console.log("Usuário cadastrado:", response.data);
            // Redirecionar ou logar o usuário automaticamente
        } catch (error: any) {
            console.error("Erro ao cadastrar:", error?.response?.data || error.message);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <Input label="Nome" value={name} onChangeText={setName} />
            <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
            <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry />

            <Button title="Cadastrar" onPress={handleRegister} />

            {/* Voltar para Login */}
            <TouchableOpacity onPress={() => router.push("/")}>
                <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
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
        color: Colors.default.icon,
    },
    loginText: {
        textAlign: "center",
        color: Colors.default.button,
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
});
