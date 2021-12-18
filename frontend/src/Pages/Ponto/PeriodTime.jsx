import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
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

export const PeriodTime = (props) => {
	const styles = useStyles();
	const [currentValue, setCurrentValue] = React.useState(props.time[props.value]);
	const [thisTime, setThisTime] = React.useState("");

	useEffect(() => {
		setThisTime(currentValue.toLocaleTimeString());
	}, [currentValue]);

	const setarTime = () => {
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
	};

	const handleEnterKeyPress = (event) => {
		if (event.key === "Enter") {
			let time = setarTime();
			props.funcSetTime({
				...props.time,
				[props.value]: time,
			});
		}
	};

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
							onChange={(event) => setThisTime(event.target.value)}
							onKeyPress={handleEnterKeyPress}
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
							onClick={() => {
								let time = setarTime();
								props.funcSetTime({
									...props.time,
									[props.value]: time,
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