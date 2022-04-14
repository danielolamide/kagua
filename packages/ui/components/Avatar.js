import { Avatar as RNEAvatar } from "react-native-elements";
import { getInitials, tw } from "@kagua/lib";

export default function Avatar({ size, image, name }) {
	const avatarTitle = name ? getInitials(name) : "KB";
	return (
		<RNEAvatar
			size={size}
			source={{ uri: image }}
			rounded
			containerStyle={tw.style(``, !image && "bg-secondary")}
			title={avatarTitle}
			titleStyle={tw`text-white`}
		/>
	);
}
