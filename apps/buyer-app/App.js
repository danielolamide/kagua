import 'expo-dev-client';
import { Unauthenticated } from "@kagua/ui/navigation";
import { Authenticated } from "./navigation";
import { useAuth } from "@kagua/ui/context/AuthContext";
import { LogBox } from "react-native";

export default function App() {
	const { session, user } = useAuth();
	LogBox.ignoreLogs(['Setting a timer']);

	return !session ? <Unauthenticated /> : <Authenticated />;
}
