import { supabase } from "@kagua/lib";

export const postBusinessInformation = async (businessInformation) => {
	try {
		const { data, error } = await supabase
			.from("businesses")
			.insert([businessInformation]);
		if (error?.message) throw new Error(error.message);
		return data;
	} catch (e) {
		console.log(e.message);
		return;
	}
};

export const getBusinessInformation = async (business_id) => {
	const { data, error } = await supabase
		.from("businesses")
		.select("*, categories(name)")
		.match({ business_id });
	if (error?.message) throw new Error(error.message);
	return data;
};

export const getOpenRequests = async () => {
	const { data, error } = await supabase
		.from("requests")
		.select("*")
		.match({ status: "pending" });

	if (error?.message) throw new Error(error.message);
	return data;
};

export const postOffer= async (description, request_id, business_id) => {
	const { data, error } = await supabase.from("offers").insert({
		request_id,
		business_id,
		description,
	});

	if (error?.message) throw new Error(error.message);
	return data;
};

//check for offers from business x whose requests have not been executed by any business
export const getOpenOffersById = async (business_id) => {
	const { data, error } = await supabase
		.from("offers")
		.select("*, requests!inner(*)")
		.eq("business_id", business_id)
		.is("requests.executor_id", null)
		.eq("requests.status", "pending");

	if (error?.message) throw new Error(error.message);
	//console.log("Open", data);

	return data;
};

//check for offers from business x whose requests have been executed by business that is not business x
export const getLostOffersById = async (business_id) => {
	const { data, error } = await supabase
		.from("offers")
		.select("*, requests!inner(*)")
		.eq("business_id", business_id)
		.not("requests.executor_id", "eq", business_id);

	if (error?.message) throw new Error(error.message);

	//console.log("Lost", data);
	return data;
};

//check for offers from business x whose request has been executed by business that is business x
export const getWonOffersById = async (business_id) => {
	const { data, error } = await supabase
		.from("offers")
		.select("*, requests!inner(*)")
		.eq("business_id", business_id)
		.eq("requests.executor_id", business_id);

	if (error?.message) throw new Error(error.message);

	//console.log("Won", data);
	return data;
};

export const deleteOfferById = async (offer_id) => {
	const {data, error} = await supabase
		.from("offers")
		.delete()
		.match({offer_id});

	if(error?.message) throw new Error(error.message);

	return data;
}
