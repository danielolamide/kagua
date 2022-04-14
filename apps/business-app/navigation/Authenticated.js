import { getUser } from "@kagua/api";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { OnboardingOne } from "../screens/";
import Main from "./Main";

const Stack = createNativeStackNavigator();

export default function Authenticated() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(getUser());
	}, []);

	return user?.user_metadata.onboarding_stage < 2 ? <OnboardingStack /> : <MainStack />
}

const OnboardingStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="OnboardingOne" component={OnboardingOne} />
		</Stack.Navigator>
	);
};

const MainStack = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown : false}}>
			<Stack.Screen name="Main" component={Main} />
		</Stack.Navigator>
	);
};
