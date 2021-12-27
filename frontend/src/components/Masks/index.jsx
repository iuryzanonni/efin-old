export const maskTime = (event) => {
	event.target.maxLength = 5;

	let value = event.target.value;
	value = value.replace(/^(\d{2})(\d)/, "$1:$2");
	event.target.value = value;
	return event;
};
