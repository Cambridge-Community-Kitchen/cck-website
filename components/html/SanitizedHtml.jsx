import sanitizeHtml from 'sanitize-html';

export const sanitize = (original) => sanitizeHtml(
	original, {
		nonBooleanAttributes: sanitizeHtml.defaults.nonBooleanAttributes.filter(
			attrName => !/^on/.test(attrName)
		)
	}
);

export const SanitizedHtml = ({ html = '' }) => {
	return (
		<div
			dangerouslySetInnerHTML={{'__html' : sanitize(html)}}
		/>
	);
};
