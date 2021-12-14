import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Typography, Paper, Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles/";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";

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

const Point = (props) => {
	const styles = useStyles();
	const [currentValue, setCurrentValue] = React.useState(
		props.time[props.value]
	);
	const [thisTime, setThisTime] = React.useState("aaaa");

	useEffect(() => {
		setThisTime(currentValue.toLocaleTimeString());
	}, [currentValue]);

	function setarTime() {
		const newTime = thisTime.split(":");
		const newDate = new Date(
			currentValue.getFullYear(),
			currentValue.getMonth(),
			currentValue.getDate(),
			newTime[0],
			newTime[1]
		);
		setCurrentValue(newDate);
		return newDate;
	}
	return (
		<Grid container direction="column">
			<Grid item xs={12}>
				<Typography>{props.value}</Typography>
			</Grid>
			<Grid item xs={12}>
				<Grid container direction="row">
					<Grid item xs={6}>
						<TextField
							value={thisTime}
							onChange={(event) =>
								setThisTime(event.target.value)
							}
							InputProps={{
								classes: {
									notchedOutline: styles.borderTextField,
								},
								className: styles.displayTime,
							}}
						/>
					</Grid>
					<Grid item xs={2}>
						<IconButton
							color="primary"
							aria-label="upload picture"
							component="span"
							onClick={() => {
								let vallor = setarTime();
								props.funcSetTime({
									...props.time,
									[props.value]: vallor,
								});
							}}
							style={{ color: "#FFFFFF" }}
						>
							<CheckIcon />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default function DayTime(props) {
	const styles = useStyles();
	const date = new Date("2021/12/14");

	const [time, setTime] = React.useState({
		Entrada: props.infoDay.Entrada,
		Almoço: props.infoDay.Almoço,
		Volta: props.infoDay.Volta,
		Saída: props.infoDay.Saída,
	});

	useEffect(() => diffHours, [time]);

	const diffHours = () => {
		let diffMinutes =
			(time.Saída.getTime() -
				time.Entrada.getTime() -
				(time.Volta.getTime() - time.Almoço.getTime())) /
			(1000 * 60);
		let hours = Math.trunc(diffMinutes / 60);
		let minutes = diffMinutes % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<Paper className={styles.paper}>
			<Grid
				container
				direction="row"
				alignItems="center"
				justifyContent="center"
			>
				<Grid item xs={2}>
					<Typography variant="h6">
						{date.toLocaleDateString(undefined, {
							weekday: "long",
						})}
					</Typography>
					<Typography>{date.toLocaleDateString()}</Typography>
				</Grid>
				{time &&
					Object.keys(time).map((value, index) => {
						return (
							<Grid key={index} item xs={2}>
								<Point
									value={value}
									time={time}
									funcSetTime={setTime}
								/>
							</Grid>
						);
					})}
				<Grid item xs={1}>
					<Typography
						variant="h6"
						color={"green"}
						fontWeight={"bold"}
					>
						{diffHours(time.Saída, time.Entrada)}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
}
