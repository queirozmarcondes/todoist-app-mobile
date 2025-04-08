import * as Animatable from "react-native-animatable";
import { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Alert,
    SafeAreaView,
    ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import api from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Colors } from "@/constants/Colors";
import { TaskItem } from "@/components/ui/TaskItem";
import { Ionicons } from "@expo/vector-icons";

type Task = {
    id: string;
    text: string;
    completed: boolean;
};

export default function TodoScreen() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchTasks();
    }, []);

    async function handleLogout() {
        try {
            await AsyncStorage.removeItem("token");
            router.replace("/");
        } catch (err) {
            console.error("Erro ao fazer logout:", err);
            Alert.alert("Erro", "Não foi possível sair.");
        }
    }

    async function fetchTasks() {
        setLoading(true);
        try {
            const response = await api.get("/todoist");
            const formatted = response.data.map((t: any) => ({
                id: t._id,
                text: t.description,
                completed: t.completed,
            }));
            setTasks(formatted);
        } catch (err) {
            console.error("Erro ao buscar tarefas:", err);
            Alert.alert("Erro", "Não foi possível carregar as tarefas.");
        } finally {
            setLoading(false);
        }
    }

    async function addTask() {
        if (task.trim().length === 0) return;

        try {
            const response = await api.post("/todoist", { description: task });
            const newTask = {
                id: response.data._id,
                text: response.data.description,
                completed: response.data.completed,
            };
            setTasks(prev => [...prev, newTask]);
            setTask("");
        } catch (err) {
            console.error("Erro ao adicionar tarefa:", err);
            Alert.alert("Erro", "Não foi possível adicionar a tarefa.");
        }
    }

    async function toggleComplete(id: string) {
        try {
            const taskToUpdate = tasks.find(t => t.id === id);
            if (!taskToUpdate) return;

            const updatedCompleted = !taskToUpdate.completed;

            await api.put(`/todoist/${id}`, {
                description: taskToUpdate.text,
                completed: updatedCompleted,
            });

            setTasks(prev =>
                prev.map(t =>
                    t.id === id ? { ...t, completed: updatedCompleted } : t
                )
            );
        } catch (err) {
            console.error("Erro ao atualizar tarefa:", err);
            Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
        }
    }

    async function deleteTask(id: string) {
        try {
            await api.delete(`/todoist/${id}`);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error("Erro ao deletar tarefa:", err);
            Alert.alert("Erro", "Não foi possível deletar a tarefa.");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Todoist</Text>
                    <Ionicons
                        name="log-out-outline"
                        size={28}
                        color={Colors.default.error}
                        onPress={handleLogout}
                        style={styles.logoutIcon}
                    />
                </View>

                <Animatable.View animation="fadeInDown" duration={700} style={styles.inputContainer}>
                    <Input
                        placeholder="Digite uma tarefa..."
                        value={task}
                        onChangeText={setTask}
                        style={styles.input}
                        containerStyle={styles.inputWrapper}
                    />
                    <Animatable.View animation="bounceIn" duration={800}>
                        <Button
                            title="+"
                            onPress={addTask}
                            style={styles.buttonAddTask}
                        />
                    </Animatable.View>
                </Animatable.View>

                {loading ? (
                    <ActivityIndicator size="large" color={Colors.default.tint} style={{ marginTop: 50 }} />
                ) : tasks.length === 0 ? (
                    <Animatable.View animation="fadeIn" duration={500} style={styles.emptyContainer}>
                        <Ionicons name="cloud-offline-outline" size={64} color={Colors.default.border} />
                        <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
                    </Animatable.View>
                ) : (
                    <FlatList
                        data={tasks}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TaskItem
                                {...item}
                                onToggle={() => toggleComplete(item.id)}
                                onDelete={() => deleteTask(item.id)}
                            />
                        )}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.default.background,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: Colors.default.text,
    },
    logoutIcon: {
        padding: 6,
        backgroundColor: Colors.default.card,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
        gap: 8,
        backgroundColor: Colors.default.card,
    },
    inputWrapper: {
        flex: 1,
        height: 48,
        justifyContent: "center",
    },
    input: {
        height: 48,
        marginTop: 10,
        fontSize: 16,
        backgroundColor: Colors.default.card,
        borderRadius: 8,
    },
    buttonAddTask: {
        backgroundColor: Colors.default.button,
        width: 48,
        height: 48,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        gap: 16,
    },
    emptyText: {
        textAlign: "center",
        color: Colors.default.border,
        fontSize: 16,
    },
});
