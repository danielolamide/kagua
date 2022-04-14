import { GoBack, InlineBtn, PrimaryBtn, Text } from "@kagua/ui";
import { SafeAreaView } from "@kagua/ui/containers";
import { tw } from "@kagua/lib";
import {
	ScrollView,
	View,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { Badge, Divider, Image } from "react-native-elements";
import { Avatar } from "@kagua/ui/components";
import Accordion from "react-native-collapsible/Accordion";
import ReadMore from "@fawazahmed/react-native-read-more";
import { AntDesign } from "@expo/vector-icons";
import {
	responsiveScreenHeight,
	responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import { useState, useEffect } from "react";
import {
	postStatusRequestUpdate,
	getOffersByRequestId,
	postExecutorID,
} from "@kagua/api";
import { useMutation, useQuery } from "react-query";

export default function RequestDetails({ route, navigation }) {
	const { item } = route.params;

	const [activeSection, setActiveSection] = useState([]);

	const { error, data, isLoading } = useQuery(
		["getRequestOffers", item.request_id],
		() => getOffersByRequestId(item.request_id)
	);

	const toggleCancelRequest = useMutation((data) =>
		postStatusRequestUpdate(data.requestID, data.status)
	);

	const acceptRequest = useMutation((data) =>
		postStatusRequestUpdate(data.requestID, data.status)
	);

	const setExecutorID = useMutation((data) =>
		postExecutorID(data.requestID, data.executorID)
	);

	const _renderHeader = (section, index, isActive) => {
		return (
			<View
				style={tw.style({
					marginVertical: responsiveScreenHeight(1),
				})}
			>
				<View style={tw`flex-row items-center`}>
					<Avatar
						size={32}
						name={section.businesses.name}
						image={section.businesses.logo}
					/>
					<Text>{section.businesses.name}</Text>
					<View style={tw`flex-1 flex-row justify-end`}>
						<AntDesign
							name={isActive ? "down" : "right"}
							size={14}
							color={tw.color("bg-secondary")}
						/>
					</View>
				</View>
			</View>
		);
	};

	const _renderContent = (section) => {
		return (
			<View style={tw.style({ marginBottom: responsiveScreenHeight(1) })}>
				<Text>{section.description}</Text>
				<View style={tw`items-start my-1`}>
					<TouchableOpacity
						style={tw.style("bg-primary rounded-md p-1")}
						onPress={() =>
							acceptRequest.mutate(
								{
									requestID: section.request_id,
									status: "accepted",
								},
								{
									onError: (error) => console.log(error?.message),
									onSuccess: () => {
										setExecutorID.mutate(
											{
												requestID: section.request_id,
												executorID: section.business_id,
											},
											{
												onError: (error) => console.log(error?.message),
												onSuccess: () =>
													navigation.navigate("RequestTabs", {
														screen: "Closed",
													}),
											}
										);
									},
								}
							)
						}
					>
						<Text style="text-secondary">Accept Bid</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView>
			<View style={tw`flex-1 p-3`}>
				<View style={tw`flex-row items-center`}>
					<GoBack />
					<Text>{item.title}</Text>
				</View>
				<View style={tw`flex-1`}>
					<ScrollView nestedScrollEnabled={true}>
						<View>
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
								<View
									style={tw.style({
										marginVertical: responsiveScreenHeight(3),
									})}
								>
									<View style={tw`flex-row items-center w-full`}>
										<Text style="font-circular text-primary">Offers</Text>
										<Badge
											value={data?.count ?? 0}
											badgeStyle={tw`mx-1 bg-primary`}
											textStyle={tw`text-secondary font-circular`}
										/>
										{data?.count > 1 && (
											<View style={tw`flex-1 justify-end flex-row`}>
												<InlineBtn
													title="See More"
													onPressed={() => navigation.navigate("SeeMoreOffers")}
												/>
											</View>
										)}
									</View>
									{data?.count <= 0 && item.status != "cancelled" && (
										<Text> No offers have been made yet.</Text>
									)}
									{data?.offers && item.status == "pending" && (
										<Accordion
											sections={data.offers}
											activeSections={activeSection}
											renderContent={_renderContent}
											renderHeader={_renderHeader}
											onChange={(activeSection) =>
												setActiveSection(activeSection)
											}
											underlayColor={tw.color("bg-blue-100")}
										/>
									)}
									{item.executor_id && item.status == "accepted" && (
										<TouchableOpacity
											onPress={() =>
												navigation.navigate("BusinessProfile", {
													businessParams: item.businesses[0],
												})
											}
										>
											<Text>
												You accepted an offer from,{" "}
												<Text style="text-accent underline">
													{item.businesses[0]?.name}
												</Text>
											</Text>
										</TouchableOpacity>
									)}
									{item.status == "cancelled" && (
										<Text>You cancelled this request</Text>
									)}
									{error && <Text>{error}</Text>}
									{isLoading && (
										<ActivityIndicator
											size="small"
											color={tw.color("bg-secondary")}
										/>
									)}
								</View>
							</View>
						</View>
					</ScrollView>
				</View>
				{/*TODO add alert to confirm request cancellation/delete*/}
				{item.status != "accepted" && (
					<View>
						<PrimaryBtn
							title={
								item.status === "cancelled"
									? "Re-open Request"
									: "Cancel Request"
							}
							onPressed={
								item.status === "cancelled"
									? () =>
										toggleCancelRequest.mutate(
											{
												requestID: item.request_id,
												status: "pending",
											},
											{
												onError: (error) => console.log(error?.message),
												onSuccess: () =>
													navigation.navigate("RequestTabs", {
														screen: "Open",
													}),
											}
										)
									: () =>
										toggleCancelRequest.mutate(
											{
												requestID: item.request_id,
												status: "cancelled",
											},
											{
												onError: (error) => console.log(error?.message),
												onSuccess: () =>
													navigation.navigate("RequestTabs", {
														screen: "Closed",
													}),
											}
										)
							}
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
}
