import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#007aff",
            }}
        >
            <Tabs.Screen
                name="todo"
                options={{
                    title: "Minhas Tarefas",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkmark-done" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}
