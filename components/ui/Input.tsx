import { TextInput, TextInputProps, View, Text, StyleSheet } from "react-native";

interface InputProps extends TextInputProps {
    label?: string;
}

export function Input({ label, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput style={styles.input} {...props} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    label: {
        marginBottom: 4,
        fontSize: 14,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
    },
});
