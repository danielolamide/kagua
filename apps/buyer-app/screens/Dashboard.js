import { View } from "react-native";
import { tw } from "@kagua/lib";
import { H2, PrimaryBtn } from "@kagua/ui";
import { useEffect, useState } from "react";
import {
	responsiveScreenHeight,
	responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import { WithLocalSvg } from "react-native-svg";
import { W_DISCOVERING } from "@kagua/ui/Images";
import { SafeAreaView } from "@kagua/ui/containers";
import { useAuth } from "@kagua/ui/context/AuthContext";

export default function Dashboard({ navigation }) {
	const { user } = useAuth();
	const [suggestion, setSuggestion] = useState(0);
	//TODO these should be fetched from the database
	const suggestions = [
		"An off-shoulder dress",
		"A book",
		"A flute",
		"An iPhone",
		"Italian food",
	];

	useEffect(() => {
		const intervalID = setInterval(() => {
			setSuggestion((prevSuggestion) => prevSuggestion + 1);
		}, 1500);

		return () => clearInterval(intervalID);
	}, []);

	let carousel = suggestions[suggestion % suggestions.length];

	return (
		<SafeAreaView>
			<View style={tw`flex-1 p-3`}>
				<View style={tw.style({ paddingTop: responsiveScreenHeight(1) })}>
					<H2>Hi {user.user_metadata.username ?? null}</H2>
				</View>
				<View
					style={tw.style({
						marginTop: responsiveScreenHeight(1),
						marginBottom: responsiveScreenHeight(3),
					})}
				>
					<H2 style="text-primary">
						What are you looking for today?{" "}
						<H2 style="bg-secondary">{carousel}</H2>
					</H2>
				</View>
				{/*<View>*/}
				{/*<SearchField placeholder="Search for a product" />*/}
				{/*</View>*/}
				{/*<View*/}
				{/*style={tw.style("flex-row items-center", {*/}
				{/*marginVertical: responsiveScreenHeight(3),*/}
				{/*})}*/}
				{/*>*/}
				{/*<Divider style={tw`flex-1`} />*/}
				{/*<View style={tw`px-2`}>*/}
				{/*<Text style="text-gray uppercase">or</Text>*/}
				{/*</View>*/}
				{/*<Divider style={tw`flex-1`} />*/}
				{/*</View>*/}
				{/*<View>*/}
				{/*<Text>*/}
				{/*Not found what you're looking for?{" "}*/}
				{/*<InlineBtn*/}
				{/*title="Create a custom request"*/}
				{/*onPressed={() => navigation.navigate("Create A Request")}*/}
				{/*/>*/}
				{/*</Text>*/}
				{/*</View>*/}

				<View style={tw`flex-1 justify-center items-center`}>
					<WithLocalSvg
						asset={W_DISCOVERING}
						width={responsiveScreenWidth(80)}
						height={responsiveScreenHeight(80)}
					/>
				</View>
				<View>
					<PrimaryBtn
						title="Create a Request"
						onPressed={() => navigation.navigate("Create A Request")}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
