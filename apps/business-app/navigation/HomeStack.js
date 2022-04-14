import { CreateOffer, Dashboard, RequestDetails } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Group>
				<Stack.Screen name="Dashboard" component={Dashboard} />
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen name="HomeBottomSheet" component={HomeBottomSheet} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

const HomeBottomSheet = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="RequestDetails" component={RequestDetails} />
			<Stack.Screen name="CreateOffer" component={CreateOffer} />
		</Stack.Navigator>
	);
};
