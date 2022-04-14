import { createContext, useContext, useState } from "react";
import { getUser } from "@kagua/api";
import Constants from "expo-constants";
import { AuthProvider } from "@kagua/ui/context/AuthContext";

const AppContext = createContext();
function AppProvider(props) {
	const [onboardingStage, setOnboardingStage] = useState(
		getUser()?.user_metadata.onboarding_stage
	);
	const appDefaults = {
		app: Constants.manifest.name,
		onboardingStage,
		setOnboardingStage,
	};

	return (
		<AppContext.Provider value={appDefaults}>
			<AuthProvider>{props.children}</AuthProvider>
		</AppContext.Provider>
	);
}

function useApp() {
	return useContext(AppContext);
}

export { AppProvider, useApp };

