import * as React from "react";
import { Grid } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Menu from "./Components/Header/Header";
import Main from "./Pages/Main/Main";
import Ponto from "./Pages/Ponto/Ponto";
import Gastos from "./Pages/Gastos/Gastos";
import Carteira from "./Pages/Carteira/Carteira";
import Login from "./Pages/Login/Login";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const styleTheme = createTheme({
	typography: {
		fontFamily: `"Nunito", sans-serif`,
	},
});

function App() {
	document.body.style = "background: #212226";
	document.title = "E-fin";
	//document.documentElement.style.overflowX = "hidden";

	return (
		<Router>
			<ThemeProvider theme={styleTheme}>
				<Grid
					container
					direction="column"
					alignItems="center"
					style={{ color: "white" }}
				>
					<Grid item xs={12}>
						<Menu />
					</Grid>
					<Grid item xs={12}>
						<Switch>
							<Route path="/" exact component={Main} />
							<Route path="/ponto" component={Ponto} />
							<Route path="/gastos" component={Gastos} />
							<Route path="/carteira" component={Carteira} />
							<Route path="/login" component={Login} />
						</Switch>
					</Grid>
				</Grid>
			</ThemeProvider>
		</Router>
	);
}

export default App;
