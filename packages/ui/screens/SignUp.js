import { tw } from "@kagua/lib";
import { useState } from "react";
import {
	SafeAreaView,
	Text,
	View,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Image } from "react-native-elements";
import { InlineBtn, Input, PrimaryBtn } from "@kagua/ui";
import { useForm } from "react-hook-form";
import { handleSignUp } from "@kagua/api";
import Constants from "expo-constants";
import { DismissKeyboardView } from "../HOC/";

export default function SignUp({ navigation }) {
	const [app, setApp] = useState(Constants.manifest.name);

	const BuyerMessage = () => {
		return (
			<Text style={tw`font-circular text-3xl`}>
				Bring your Pintrest boards to life by{" "}
				<Text style={tw`bg-secondary text-primary`}>
					discovering products on Kagua.
				</Text>
			</Text>
		);
	};

	const SellerMessage = () => {
		return (
			<Text style={tw`font-circular text-3xl`}>
				Take advantage of intelligent{" "}
				<Text style={tw`bg-secondary text-primary`}>
					business tools and grow with Kagua.
				</Text>
			</Text>
		);
	};

	const isBuyer = () => {
		return app == "Kagua" ? true : false;
	};

	const metaData = {
		isBusiness: isBuyer ? false : true,
		onboarding_stage: 1,
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	return (
		<KeyboardAvoidingView
			style={tw`flex-1`}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<SafeAreaView style={tw`flex-1 bg-white`}>
				<DismissKeyboardView style={tw`flex-1`}>
					<View style={tw`flex-1 p-3 justify-end `}>
						<View style={tw`py-8 w-full items-center`}>
							<Image
								style={tw.style("w-48 h-48")}
								source={require(`../assets/images/bot-logo.png`)}
								resizeMode="contain"
							/>
						</View>
						<View style={tw`py-4 items-center`}>
							{app == "Kagua" ? <BuyerMessage /> : <SellerMessage />}
						</View>
						<View style={tw`w-full py-4`}>
							<Input
								control={control}
								name="email"
								placeholder="Email"
								keyboardType="email-address"
							/>
							<Input
								control={control}
								name="password"
								placeholder="Password"
								secureTextEntry={true}
								autoCorrect={false}
							/>
						</View>
						<PrimaryBtn
							title="Sign Up"
							onPressed={handleSubmit((data) => handleSignUp(data, metaData))}
						/>
						<View style={tw`py-4 w-full items-center`}>
							<Text>
								Already have an account?{" "}
								<InlineBtn
									title="Sign In"
									onPressed={() => navigation.navigate("Sign In")}
								/>
							</Text>
						</View>
						<View style={tw`flex-1`}></View>
					</View>
				</DismissKeyboardView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
