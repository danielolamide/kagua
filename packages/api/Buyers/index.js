import { supabase, supabaseUrl } from "@kagua/lib";
import { asyncUpload } from "../Upload";

export const postBuyerInformation = async (buyerInformation) => {
	try {
		const { data, error } = await supabase
			.from("buyers")
			.insert([buyerInformation], { returning: "minimal" });
		if (error?.message) throw new Error(error.message);
		return data;
	} catch (e) {
		console.log(e.message);
		return;
	}
};

export const getBuyerInformation = async () => {
	const { data, error } = await supabase.from("buyers").select("*");
	if (error?.message) throw new Error(error.message);
	return data;
};

export const postCustomRequest = async (file, bucket, customRequestData) => {
	let uploadData;
	try {
		uploadData = await asyncUpload(file, bucket);
	} catch (e) {
		throw new Error(e?.message);
	}

	if (uploadData) {
		try {
			const { data, error } = await supabase.from("requests").insert(
				{
					...customRequestData,
					image: `${supabaseUrl}/storage/v1/object/public/${uploadData}`,
				},
				{ returning: "minimal" }
			);

			if (error?.message) throw new Error(error.message);
			return data;
		} catch (e) {
			throw new Error(e?.message);
		}
	}
};

export const getOpenRequestsById = async (id) => {
	const { data, error } = await supabase
		.from("requests")
		.select("*")
		.match({ status: "pending", requestor_id: id });

	if (error) throw new Error(error?.message);

	return data;
};

export const getClosedRequestsById = async (id) => {
	const { data, error } = await supabase
		.from("requests")
		.select("*, businesses(*)")
		.eq("requestor_id", id)
		.or("status.eq.successful, status.eq.cancelled, status.eq.accepted");

	if (error?.message) throw new Error(error?.message);

	return data;
};

export const postStatusRequestUpdate = async (request_id, status) => {
	const { data, error } = await supabase
		.from("requests")
		.update({ status })
		.match({ request_id });

	if (error?.message) throw new Error(error?.message);

	return data;
};

export const getOffersByRequestId = async (request_id) => {
	const { data, error, count } = await supabase
		.from("offers")
		.select("*, businesses ( * )", { count: "exact" })
		.match({ request_id });

	if (error?.message) throw new Error(error?.message);

	return { offers: data, count };
};

export const postExecutorID = async (request_id, executor_id) => {
	const { data, error } = await supabase
		.from("requests")
		.update({ executor_id })
		.match({ request_id });

	if (error?.message) throw new Error(error?.message);

	return data;
};
