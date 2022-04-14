import { useState } from "react";
import { View, TextInput } from "react-native";
import { tw } from "@kagua/lib";
import { Controller } from "react-hook-form";
import DropDownPicker from "react-native-dropdown-picker";
import { SearchBar } from "react-native-elements";
import {
	responsiveScreenHeight,
	responsiveScreenWidth,
} from "react-native-responsive-dimensions";

export const Input = (props) => {
	return (
		<View
			style={tw.style("px-2 web:py-2 rounded-lg my-2 border-gray pb-2", {
				borderWidth: 1,
			})}
		>
			<Controller
				control={props.control}
				rules={props.rules}
				render={({ field: { onChange, value } }) => (
					<TextInput
						style={tw.style(`text-lg h-10 font-circular`)}
						{...props}
						onChangeText={(text) => onChange(text)}
						value={value}
						placeholderTextColor={tw.color("bg-gray")}
						autoCorrect={false}
					/>
				)}
				name={props.name}
			/>
		</View>
	);
};

export const TextArea = (props) => {
	return (
		<View
			style={tw.style("px-2 web:py-2 rounded-lg my-2 border-gray pb-2", {
				borderWidth: 1,
			})}
		>
			<Controller
				control={props.control}
				rules={props.rules}
				render={({ field: { onChange, value } }) => (
					<TextInput
						style={tw.style(`text-lg font-circular justify-start`, {
							height: responsiveScreenHeight(15),
							paddingVertical: responsiveScreenHeight(1),
						})}
						{...props}
						onChangeText={(text) => onChange(text)}
						value={value}
						placeholderTextColor={tw.color("bg-gray")}
						autoCorrect={false}
						multiline={true}
						textAlignVertical="top"
					/>
				)}
				name={props.name}
			/>
		</View>
	);
};

export const Picker = (
	{ items, control, rules, setValue, schema, loading, fieldName },
	props
) => {
	const [open, setOpen] = useState(false);
	const [itemValue, setItemValue] = useState(null);
	DropDownPicker.setListMode("SCROLLVIEW");
	return (
		<Controller
			control={control}
			rules={rules}
			render={({ field: { onChange, value } }) => (
				<DropDownPicker
					style={tw`border-gray my-2`}
					dropDownDirection="TOP"
					schema={schema}
					items={items}
					value={itemValue}
					setValue={setItemValue}
					open={open}
					setOpen={setOpen}
					textStyle={tw`font-circular text-lg`}
					placeholder="Business Category"
					placeholderStyle={{ color: tw.color("bg-gray") }}
					onChangeValue={(value) => {
						onChange(value);
						setValue(fieldName, value);
					}}
					loading={loading}
				/>
			)}
		/>
	);
};

export const SearchField = ({ placeholder }) => {
	return (
		<SearchBar
			containerStyle={tw.style("bg-white p-0", {
				borderBottomWidth: 0,
				borderTopWidth: 0,
			})}
			inputContainerStyle={tw.style("rounded-lg bg-muted")}
			inputStyle={tw.style("font-sfpro text-base pb-1 web:py-2")}
			placeholder={placeholder}
			placeholderTextColor={tw.color("bg-black")}
			searchIcon={{ color: tw.color("bg-black") }}
		/>
	);
};
