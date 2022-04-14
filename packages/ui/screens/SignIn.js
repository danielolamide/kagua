import { SafeAreaView, View, Text, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { Image } from "react-native-elements";
import { InlineBtn, Input, PrimaryBtn } from "@kagua/ui";
import { tw } from "@kagua/lib";
import { useForm } from "react-hook-form";
import {
	responsiveScreenWidth,
	responsiveScreenHeight,
} from "react-native-responsive-dimensions";
import { handleSignIn } from "@kagua/api";
import Constants from "expo-constants";
import { DismissKeyboardView } from "../HOC/";

export default function SignIn({ navigation }) {
	const app = Constants.manifest.name;

	const BuyerMessage = () => {
		return (
			<Text style={tw`font-circular text-3xl`}>
				Discover quality, bespoke products from{" "}
				<Text style={tw`bg-secondary text-primary`}>
					trusted sellers on Kagua.
				</Text>
			</Text>
		);
	};

	const SellerMessage = () => {
		return (
			<Text style={tw`font-circular text-3xl`}>
				Keep your business{" "}
				<Text style={tw`bg-secondary text-primary`}>
					running both online and offline with Kagua.
				</Text>
			</Text>
		);
	};

	const isBuyer = () => (app === "Kagua" ? true : false);

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
								style={tw.style({
									height: responsiveScreenHeight(20),
									width: responsiveScreenWidth(50),
								})}
								source={require(`../assets/images/bot-logo.png`)}
								resizeMode="contain"
							/>
						</View>
						<View style={tw`py-4 items-center`}>
							{isBuyer() ? <BuyerMessage /> : <SellerMessage />}
						</View>
						<View style={tw`w-full py-4`}>
							<Input
								control={control}
								name="email"
								placeholder="Email"
								keyboardType="email-address"
								autoCapitalize="none"
							/>
							<Input
								control={control}
								name="password"
								placeholder="Password"
								secureTextEntry={true}
							/>
						</View>
						<PrimaryBtn
							title="Sign In"
							onPressed={handleSubmit((data) => handleSignIn(data))}
						/>
						<View style={tw`py-4 w-full items-center`}>
							<Text>
								Don't have an account?{" "}
								<InlineBtn
									title="Sign Up"
									onPressed={() => navigation.navigate("Sign Up")}
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
