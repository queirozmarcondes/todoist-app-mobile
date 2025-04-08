import { View, StyleSheet } from "react-native";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

type Props = {
    task: string;
    setTask: (text: string) => void;
    onAdd: () => void;
};

export default function TaskInput({ task, setTask, onAdd }: Props) {
    return (
        <View style={styles.inputContainer}>
            <Input
                placeholder="Digite uma tarefa..."
                value={task}
                onChangeText={setTask}
                style={styles.input}
                containerStyle={styles.inputWrapper}
            />

            <Button title="+" onPress={onAdd} style={styles.buttonAddTask} />
        </View>
    );
}

const styles = StyleSheet.create({
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
});
