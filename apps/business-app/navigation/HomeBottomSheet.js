import { CreateBid, RequestDetails } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function HomeBottomSheet(props) {
	const Stack = createNativeStackNavigator();
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="RequestDetails">
				{(extraProps) => <RequestDetails {...props} {...extraProps} />}
			</Stack.Screen>
			<Stack.Screen name="CreateBid">
				{(extraProps) => <CreateBid {...props} {...extraProps} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}
