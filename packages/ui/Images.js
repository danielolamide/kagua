import { Image, Platform } from "react-native";
//import W_DISCOVERING from './assets/images/woman-discovering.svg'

if (Platform.OS === "web") {
	Image.resolveAssetSource = (source) => {
		return {
			uri: source,
		};
	};
}

const DEFAULT_DP = Image.resolveAssetSource(require("./assets/images/default-dp.png")).uri;
const EMPTY = Image.resolveAssetSource(require("./assets/images/empty.svg"));
const W_DISCOVERING = Image.resolveAssetSource(require('./assets/images/woman-discovering.svg'));
export { W_DISCOVERING, DEFAULT_DP, EMPTY }
