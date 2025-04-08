import {
    TouchableOpacity,
    Text,
    TouchableOpacityProps,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from "react-native";
import { Colors } from "@/constants/Colors";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    style?: StyleProp<ViewStyle>;
}

export function Button({ title, style, ...props }: ButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, style]} {...props}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.default.button,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: "100%",
        alignSelf: "center", // centraliza o botão horizontalmente
        marginBottom: 12,
        marginTop: 12,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});
