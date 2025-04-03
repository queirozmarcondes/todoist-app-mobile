import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ícones do Expo

export default function TodoScreen() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);

    function addTask() {
        if (task.trim().length === 0) return; // Evita adicionar tarefas vazias
        setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
        setTask(""); // Limpa o campo de entrada
    }

    function toggleComplete(id: number) {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    }

    function deleteTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todoist</Text>

            {/* Campo de entrada e botão adicionar */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite uma tarefa..."
                    value={task}
                    onChangeText={setTask}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTask}>
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Lista de tarefas */}
            <FlatList
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                            <Ionicons
                                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                                size={24}
                                color={item.completed ? "green" : "gray"}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.text}</Text>
                        <TouchableOpacity onPress={() => deleteTask(item.id)}>
                            <Ionicons name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
    },
    addButton: {
        backgroundColor: "#007bff",
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
    },
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    completedTask: {
        textDecorationLine: "line-through",
        color: "gray",
    },
});
