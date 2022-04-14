import { View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "@kagua/ui/containers";
import { tw } from "@kagua/lib";
import { PrimaryBtn, Text } from "@kagua/ui";
import { GoBack } from "@kagua/ui";
import { Divider, Image } from "react-native-elements";
import {
	responsiveScreenHeight,
	responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import ReadMore from "@fawazahmed/react-native-read-more";
import { useMutation } from "react-query";
import { deleteOfferById } from "@kagua/api";
import Toast from "react-native-toast-message";

export default function OfferDetails({ navigation, route }) {
	const { item } = route.params;
	const offerMutation = useMutation((data) => deleteOfferById(data.id));
	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<View style={tw`flex-1 p-3`}>
				<View style={tw`flex-row items-center`}>
					<GoBack />
					<Text>{item.requests.title}</Text>
				</View>
				<View style={tw`flex-1`}>
					<ScrollView>
						<View
							style={tw.style({ marginVertical: responsiveScreenHeight(2) })}
						>
							<Image
								source={{ uri: item.requests.image }}
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
							<Text>{item.requests.title}</Text>
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
								{item.requests.description}
							</ReadMore>
						</View>

						<View
							style={tw.style({ marginVertical: responsiveScreenHeight(1) })}
						>
							<Text style="font-circular text-sm text-primary">
								Your Message
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
						title="Delete Offer"
						onPressed={() => {
							Alert.alert(
								"Confirm",
								"Are you sure you want to delete your offer?",
								[
									{
										text: "Cancel",
										style: "cancel",
									},
									{
										text: "Delete",
										onPress: () => {
											offerMutation.mutate(
												{
													id: item.offer_id,
												},
												{
													onError: (error) =>
														Toast.show({
															type: "error",
															text1: error.message,
														}),
													onSuccess: () => {
														Toast.show({
															type: "success",
															text1: "Offer deleted successfully!",
														});
														navigation.navigate("OfferTabs");
													},
												}
											);
										},
									},
								]
							);
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
