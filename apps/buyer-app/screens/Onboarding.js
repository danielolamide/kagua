import { tw, supabaseUrl } from "@kagua/lib";
import { H2, Input, Picker, PrimaryBtn, Text } from "@kagua/ui";
import { useEffect, useState } from "react";
import { Text as RNText, View, Pressable } from "react-native";
import { Image } from "react-native-elements";
import { useForm } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { uploadFile, getUser, postBuyerInformation, updateOnboarding } from "@kagua/api";
import { SafeAreaView } from "@kagua/ui/containers";
import { useApp } from "../context";

export default function Onboarding({ navigation }) {
	const { setOnboardingStage } = useApp();
	const { control, handleSubmit, setValue } = useForm({
		defaultValues: {
			userName: "",
			userImage: "",
			userPhone: "",
		},
	});

	const [selectedImage, setSelectedImage] = useState(null);

	const openImagePicker = async () => {
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Permission to access camera roll is required");
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync();

		if (pickerResult.cancelled === true) {
			return;
		}

		setSelectedImage(pickerResult);
	};

	useEffect(() => {
		navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
		return () =>
			navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
	}, [navigation]);

	useEffect(() => {
		setValue("userImage", selectedImage);
	}, [selectedImage]);

	const uploadBuyerInfo = async ({ userName, userImage, userPhone }) => {
		let photoData = null;
		const user = getUser();

		if (userImage) {
			photoData = await uploadFile(userImage);
		}

		let buyerInformation = {
			buyer_id: user.id,
			username: userName,
			dp: `${supabaseUrl}/storage/v1/object/public/${photoData}`,
			phone_number: userPhone,
		};

		let response = postBuyerInformation(buyerInformation);

		if (response) {
			updateOnboarding(2);
			setOnboardingStage(2);
		}
	};

	return (
		<SafeAreaView>
			<View style={tw`flex-1 p-3`}>
				<View style={tw`py-3 w-full`}>
					<H2 style="text-primary">
						Just a few more steps before you can{" "}
						<RNText style={tw`bg-secondary`}>
							start discovering on Kagua.
						</RNText>
					</H2>
				</View>
				<Pressable
					style={tw`items-center py-4 bg-primary`}
					onPress={openImagePicker}
				>
					{selectedImage ? (
						<Image
							source={{ uri: selectedImage.uri }}
							style={tw`h-48 w-48`}
							resizeMode="contain"
						/>
					) : (
						<>
							<View style={tw`py-4`}>
								<MaterialIcons
									name="add-a-photo"
									size={32}
									color={tw.color("bg-secondary")}
								/>
							</View>
							<Text style="text-secondary">Upload Profile Picture</Text>
						</>
					)}
				</Pressable>
				<View style={tw`py-2`}>
					<Input control={control} name="userName" placeholder="Username" />
					<Input
						control={control}
						name="userPhone"
						placeholder="Phone Number e.g +2547xxxx"
					/>
				</View>
			</View>
			<View style={tw`p-3`}>
				<PrimaryBtn title="Continue" onPressed={handleSubmit(uploadBuyerInfo)} />
			</View>
		</SafeAreaView>
	);
}
