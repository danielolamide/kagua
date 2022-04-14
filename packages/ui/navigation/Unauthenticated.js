import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn, SignUp } from "../screens/";

export default function Unauthenticated() {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator
			initialRouteName="signin"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Sign In" component={SignIn} />
			<Stack.Screen name="Sign Up" component={SignUp} />
		</Stack.Navigator>
	);
}
