import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { tw } from "@kagua/lib";
import { useQuery } from "react-query";
import { getBuyerInformation, handleSignOut } from "@kagua/api";
import { Avatar } from "@kagua/ui/components";
import { Text } from "@kagua/ui/Typography";
import { responsiveScreenHeight } from "react-native-responsive-dimensions";

export default function Profile() {
	const buyer = useQuery("getBuyerInformation", getBuyerInformation);
	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<View style={tw`p-3 flex-1`}>
				{buyer.data && (
					<View>
						<View style={tw`items-center`}>
							<Avatar
								size={64}
								name={buyer.data[0]?.username}
								image={buyer.data[0]?.dp}
							/>
							<Text>{buyer.data[0]?.username}</Text>
						</View>
					</View>
				)}
				<View style={tw.style({ marginVertical: responsiveScreenHeight(2) })}>
					<TouchableOpacity onPress={handleSignOut}>
						<Text>Sign Out</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}
