import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export function FontsProvider({ children }) {
	let [fontsLoaded] = useFonts({
		SFPro: require("./assets/fonts/SF-Pro.ttf"),
		Circular: require("./assets/fonts/Circular-Book.ttf"),
		CircularMedium: require("./assets/fonts/Circular-Medium.ttf"), 
		CircularBold : require("./assets/fonts/Circular-Bold.ttf")
	});

	if (!fontsLoaded) {
		return <AppLoading />
	}

	return children;
}
