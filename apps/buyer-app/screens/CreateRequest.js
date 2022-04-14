import {
	View,
	Pressable,
	ScrollView,
} from "react-native";
import { Image } from "react-native-elements";
import { SafeAreaView } from "@kagua/ui/containers";
import { Text, GoBack, Input, TextArea, PrimaryBtn, Picker } from "@kagua/ui";
import { tw } from "@kagua/lib";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBusinessCategories, postCustomRequest } from "@kagua/api";
import { useMutation, useQuery } from "react-query";
import { useAuth } from "@kagua/ui/context/AuthContext";
import { useApp } from "../context";

export default function CreateRequest({ navigation }) {
	//TODO make image frame background color blend with color of image
	const [selectedImage, setSelectedImage] = useState(null);
	const { user } = useAuth();
	const { statusBarHeight } = useApp();
	const { control, handleSubmit, setValue } = useForm({
		defaultValues: {
			title: "",
			description: "",
			image: "",
			businessCategory: "",
		},
	});

	const { isLoading, data } = useQuery("get-categories", getBusinessCategories);

	useEffect(() => {
		setValue("image", selectedImage);
	}, [selectedImage]);

	const openImagePicker = async () => {
		let result = await ImagePicker.launchImageLibraryAsync();

		if (!result.cancelled) setSelectedImage(result);
	};

	//TODO change this to a useMutation
	//TODO in-app-notification for post response
	//TODO notification for business accounts
	//TODO loading indicators
	const submit = async ({ image, title, description, businessCategory }) => {
		try {
			await postCustomRequest(image, "products", {
				title,
				description,
				requestor_id: user.id,
				business_category_id: businessCategory,
			});

			navigation.navigate("Requests", { screen: "Open" });
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<SafeAreaView>
			<View style={tw`flex-1 p-3`}>
				<ScrollView>
					<View style={tw`flex-1`}>
						<View style={tw`flex-row items-center`}>
							<GoBack />
							<Text>Create A Custom Request</Text>
						</View>

						<Pressable
							style={tw`items-center py-4 bg-primary my-3`}
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
									<Text style="text-secondary">Upload Product Image</Text>
								</>
							)}
						</Pressable>

						<View>
							<Input
								name="title"
								control={control}
								placeholder="Title e.g I'm looking for a......"
							/>
							<TextArea
								name="description"
								control={control}
								placeholder="Description"
							/>
							<Picker
								items={data ? data : []}
								control={control}
								setValue={setValue}
								fieldName="businessCategory"
								schema={{ label: "name", value: "category_id" }}
							/>
						</View>
					</View>
				</ScrollView>
				<View>
					<PrimaryBtn title="Post Request" onPressed={handleSubmit(submit)} />
				</View>
			</View>
		</SafeAreaView>
	);
}
