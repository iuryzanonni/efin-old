import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { DayTime } from "./DayTime";
import { PontoContext } from "../../Contexts/Ponto";
import MenuPeriod from "./MenuPeriod";
import axios from "axios";
import { APIBaseURL } from "../../Settings/Settings.json";
import Cookies from "js-cookie";

class InfoDay {
	constructor() {
		this.Date = null;
		this.Entrada = null;
		this.Almoço = null;
		this.Volta = null;
		this.Saída = null;
	}
}
export default function Ponto() {
	const [dataParsed, setDataParsed] = useState([]);
	const [period, setPeriod] = useState({});

	useEffect(() => {
		if (period.start) fetchTimes();
	}, [period]);

	const parseDay = (dateTime) => {
		if (dateTime === null) {
			return new Date(1900, 1, 1, 0, 0);
		}
		let date_str = dateTime.toString().split("T")[0].split("-");
		let time_str = dateTime.toString().split("T")[1].split(":");

		let date = new Date(
			parseInt(date_str[0]),
			parseInt(date_str[1]) - 1,
			parseInt(date_str[2]),
			parseInt(time_str[0]),
			parseInt(time_str[1])
		);

		return date;
	};

	const parseDateWork = (workDay) => {
		let day = new InfoDay();
		Object.keys(workDay).map((key) => {
			switch (key.toLowerCase()) {
				case "dateday":
					day.Date = parseDay(workDay[key]);
					break;
				case "startday":
					day.Entrada = parseDay(workDay[key]);
					break;
				case "stoplunch":
					day.Almoço = parseDay(workDay[key]);
					break;
				case "backlunch":
					day.Volta = parseDay(workDay[key]);
				case "endday":
					day.Saída = parseDay(workDay[key]);
			}
		});

		return day;
	};

	const parseData = (data) => {
		let aux = [];
		data.map((day) => {
			let workDay = parseDateWork(day);
			aux.push(workDay);
		});
		setDataParsed(aux);
	};

	const fetchTimes = () => {
		let url =
			APIBaseURL +
			"timework/getTimeWorkPeriod" +
			"?start=" +
			period.start.toISOString() +
			"&end=" +
			period.end.toISOString();
		axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${Cookies.get("FINLOGIN")}`,
				},
			})
			.then((res) => res.data)
			.then((data) => parseData(data));
	};

	return (
		<PontoContext>
			<Grid container spacing={1} direction="column">
				<Grid item xs={12}>
					<MenuPeriod setDate={setPeriod} />
				</Grid>
				{dataParsed.map((day, index) => {
					return (
						<Grid key={index} item xs={12}>
							<DayTime infoDay={day} />
						</Grid>
					);
				})}
			</Grid>
		</PontoContext>
	);
}
