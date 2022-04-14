import { Text as RNText } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { tw } from "@kagua/lib";

export const H1 = ({ children, style = "" }) => {
	return (
		<RNText
			style={tw.style(`font-circularBold ${style}`, {
				fontSize: responsiveFontSize(3.5),
			})}
		>
			{children}
		</RNText>
	);
};

export const H2 = ({ children, style = "" }) => {
	return (
		<RNText
			style={tw.style(`font-circularMedium ${style}`, {
				fontSize: responsiveFontSize(3),
			})}
		>
			{children}
		</RNText>
	);
};

export const H3 = ({ children, style = "" }) => {
	return (
		<RNText
			style={tw.style(`font-circular ${style}`, {
				fontSize: responsiveFontSize(2.5),
			})}
		>
			{children}
		</RNText>
	);
};

export const H3Bold = ({ children, style = "" }) => {
	return (
		<RNText
			style={tw.style(`font-circularMedium ${style}`, {
				fontSize: responsiveFontSize(2.5),
			})}
		>
			{children}
		</RNText>
	);
};

export const bgHighlight = ({ children, bgColor }) => {
	return <RNText style={tw`font-sfpro text-base ${style}`}>{children}</RNText>;
};

export const Text = ({ children, style = "" }) => {
	return <RNText style={tw`font-sfpro text-base text-black ${style}`}>{children}</RNText>;
};
