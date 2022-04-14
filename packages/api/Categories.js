import { supabase } from "@kagua/lib";

export const getBusinessCategories = async () => {
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.order("created_at", { ascending: true });
	if (error) throw new Error(error?.message);

	return data;
};
