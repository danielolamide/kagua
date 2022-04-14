import { getBusinessInformation, handleSignOut } from "@kagua/api";
import { SafeAreaView } from "@kagua/ui/containers";
import { tw } from "@kagua/lib";
import { View, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { Avatar } from "@kagua/ui/components";
import { responsiveScreenHeight } from "react-native-responsive-dimensions";
import { Text, H2, H3Bold } from "@kagua/ui/Typography";
import { FontAwesome } from "@expo/vector-icons";
import { GoBack } from "@kagua/ui";
import * as WebBrowser from "expo-web-browser";

export default function BusinessProfile({ route }) {
	//TODO linking to other applications
	const { businessParams } = route.params;
	const business = useQuery(
		["getBusinessData", businessParams.business_id],
		() => getBusinessInformation(businessParams.business_id)
	);
	const handleWebBrowser = (url) => {
		WebBrowser.openBrowserAsync(url);
	}
	return (
		<SafeAreaView>
			<View style={tw`flex-1 p-3`}>
				<View
					style={tw.style(`flex-row`, {
						marginBottom: responsiveScreenHeight(2),
					})}
				>
					<GoBack />
					<Text>{businessParams?.name}</Text>
				</View>
				{business.data && (
					<View>
						<View style={tw`items-center`}>
							<Avatar
								size={64}
								name={business.data[0].name}
								image={business.data[0].logo}
							/>
						</View>

						<View
							style={tw.style(`items-center`, {
								marginVertical: responsiveScreenHeight(1),
							})}
						>
							<H2>{business.data[0].name}</H2>
							<Text style="text-sm">{business.data[0].categories.name}</Text>
						</View>

						<View
							style={tw.style(`flex-row items-center`, {
								marginVertical: responsiveScreenHeight(2),
							})}
						>
							<TouchableOpacity
								style={tw.style(
									`flex-1 items-center p-2 mr-3 flex-row bg-primary rounded-lg justify-center`
								)}
								onPress={() => handleWebBrowser(business.data[0]?.social_urls.whatsapp)}
							>
								<FontAwesome
									name="whatsapp"
									size={32}
									//color={"#25D366"}
									color={tw.color("bg-secondary")}
									style={tw`px-1`}
								/>

								{/*<Text style="text-secondary">Whatsapp</Text>*/}
							</TouchableOpacity>
							<TouchableOpacity
								style={tw.style(
									`flex-1 items-center p-2 flex-row bg-primary rounded-lg justify-center`
								)}
								onPress={() => handleWebBrowser(business.data[0]?.social_urls.instagram)}
							>
								<FontAwesome
									name="instagram"
									size={32}
									//color={"#E1306C"}
									color={tw.color("bg-secondary")}
									style={tw`px-1`}
								/>
								{/*<Text style="text-secondary">Instagram</Text>*/}
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}
