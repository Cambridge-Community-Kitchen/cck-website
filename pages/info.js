import { useMemo } from 'react';
import { useRouter } from 'next/router';

const Info = () => {
	const router = useRouter();
	const browserLanguage = useMemo(
		() => window.navigator.language.split('-')[0],
	);

	if (browserLanguage) {
		router.replace(`${browserLanguage}.pdf`);
	}

	return <div>Redirecting...</div>;
};

export default Info;
