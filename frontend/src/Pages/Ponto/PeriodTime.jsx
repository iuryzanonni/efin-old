import React, { useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles/";
import TextField from "@mui/material/TextField";

import { maskTime } from "../../Components/Masks";

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

	const handleEnterOrTabKeyPress = (event) => {
		if (event.key === "Enter" || event.key === "Tab") {
			let time = setarTime();
			props.funcSetTime({
				...props.time,
				[props.value]: time,
			});
		}
	};

	const handlerTime = useCallback((event) => {
		event = maskTime(event);
	}, []);

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
							onKeyUp={handlerTime}
							onChange={(event) => setThisTime(event.target.value)}
							onKeyDown={handleEnterOrTabKeyPress}
							InputProps={{
								classes: {
									notchedOutline: styles.borderTextField,
								},
								className: styles.displayTime,
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
