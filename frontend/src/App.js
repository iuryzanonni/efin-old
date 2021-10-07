import * as React from "react";
import { Grid } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Main from "./pages/Main/Main";

const styleTheme = createTheme({
	typography: {
		fontFamily: `"Nunito", sans-serif`,
	},
});

function App() {
	document.body.style = "background: #212226";
	document.title = "E-fin";

	return (
		<ThemeProvider theme={styleTheme}>
			<Grid container style={{ color: "white" }}>
				<Grid item xs={12}>
					<Main />
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default App;
