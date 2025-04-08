import { Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Colors } from "@/constants/Colors";

type Props = {
    id: string;
    text: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void;
};

export function TaskItem({ id, text, completed, onToggle, onDelete }: Props) {
    return (
        <Animatable.View
            animation="fadeInUp"
            duration={500}
            style={styles.taskItem}
        >
            <Ionicons
                name={completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={completed ? Colors.default.success : Colors.default.border}
                onPress={onToggle}
            />
            <Text style={[styles.taskText, completed && styles.completedTask]}>
                {text}
            </Text>
            <Ionicons
                name="trash"
                size={24}
                color={Colors.default.error}
                onPress={onDelete}
            />
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: Colors.default.card,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 12,
        color: Colors.default.text,
    },
    completedTask: {
        textDecorationLine: "line-through",
        color: Colors.default.border,
    },
});
