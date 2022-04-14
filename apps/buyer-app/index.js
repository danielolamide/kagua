import "react-native-url-polyfill/auto";
import { registerRootComponent } from "expo";
import App from "./App";
import { AppProvider } from "./context";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { StatusBar } from "expo-status-bar";
import { FontsProvider } from "@kagua/ui";

function AppStart() {
	const queryClient = new QueryClient();

	return (
		<NavigationContainer>
			<QueryClientProvider client={queryClient}>
				<AppProvider>
					<StatusBar style="auto" />
					<FontsProvider>
						<App />
					</FontsProvider>
				</AppProvider>
			</QueryClientProvider>
		</NavigationContainer>
	);
}

registerRootComponent(AppStart);
