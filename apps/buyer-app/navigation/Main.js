import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Onboarding, Dashboard, Profile } from "../screens/";
import HomeStack from "./HomeStack";
import Requests from "./Requests";
import { tw } from "@kagua/lib";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { useQuery } from "react-query";
import { getBuyerInformation } from "@kagua/api";
import { DEFAULT_DP } from "@kagua/ui/Images";

const Tab = createBottomTabNavigator();

export default function Main() {
	const { isLoading, data, error } = useQuery(
		"getBuyerInformation",
		getBuyerInformation
	);
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName = null;
					switch (route.name) {
						case "Home":
							iconName = "home";
							break;
						case "Requests":
							iconName = "profile";
							break;
						case "Products":
							iconName = "box";
							return <Feather name="box" size={size} color={color} />;
						case "Profile":
							return (
								<Avatar
									size={size}
									source={{
										uri: isLoading || error ? DEFAULT_DP : data[0]?.dp,
									}}
									rounded
								/>
							);
					}
					return <AntDesign name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: tw.color("bg-primary"),
				tabBarInactiveTintColor: tw.color("bg-gray"),
			})}
		>
			<Tab.Screen name="Home" component={HomeStack} />
			<Tab.Screen name="Requests" component={Requests} />
			{/*<Tab.Screen name="Orders" component={Onboarding} />*/}
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}
