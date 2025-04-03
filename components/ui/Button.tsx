import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({ title, ...props }: ButtonProps) {
    return (
        <TouchableOpacity style={styles.button} {...props}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
