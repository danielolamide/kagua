import { tw } from "@kagua/lib";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	BusinessProfile,
	RequestsList,
	RequestDetails,
	SeeMoreOffers,
} from "../screens";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function RequestTabs() {
	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<Tab.Navigator
				initialLayout={{ width: Dimensions.get("window").width }}
				initialRouteName="Open"
			>
				<Tab.Screen name="Open" component={RequestsList} />
				<Tab.Screen name="Closed" component={RequestsList} />
			</Tab.Navigator>
		</SafeAreaView>
	);
}

export default function Requests() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="RequestTabs"
		>
			<Stack.Group>
				<Stack.Screen name="RequestTabs" component={RequestTabs} />
				<Stack.Screen name="RequestDetails" component={RequestDetails} />
				<Stack.Screen name="BusinessProfile" component={BusinessProfile} />
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen name="SeeMoreOffers" component={SeeMoreOffers} />
			</Stack.Group>
		</Stack.Navigator>
	);
}
