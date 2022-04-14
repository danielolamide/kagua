import {
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "@kagua/ui/containers";
import { tw } from "@kagua/lib";
import { InlineBtn, PrimaryBtn, Text } from "@kagua/ui";
import { GoBack } from "@kagua/ui";
import { Badge, Divider, Image } from "react-native-elements";
import {
	responsiveScreenHeight,
	responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import ReadMore from "@fawazahmed/react-native-read-more";
import Accordion from "react-native-collapsible/Accordion";

export default function RequestDetails({ navigation, route }) {
	const { item } = route.params;
	return (
		<SafeAreaView>
			<View style={tw`flex-1 p-3`}>
				<View style={tw`flex-row items-center`}>
					<GoBack />
					<Text>{item.title}</Text>
				</View>
				<View style={tw`flex-1`}>
					<ScrollView>
						<View
							style={tw.style({ marginVertical: responsiveScreenHeight(2) })}
						>
							<Image
								source={{ uri: item.image }}
								style={tw.style("w-full", {
									height: responsiveScreenHeight(15),
								})}
								resizeMode="contain"
							/>
						</View>
						<View
							style={tw.style({ marginVertical: responsiveScreenHeight(1) })}
						>
							<Text style="font-circular text-sm text-primary">Title</Text>
							<Divider
								style={tw.style("bg-accent rounded-sm", {
									width: responsiveScreenWidth(5),
									height: responsiveScreenHeight(0.4),
								})}
							/>
							<Text>{item.title}</Text>
						</View>
						<View
							style={tw.style({ marginVertical: responsiveScreenHeight(1) })}
						>
							<Text style="font-circular text-sm text-primary">
								Description
							</Text>
							<Divider
								style={tw.style("bg-accent rounded-sm", {
									width: responsiveScreenWidth(5),
									height: responsiveScreenHeight(0.4),
								})}
							/>
							<ReadMore
								style={tw`text-base text-black font-sfpro`}
								seeMoreStyle={tw`font-circularMedium text-accent`}
								seeLessStyle={tw`font-circularMedium text-accent`}
							>
								{item.description}
							</ReadMore>
						</View>
					</ScrollView>
				</View>
				<View>
					<PrimaryBtn
						title="Make an Offer"
						onPressed={() =>
							navigation.navigate("CreateOffer", {
								id: item.request_id,
							})
						}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
