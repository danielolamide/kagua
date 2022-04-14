import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const supabaseUrl = "https://ojlewbjitrpptsmwfnir.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY2MDg5MCwiZXhwIjoxOTU5MjM2ODkwfQ.dtMAHV3fgwBrrc7dWBZnh5uVgQ2KC0rct4Ke6ExyfQc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	localStorage: AsyncStorage,
});

export const handleSupabaseError = ({error, ...rest}) => {
	if(error){
		throw new Error(error?.message);
	}

	return rest;
}
