import { useContext } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { makeStyles } from "@material-ui/styles/";

import { GlobalPontoContext } from "../../Contexts/Ponto/index";

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

export const MenuPeriod = () => {
	const styles = useStyles();
	const _context = useContext(GlobalPontoContext);

	const {
		pontoContextState: { startDate, endDate, hours, workingDay },
		pontoContextState,
		setPontoContextState,
	} = _context;

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
								setPontoContextState({
									...pontoContextState,
									startDate: newValue,
								});
							}}
							renderInput={(params) => <TextField {...params} />}
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
								setPontoContextState({
									...pontoContextState,
									endDate: newValue,
								});
							}}
							renderInput={(params) => <TextField {...params} />}
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
