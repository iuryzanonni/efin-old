import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Paper, Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles/";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { unstable_detectScrollType } from "@material-ui/utils";

const useStyles = makeStyles({
	paper: {
		backgroundColor: "#35373E",
		//width: window.screen.width,
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

export default function DayTime(props) {
	const styles = useStyles();
	const date = new Date("2021/10/30");

	const [time, setTime] = React.useState({
		Entrada: props.infoDay.Entrada,
		Almoço: props.infoDay.Almoço,
		Volta: props.infoDay.Volta,
		Saída: props.infoDay.Saída,
	});

	const handleChange = (prop) => (event) => {
		setTime({ ...time, [prop]: event.target.value });
	};

	const Point = (props) => {
		const [currentValue, setCurrentValue] = React.useState(
			time[props.value]
		);
		return (
			<Grid container direction="column">
				<Grid item xs={12}>
					<Typography>{props.value}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Grid container direction="row">
						<Grid item xs={6}>
							<TextField
								value={currentValue}
								onChange={(event) => {
									setCurrentValue(event.target.value);
								}}
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
									setTime({
										...time,
										[props.value]: currentValue,
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
					Object.keys(time).map((value) => {
						return (
							<Grid item xs={2}>
								<Point value={value} />
							</Grid>
						);
					})}
				<Grid item xs={1}>
					<Typography
						variant="h6"
						color={"green"}
						fontWeight={"bold"}
					>
						01:20
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
}
