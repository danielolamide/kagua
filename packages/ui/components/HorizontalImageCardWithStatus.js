import { View } from "react-native";
import { Text } from "../Typography";
import { Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { tw, CardResource } from "@kagua/lib";
import Status from "./Status";

export default function HorizontalImageCardWithStatus({ data, mode }) {
	const { image, avatarTitle, cardTitle, cardDesc, cardStatus } =
		CardResource(data);
	return (
		<View>
			<View style={tw`flex-row  py-2`}>
				<Avatar
					size={44}
					source={{ uri: image }}
					rounded
					containerStyle={tw.style(`mr-3`, !image && "bg-secondary")}
					title={avatarTitle}
					titleStyle={tw`text-primary`}
				/>
				<View>
					<View style={tw`pb-1`}>
						<Text>{cardTitle}</Text>
						{mode === "orders" && <Text style="text-sm">{cardDesc}</Text>}
					</View>
					{cardStatus && <Status value={cardStatus} />}
				</View>
				<View style={tw`flex-1 flex-row justify-end items-center`}>
					<AntDesign name="right" color={tw.color("bg-secondary")} size={16} />
				</View>
			</View>
		</View>
	);
}
