import { supabase } from "@kagua/lib";

export const handleSignUp = async (signUpData, metaData) => {
	const { user, error } = await supabase.auth.signUp(signUpData, {
		data: metaData
	});
};

export const handleSignIn = async (data) => {
	const { user, session, error } = await supabase.auth.signIn(data);
};

export const handleSignOut = async () => {
	const { error } = await supabase.auth.signOut();
};

export const getUser = () => {
	const user = supabase.auth.user();
	return user;
}

export const updateOnboarding = async (onboarding_stage) => {
	try {
		const { user, error } = await supabase.auth.update({
			data: {
				"onboarding_stage": onboarding_stage
			}
		});
		if (error?.message) throw new Error(error?.message);
		return user;
	} catch (e) {
		console.log(e?.message);
		return;
	}
}

