import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { DayTime } from "./DayTime";
import { PontoContext } from "../../Contexts/Ponto";
import { MenuPeriod } from "./MenuPeriod";
import axios from "axios";
import { APIBaseURL } from "../../Settings/Settings.json";

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
	useEffect(() => {
		fetchTimes();
	}, []);

	const infoDay = {
		Entrada: new Date(2021, 11, 14, 10, 0),
		Almoço: new Date(2021, 11, 14, 15, 32),
		Volta: new Date(2021, 11, 14, 16, 0),
		Saída: new Date(2021, 11, 14, 18, 0),
	};

	const [dataParsed, setDataParsed] = useState([]);

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
		axios
			.get(APIBaseURL + "timework")
			.then((res) => res.data)
			.then((data) => parseData(data));
	};

	return (
		<PontoContext>
			<Grid container spacing={1} direction="column">
				<Grid item xs={12}>
					<MenuPeriod />
				</Grid>
				{console.log(dataParsed)}
				{dataParsed.map((day, index) => {
					return (
						<Grid key={index} item xs={12}>
							<DayTime infoDay={day} />
						</Grid>
					);
				})}
			</Grid>
			<Grid>
				<Button
					onClick={() => {
						console.log(infoDay, dataParsed);
					}}
				>
					Teste
				</Button>
			</Grid>
		</PontoContext>
	);
}
