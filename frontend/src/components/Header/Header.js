import * as React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Paper, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Cookie from "js-cookie";
import { useHistory } from "react-router";

const useStyles = makeStyles({
	paper: {
		backgroundColor: "#174276",
		height: 50,
		minWidth: window.screen.width,
		paddingTop: 10,
		paddingBottom: 10,
	},
	logo: {
		color: "white",
		marginLeft: 50,
		fontWeight: "bold",
	},
	menu: {
		color: "white",
		display: "inline",
		fontFamily: `"Nunito", sans-serif`,
		fontSize: 20,
		textAlign: "center",
	},
	login: {
		color: "white",
		fontFamily: `"Nunito", sans-serif`,
		fontSize: 20,
	},
});

export default function Header() {
	const styles = useStyles();
	const [auth, setAuth] = React.useState(null);
	const history = useHistory();

	React.useEffect(() => {
		setAuth(Cookie.get("FINLOGIN"));
	}, [Cookie.get("FINLOGIN")]);

	const ItemMenu = (props) => {
		return (
			<Grid item xs={2}>
				<Link to={props.to} style={{ textDecoration: "none" }}>
					<MenuItem className={styles.menu}>{props.name}</MenuItem>
				</Link>
			</Grid>
		);
	};

	const goTo = (path = "") => {
		history.push("/" + path);
	};

	const logout = () => {
		Cookie.remove("FINLOGIN");
		goTo("login");
		window.location.reload();
	};

	return (
		<Paper className={styles.paper}>
			<Grid container alignItems="center">
				<Grid item xs={4}>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Typography variant="h3" className={styles.logo}>
							fin
						</Typography>
					</Link>
				</Grid>

				<Grid item xs={6}>
					{auth && (
						<Grid container spacing={4}>
							<ItemMenu name="Início" to="/" />
							<ItemMenu name="Ponto" to="ponto" />
							<ItemMenu name="Gastos" to="gastos" />
							<ItemMenu name="Carteira" to="carteira" />
						</Grid>
					)}
				</Grid>

				<Grid item xs={2}>
					{auth ? (
						<Link to="login" style={{ textDecoration: "none" }}>
							<MenuItem
								className={styles.login}
								onClick={() => {
									logout();
								}}
							>
								{<AccountCircle fontSize="large" />}
								&nbsp;
								{"Logout"}
							</MenuItem>
						</Link>
					) : (
						<Link to="login" style={{ textDecoration: "none" }}>
							<MenuItem className={styles.login}>
								{<AccountCircle fontSize="large" />}
								&nbsp;
								{"Login"}
							</MenuItem>
						</Link>
					)}
				</Grid>
			</Grid>
		</Paper>
	);
}
