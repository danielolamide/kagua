import { tw, supabaseUrl } from "@kagua/lib";
import { H2, Input, Picker, PrimaryBtn, Text } from "@kagua/ui";
import { useEffect, useState } from "react";
import { Text as RNText, View, Pressable } from "react-native";
import { SafeAreaView } from "@kagua/ui/containers";
import { Image } from "react-native-elements";
import { useForm } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useQuery } from "react-query";
import {
	getBusinessCategories,
	postBusinessInformation,
	uploadFile,
	getUser,
} from "@kagua/api";

export default function OnboardingOne({ navigation }) {
	const { control, handleSubmit, setValue } = useForm({
		defaultValues: {
			businessName: "",
			businessCategory: "",
			businessImage: "",
			businessWhatsApp: "",
			businessInstagram: "",
		},
	});

	const [selectedImage, setSelectedImage] = useState(null);

	const { isLoading, data } = useQuery("get-categories", getBusinessCategories);

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
		setValue("businessImage", selectedImage);
	}, [selectedImage]);

	const uploadBusinessInfo = async ({
		businessName,
		businessImage,
		businessWhatsApp,
		businessInstagram,
		businessCategory,
	}) => {
		let photoData = null;
		const user = getUser();

		if (businessImage) {
			photoData = await uploadFile(businessImage);
		}

		let businessInformation = {
			name: businessName,
			category_id: businessCategory,
			logo: `${supabaseUrl}/storage/v1/object/public/${photoData}`,
			social_urls: {
				Insagram: businessInstagram,
				WhatsApp: businessWhatsApp,
			},
			owner_id: user.id,
		};

		let response = postBusinessInformation(businessInformation);

		if (response) {
			navigation.navigate("Main");
		}
	};

	return (
		<SafeAreaView>
			<View style={tw`flex-1 p-3`}>
				<View style={tw`py-3 w-full`}>
					<H2 style="text-primary">
						Just a few more steps before you can{" "}
						<RNText style={tw`bg-secondary`}>get discovered on Kagua.</RNText>
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
							<Text style="text-secondary">Upload Business Logo</Text>
						</>
					)}
				</Pressable>
				<View style={tw`py-2`}>
					<Input
						control={control}
						name="businessName"
						placeholder="Business Name"
					/>
					<Input
						control={control}
						name="businessWhatsApp"
						placeholder="Business Whatsapp Contact"
					/>
					<Input
						control={control}
						name="businessInstagram"
						placeholder="Business Instagram Profile URL"
					/>
					{/*{data && (*/}
					<Picker
						items={data ? data : []}
						control={control}
						setValue={setValue}
						fieldName="businessCategory"
						schema={{ label: "name", value: "category_id" }}
					/>
					{/*)}*/}
				</View>
			</View>
			<View style={tw`p-3`}>
				<PrimaryBtn
					title="Continue"
					onPressed={handleSubmit(uploadBusinessInfo)}
				/>
			</View>
		</SafeAreaView>
	);
}
