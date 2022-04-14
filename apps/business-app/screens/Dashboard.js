import { FlatList, TouchableOpacity, View, ActivityIndicator } from "react-native";
//import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView } from "@kagua/ui/containers";
import { H3, Text } from "@kagua/ui";
import { tw } from "@kagua/lib";
import { AntDesign } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import { useQuery } from "react-query";
import { getOpenRequests } from "@kagua/api";
import { Avatar } from "@kagua/ui/components";

export default function Dashboard({ navigation }) {
	//TODO handle requests that business has already made an offer for
	const { isLoading, error, data } = useQuery(
		"getOpenRequests",
		getOpenRequests
	);
	return (
		<SafeAreaView>
			<View style={tw`flex-1 p-3`}>
				<View style={tw`flex-1 pt-4`}>
					<View style={tw`flex-row items-center pb-2`}>
						<View style={tw`flex-row items-center`}>
							<Text style="font-circular text-xl pr-1">Requests</Text>
							<AntDesign
								name="infocirlceo"
								color={tw.color("bg-secondary")}
								size={16}
							/>
						</View>
					</View>
					<View style={tw`flex-1`}>
						{data && (
							<FlatList
								data={data}
								keyExtractor={(item, index) => item.request_id.toString()}
								renderItem={({ item }) => {
									return (
										<TouchableOpacity
											onPress={() =>
												navigation.navigate("HomeBottomSheet", {
													screen: "RequestDetails",
													params: { item },
												})
											}
										>
											<View style={tw`flex-row items-center py-2`}>
												<Avatar
													image={item.image}
													title="MW"
													size={44}
													rounded
													containerStyle={tw`bg-secondary mr-3`}
													titleStyle={tw`text-primary`}
												/>
												<Text style="ml-2">{item.title}</Text>
												<View style={tw`flex-1 flex-row justify-end`}>
													<AntDesign
														name="right"
														color={tw.color("bg-secondary")}
														size={16}
													/>
												</View>
											</View>
										</TouchableOpacity>
									);
								}}
								ItemSeparatorComponent={() => (
									<View style={tw`py-2`}>
										<Divider width={2} color={tw.color("bg-muted")} />
									</View>
								)}
							/>
						)}
						{isLoading && (
							<View style={tw`flex-1 justify-center items-center`}>
								<ActivityIndicator
									size="large"
									color={tw.color("bg-primary")}
								/>
							</View>
						)}
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
