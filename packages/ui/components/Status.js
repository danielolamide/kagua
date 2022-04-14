import { tw } from "@kagua/lib";
import { View } from "react-native";
import { Text } from "../Typography";

export default function Status({ value }) {
	const bg = {
		completed: "bg-aqua/50",
		accepted: "bg-aqua/50",
		successful: "bg-aqua/50",
		pending: "bg-secondary/50",
		cancelled: "bg-accent/50",
	};
	return (
		<View style={tw`items-start`}>
			<View style={tw`${bg[value]} justify-center px-2 rounded-md`}>
				<Text style="font-circularMedium text-primary uppercase">{value}</Text>
			</View>
		</View>
	);
}
