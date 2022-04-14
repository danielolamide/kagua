export const getFileExt = (filename) => {
	return filename.split(".").pop();
};

export const getFileName = (uri) => {
	return uri.split("/").pop();
};

export const CardResource = (data) => {
	return {
		image: data.image ?? null,
		avatarTitle: getInitials(data.name || data.title) ?? null,
		cardTitle: ( data.title || data.name ) ?? null,
		cardDesc: data.description || null,
		cardStatus: data.status || null,
	};
};

export const getInitials = (str) => {
	let words = str.split(" ");
	return words[1] ? words[0][0].concat(words[1][0]).toUpperCase() : words[0][0];
};
