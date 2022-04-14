import { SafeAreaView, View } from "react-native";
import { tw } from "@kagua/lib";
import { H3, Text, SearchField } from "@kagua/ui";
import { Avatar, Divider } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

export default function Orders() {
	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<View style={tw`flex-1 p-3`}>
				<View>
					<H3>Orders</H3>
				</View>
				<View style={tw`py-2`}>
					<SearchField placeholder="Search by product, customer or status" />
				</View>
				<View style={tw`flex-1`}>
					<View>
						<View style={tw`flex-row  py-2`}>
							<Avatar
								title="MW"
								size={44}
								rounded
								containerStyle={tw`bg-secondary mr-3`}
								titleStyle={tw`text-primary`}
							/>
							<View>
								<View style={tw`pb-1`}>
									<Text>Mary Wambui</Text>
									<Text style="text-sm">Slide in table</Text>
								</View>
								<View style={tw`bg-aqua/50 px-2 rounded-md`}>
									<Text style="font-circularMedium text-primary">
										COMPLETED
									</Text>
								</View>
							</View>
							<View style={tw`flex-1 flex-row justify-end items-center`}>
								<AntDesign
									name="right"
									color={tw.color("bg-secondary")}
									size={16}
								/>
							</View>
						</View>
						<View style={tw`py-2`}>
							<Divider width={2} color={tw.color("bg-muted")} />
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
