import { Pressable, Text, View } from "react-native";
import { tw } from "@kagua/lib";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const PrimaryBtn = ({ title, onPressed }) => {
	return (
		<Pressable
			onPress={onPressed}
			style={({ pressed }) =>
				tw.style(
					`bg-primary py-4 rounded-lg w-full flex-row justify-center ${pressed ? "opacity-90" : ""
					}`
				)
			}
		>
			<Text style={tw`text-secondary font-circular text-lg`}>{title} </Text>
		</Pressable>
	);
};

export const InlineBtn = ({ title, onPressed, style }) => {
	return (
		<Text style={tw`text-accent ${style}`} onPress={onPressed}>
			{title}
		</Text>
	);
};

export const GoBack = () => {
	const navigation = useNavigation();
	return (
		<Pressable onPress={() => navigation.goBack()} style={tw`pr-2`}>
			<AntDesign name="left" size={24} color={tw.color("bg-secondary")} />
		</Pressable>
	);
};
