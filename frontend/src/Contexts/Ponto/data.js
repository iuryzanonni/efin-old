const dateNow = new Date();

export const pontoStates = {
	startDate: new Date(dateNow.getFullYear(), dateNow.getMonth(), 26),
	endDate: new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 25),
	hours: "00:00",
	workingDay: "08:00",
};
