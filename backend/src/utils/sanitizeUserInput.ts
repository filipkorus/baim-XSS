import sanitizeHtml from 'sanitize-html';

const sanitizeUserInput = (input: string): string => {
	const sanitizedInput = sanitizeHtml(input, {
		allowedTags: ['b', 'i', 'em', 'strong', 'a'],
		allowedAttributes: {
			'a': ['href'] // allow attribute 'href' in 'a' tag
		}
	});
	return sanitizedInput;
}

export default sanitizeUserInput;
