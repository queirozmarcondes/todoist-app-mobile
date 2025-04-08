import React from "react";
import {
    TextInput,
    TextInputProps,
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
    Text,
} from "react-native";
import { Colors } from "@/constants/Colors";

interface InputProps extends TextInputProps {
    label?: string;
    containerStyle?: StyleProp<ViewStyle>;
}

export function Input({ label, containerStyle, style, ...props }: InputProps) {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, style]}
                placeholderTextColor={Colors.default.border}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignSelf: "center",
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: Colors.default.text,
        marginBottom: 6,
        fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.default.border,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 16,
        color: Colors.default.text,
        backgroundColor: Colors.default.card,
    },
});
