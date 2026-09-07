export const shareLink = async (title) => {
	const url = window.location.href;

	if (navigator.share) {
		await navigator.share({
			title,
			url,
		});
	} else if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(url);
	}
};
