import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard, CreateRequest } from "../screens";

export default function HomeStack() {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Dashboard" component={Dashboard} />
			<Stack.Screen name="Create A Request" component={CreateRequest} />
		</Stack.Navigator>
	);
}
