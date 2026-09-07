export const request = (path, method, data) => {
	const isFormData = data instanceof FormData;

	return fetch('/api' + path, {
		headers: isFormData
			? undefined
			: {
					'content-type': 'application/json',
				},

		method: method || 'GET',

		body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
	}).then((res) => res.json());
};
