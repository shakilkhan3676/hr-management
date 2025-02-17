import { Stack, useRouter } from "expo-router";
import { getScreenOptions } from "@/components/navigationOptions";

export default function AiLayout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                ...getScreenOptions(router),
            }}
        >
            <Stack.Screen name="index" options={{ title: "AI" }} />
        </Stack>
    );
}
