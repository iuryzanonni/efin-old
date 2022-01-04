import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Typography, Paper } from "@mui/material";
import { makeStyles } from "@material-ui/styles/";

import { PeriodTime } from "./PeriodTime";

const useStyles = makeStyles({
	paper: {
		backgroundColor: "#35373E",
		color: "#FFFFFF",
		paddingBlock: 10,
	},
	borderTextField: {
		borderColor: "#FFFFFF !important",
		borderWidth: "1px !important",
		borderRadius: 10,
	},
	displayTime: {
		color: "#FFFFFF",
		width: 150,
		height: 40,
	},
});

export const DayTime = (props) => {
	const styles = useStyles();

	const [time, setTime] = React.useState({
		Date: props.infoDay.Date,
		Entrada: props.infoDay.Entrada,
		Almoço: props.infoDay.Almoço,
		Volta: props.infoDay.Volta,
		Saída: props.infoDay.Saída,
	});

	useEffect(() => diffHours, [time]);

	const diffHours = () => {
		let diffMinutes =
			(time.Saída.getTime() - time.Entrada.getTime() - (time.Volta.getTime() - time.Almoço.getTime())) /
			(1000 * 60);
		let hours = Math.trunc(diffMinutes / 60);
		let minutes = diffMinutes % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
	};
	return (
		<Paper className={styles.paper}>
			<Grid container direction="row" alignItems="center" justifyContent="center">
				<Grid item xs={2}>
					<Typography variant="h6">
						{time.Date.toLocaleDateString(undefined, {
							weekday: "long",
						})}
					</Typography>
					<Typography>{time.Date.toLocaleDateString()}</Typography>
				</Grid>
				{time &&
					Object.keys(time).map((value, index) => {
						if (index != 0) {
							return (
								<Grid key={index} item xs={2}>
									<PeriodTime value={value} time={time} funcSetTime={setTime} />
								</Grid>
							);
						}
					})}
				<Grid item xs={1}>
					<Typography variant="h6" color={"green"} fontWeight={"bold"}>
						{diffHours(time.Saída, time.Entrada)}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};
