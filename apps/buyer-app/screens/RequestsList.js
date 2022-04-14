import {
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	View,
} from "react-native";
import { Text } from "@kagua/ui";
import { tw } from "@kagua/lib";
import { HorizontalImageCardWithStatus } from "@kagua/ui/components";
import { useQuery } from "react-query";
import { getOpenRequestsById, getClosedRequestsById } from "@kagua/api";
import { useAuth } from "@kagua/ui/context/AuthContext";
import { useCallback, useEffect } from "react";
import { Divider } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg";
import { EMPTY } from "@kagua/ui/Images";
import { responsiveScreenWidth, responsiveScreenHeight } from "react-native-responsive-dimensions";

export default function RequestsList({ navigation, route }) {
	const { user } = useAuth();
	const { name } = route;

	const { isLoading, error, data, refetch } =
		name === "Open"
			? useQuery(
				["getMyOpenRequests", user.id],
				() => getOpenRequestsById(user.id),
				{ enabled: false }
			)
			: useQuery(
				["getMyClosedRequest", user.id],
				() => getClosedRequestsById(user.id),
				{ enabled: false }
			);

	useFocusEffect(
		useCallback(() => {
			refetch({ throwOnError: true });
		}, [name])
	);

	const handleRefresh = () => refetch({ throwOnError: true });

	return (
		<View style={tw`bg-white flex-1 p-3`}>
			{isLoading && (
				<View style={tw`flex-1 justify-center items-center`}>
					<ActivityIndicator size="large" color={tw.color("bg-primary")} />
				</View>
			)}
			{data &&
				(data.length > 0 ? (
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => navigation.navigate("RequestDetails", { item })}
							>
								<HorizontalImageCardWithStatus data={item} />
							</TouchableOpacity>
						)}
						keyExtractor={(item, index) => item.request_id.toString()}
						ItemSeparatorComponent={() => (
							<View style={tw`py-2`}>
								<Divider width={2} color={tw.color("bg-muted")} />
							</View>
						)}
						onRefresh={handleRefresh}
						refreshing={isLoading}
					/>
				) : (
					<View style={tw`flex-1 justify-center items-center`}>
						<WithLocalSvg
							asset={EMPTY}
							width={responsiveScreenWidth(50)}
							height={responsiveScreenHeight(50)}
						/>
						<Text>No requests found</Text>
					</View>
				))}
			{error && <Text>{error}</Text>}
		</View>
	);
}
