import { SafeAreaView as RNSafeAreaView } from "react-native";
import { tw } from "@kagua/lib";
import Constants from "expo-constants";
//import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";

export default function SafeAreaView({ children, style = " " }) {
	const statusBarHeight = Constants.statusBarHeight;
	return (
		<RNSafeAreaView style={tw`flex-1 bg-white ios:pt-0 android:pt-[${statusBarHeight}px] ${style} `}>{children}</RNSafeAreaView>
	)
}
