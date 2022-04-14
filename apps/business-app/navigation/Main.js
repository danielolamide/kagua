import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard, Orders, Profile } from "../screens/";
import { tw } from "@kagua/lib";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { SignIn } from "@kagua/ui/screens";
import { useQuery } from "react-query";
import { DEFAULT_DP } from "@kagua/ui/Images";
import { getBusinessInformation } from "@kagua/api";
import { useAuth } from "@kagua/ui/context/AuthContext";
import HomeStack from "./HomeStack";
import Offers from "./Offers";

const Tab = createBottomTabNavigator();

export default function Main() {
	const { user } = useAuth();
	const { isLoading, data, error } = useQuery(
		["getBusinessInformation", user.id],
		() => getBusinessInformation(user.id)
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
						case "Offers":
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
										uri: isLoading || error ? DEFAULT_DP : data[0].logo,
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
			<Tab.Screen name="Offers" component={Offers} />
			{/*<Tab.Screen name="Products" component={SignIn} />*/}
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}
