import { useState } from "react";

export default function MultiStep({ components, onContinue, onSkip }) {
	const [step, setStep] = useState(0);

	return components[step];
}
