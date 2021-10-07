import React from "react";
import { Grid } from "@material-ui/core";
import Header from "../../components/Header/Header";

function Pages() {
	return (
		<Grid container direction="row">
			<Grid item={12}>
				<Header />
			</Grid>
		</Grid>
	);
}

export default Pages;
