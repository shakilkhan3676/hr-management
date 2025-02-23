/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
    light: {
        text: "#6B7386",
        background: "transparent",
        tint: tintColorLight,
        primaryButton: "#1680E1",
        groupButtonContainer: "#F1F7FE",
        groupButtonContainerBorder: "#82BDF7",
        approveButton: "#00B894",
        rejectButton: "#FE6B87",
        checkoutButton: "#ED544E",
        icon: "#6B7386",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: "#ECEDEE",
        background: "#151718",
        tint: tintColorDark,
        primaryButton: "#1680E1",
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark,
    },
};
