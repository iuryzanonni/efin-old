/*SE DER ERRADO: mui.com/components/tabs/*/
import * as React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
	paper: {
		backgroundColor: "#174276",
		height: 50,
		width: window.screen.width,
		paddingTop: 10,
		paddingBottom: 10,
	},
	logo: {
		color: "white",
		marginLeft: 50,
		fontWeight: "bold",
	},
});
export default function Header() {
	const styles = useStyles();

	return (
		<Paper className={styles.paper}>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h3" className={styles.logo}>
						fin
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
}
