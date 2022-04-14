import {
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuth } from "@kagua/ui/context/AuthContext";
import { useQuery } from "react-query";
import { getOpenOffersById, getLostOffersById, getWonOffersById } from "@kagua/api";
import { Text } from "@kagua/ui";
import { tw } from "@kagua/lib";
import { HorizontalImageCardWithStatus } from "@kagua/ui/components";
import { Divider } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { EMPTY } from "@kagua/ui/Images";
import { WithLocalSvg } from "react-native-svg";
import {
	responsiveScreenHeight,
	responsiveScreenWidth,
} from "react-native-responsive-dimensions";

export default function OfferList({ navigation, route }) {
	const { name } = route;
	const { user } = useAuth();
	const queries = {
		Open: useQuery(["getMyOpenOffers", user.id], () => getOpenOffersById(user.id), {
			enabled: false,
		}),
		Lost: useQuery(["getMyLostOffers", user.id], () => getLostOffersById(user.id), {
			enabled: false,
		}),
		Accepted: useQuery(["getMyWonOffers", user.id], () => getWonOffersById(user.id), {
			enabled: false,
		}),
	};
	const { isLoading, error, data, refetch } = queries[name];

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
						onRefresh={handleRefresh}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => navigation.navigate("OfferDetails", { item })}
							>
								<HorizontalImageCardWithStatus data={item.requests} />
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
						<Text>No offers found</Text>
					</View>
				))}
			{error && <Text>{error}</Text>}
		</View>
	);
}
