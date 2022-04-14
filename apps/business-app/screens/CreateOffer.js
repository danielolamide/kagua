import { View } from "react-native";
//import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaView } from "@kagua/ui/containers";
import { GoBack, PrimaryBtn, Text, TextArea } from "@kagua/ui";
import { tw } from "@kagua/lib";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postOffer } from "@kagua/api";
import { useAuth } from "@kagua/ui/context/AuthContext";
import Toast from "react-native-toast-message";

export default function CreateOffer({ navigation, route }) {
	const { id } = route.params;
	const { user } = useAuth();

	const { control, handleSubmit, setValue } = useForm({
		defaultValues: {
			description: "",
		},
	});

	const offerMutation = useMutation((data) =>
		postOffer(data.description, data.request_id, data.business_id)
	);

	const makeOffer = (data) => {
		offerMutation.mutate(
			{
				description: data.description,
				request_id: id,
				business_id: user.id,
			},
			{
				onError: (error) => console.log(error),
				onSuccess: () => {
					Toast.show({
						type: "success",
						text1: "Offer made successfully!",
					});
					setValue("description", "");
					navigation.reset({ index: 0, routes: [{ name: "Offers" }] });
				},
			}
		);
	};

	return (
		<SafeAreaView>
			<View style={tw`p-3 flex-1`}>
				<View style={tw`flex-row items-center`}>
					<GoBack />
					<Text>Create Offer</Text>
				</View>
				<View style={tw`flex-1 py-2`}>
					<TextArea
						name="description"
						control={control}
						placeholder="Write message to buyer"
					/>
				</View>
				<PrimaryBtn title="Send" onPressed={handleSubmit(makeOffer)} />
			</View>
		</SafeAreaView>
	);
}
