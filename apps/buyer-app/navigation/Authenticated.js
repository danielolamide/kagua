import { getUser } from "@kagua/api";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useApp } from "../context";
import { Onboarding } from "../screens/";
import Main from "./Main";

const Stack = createNativeStackNavigator();

export default function Authenticated() {
	const { onboardingStage } = useApp();

	return onboardingStage < 2 ? <OnboardingStack /> : <MainStack />
}

const OnboardingStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Onboarding" component={Onboarding} />
		</Stack.Navigator>
	);
};

const MainStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Main" component={Main} />
		</Stack.Navigator>
	);
};
