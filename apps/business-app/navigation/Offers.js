import { tw } from "@kagua/lib";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import { SafeAreaView } from "@kagua/ui/containers";
import { CreateOffer, OfferDetails, OfferList } from "../screens";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function OfferTabs() {
	return (
		<SafeAreaView>
			<Tab.Navigator
				initialLayout={{ width: Dimensions.get("window").width }}
				initialRouteName="Open"
			>
				<Tab.Screen name="Open" component={OfferList} />
				<Tab.Screen name="Lost" component={OfferList} />
				<Tab.Screen name="Accepted" component={OfferList} />
			</Tab.Navigator>
		</SafeAreaView>
	);
}

export default function Offers() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="OfferTabs"
		>
			<Stack.Screen name="OfferTabs" component={OfferTabs} />
			<Stack.Screen name="OfferDetails" component={OfferDetails} />
		</Stack.Navigator>
	);
}
