import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles/";

import DayTime from "./DayTime";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const useStyles = makeStyles({
	paper: {
		backgroundColor: "#35373E",
		width: window.screen.width,
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: 10,
		color: "#FFFFFF",
	},
	datePicker: {
		color: "#FFFFFF",
		height: 45,
	},
	hours: {
		color: "#FFFFFF !important",
		width: 100,
		height: 45,
	},
	text: {
		color: "#FFFFFF",
		fontWeight: "bold",
	},
	borderTextField: {
		borderColor: "#FFFFFF !important",
		borderWidth: "1px !important",
		borderRadius: 10,
	},
});

export default function Ponto() {
	const styles = useStyles();
	const dateNow = new Date();

	const [startDate, setStartDate] = React.useState(
		new Date(dateNow.getFullYear(), dateNow.getMonth(), 26)
	);

	const [endDate, setEndDate] = React.useState(
		new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 25)
	);

	const [hours, setHours] = React.useState("00:00");
	const [workingDay, setWorkingDay] = React.useState("08:00");
	const [time, setTime] = React.useState();

	const infoDay = {
		Entrada: new Date(2021, 11, 14, 10, 0),
		Almoço: new Date(2021, 11, 14, 15, 32),
		Volta: new Date(2021, 11, 14, 16, 0),
		Saída: new Date(2021, 11, 14, 18, 0),
	};

	// setTimeout(() => {
	// 	setTime(
	// 		String(dateNow.getHours()).padStart(2, "0") +
	// 			":" +
	// 			String(dateNow.getMinutes()).padStart(2, "0") +
	// 			":" +
	// 			String(dateNow.getSeconds()).padStart(2, "0")
	// 	);
	// }, 1000);

	const MenuPeriod = () => {
		return (
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Paper className={styles.paper}>
					<Grid
						container
						direction="row"
						alignItems="center"
						justifyContent="center"
					>
						<Grid item>
							<Typography className={styles.text}>
								Inicio&nbsp;&nbsp;
							</Typography>
						</Grid>
						<Grid item>
							<DesktopDatePicker
								value={startDate}
								onChange={(newValue) => {
									setStartDate(newValue);
								}}
								renderInput={(params) => (
									<TextField {...params} />
								)}
								InputProps={{
									classes: {
										notchedOutline: styles.borderTextField,
									},
									className: styles.datePicker,
								}}
							/>
						</Grid>

						<Grid item xs={1} />

						<Grid item>
							<Typography className={styles.text}>
								Fim&nbsp;&nbsp;
							</Typography>
						</Grid>
						<Grid item>
							<DesktopDatePicker
								value={endDate}
								onChange={(newValue) => {
									setEndDate(newValue);
								}}
								renderInput={(params) => (
									<TextField {...params} />
								)}
								InputProps={{
									classes: {
										notchedOutline: styles.borderTextField,
									},
									className: styles.datePicker,
								}}
							/>
						</Grid>

						<Grid item xs={1} />

						<Grid item>
							<Typography className={styles.text}>
								Banco de Horas&nbsp;&nbsp;
							</Typography>
						</Grid>
						<Grid item>
							<TextField
								id="sum-hour"
								variant="outlined"
								value={hours}
								InputProps={{
									classes: {
										notchedOutline: styles.borderTextField,
									},
									className: styles.hours,
								}}
							/>
						</Grid>

						<Grid item xs={1} />

						<Grid item>
							<Typography className={styles.text}>
								Carga Horária&nbsp;&nbsp;
							</Typography>
						</Grid>
						<Grid item>
							<TextField
								id="sum-hour"
								variant="outlined"
								value={workingDay}
								InputProps={{
									classes: {
										notchedOutline: styles.borderTextField,
									},
									className: styles.hours,
								}}
							/>
						</Grid>

						<Grid item xs={1} />

						{/* <Grid item>
							<TextField
								value={time}
								InputProps={{
									classes: {
										notchedOutline: styles.borderTextField,
									},
									className: styles.hours,
								}}
							/>
						</Grid> */}
					</Grid>
				</Paper>
			</LocalizationProvider>
		);
	};

	return (
		<Grid container spacing={1} direction="column">
			<Grid item xs={12}>
				<MenuPeriod />
			</Grid>
			;
			{[1, 0].map((index) => {
				return (
					<Grid key={index} item xs={12}>
						<DayTime infoDay={infoDay} />
					</Grid>
				);
			})}
		</Grid>
	);
}