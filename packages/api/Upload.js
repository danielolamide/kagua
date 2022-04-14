import { supabase, getFileExt, getFileName } from "@kagua/lib";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

export const uploadFile = async (file) => {
	let fileBase64 = null;
	try {
		fileBase64 = await FileSystem.readAsStringAsync(file.uri, {
			encoding: FileSystem.EncodingType.Base64,
		});
	} catch (e) {
		console.log(e?.message);
	}

	let fileName = getFileName(file.uri);

	let ext = getFileExt(fileName);

	try {
		let { data, error } = await supabase.storage
			.from("dps")
			.upload(`${fileName}`, decode(fileBase64), {
				contentType: `image/${ext}`,
			});
		if (error?.message) throw new Error(error.message);
		return data.Key;
	} catch (e) {
		return e?.message;
	}
};

export const asyncUpload = async (file, bucket) => {
	let fileBase64;
	try {
		fileBase64 = await FileSystem.readAsStringAsync(file.uri, {
			encoding: FileSystem.EncodingType.Base64,
		});
	} catch (e) {
		throw new Error(e?.message);
	}

	let fileName = getFileName(file.uri);

	let ext = getFileExt(fileName);

	try {
		const { data, error } = await supabase.storage
			.from(`${bucket}`)
			.upload(`${fileName}`, decode(fileBase64), {
				contentType: `image/${ext}`,
			});

		if (error?.message) throw new Error(error?.messsage);
		return data.Key;
	} catch (e) {
		throw new Error(e?.message);
	}
};
