import React from "react";
import {
	Grid,
	Paper,
	FormControl,
	TextField,
	Typography,
	Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles/";
import axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from "react-router";
import Alert from "@material-ui/core/Alert";

const Settings = require("../../Settings/Settings.json");

const useStyles = makeStyles({
	paper: {
		backgroundColor: "#35373E",
		width: 500,
		height: 700,
		marginTop: 50,
	},
	text: {
		color: "white",
		fontSize: 18,
	},
	borderTextField: {
		borderColor: "#0078D4 !important",
		borderWidth: "3px !important",
		borderRadius: 10,
	},
	size: {
		width: 400,
	},
});

export default function Login() {
	const styles = useStyles();

	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [token, setToken] = React.useState("");

	const [messageError, setMessageError] = React.useState();

	React.useEffect(() => {
		setCookie();
	}, [token]);

	const history = useHistory();

	const goTo = (path = "") => {
		history.push("/" + path);
	};

	const fetchLogin = async () => {
		const url = Settings.APIBaseURL + "authorize/login";

		await axios
			.post(url, {
				username,
				password,
			})
			.then((response) => {
				setToken(response.data.token);
			})
			.catch((error) => {
				if (error.response) {
					setMessageError(error.response.data.message);
				} else setMessageError(error.message);
			});
	};

	const setCookie = () => {
		if (token !== "" && token !== null) {
			Cookie.set("FINLOGIN", token, { expires: 2 });
			goTo("");
			window.location.reload();
		}
	};

	return (
		<Paper className={styles.paper}>
			<Grid container direction="column" alignItems="center">
				<FormControl className={styles.form}>
					<Grid item xs={12}>
						<Typography
							className={styles.text}
							style={{ paddingTop: 100 }}
						>
							Username
						</Typography>
						<TextField
							id="username"
							variant="outlined"
							value={username}
							onChange={(event) =>
								setUsername(event.target.value)
							}
							InputProps={{
								classes: {
									notchedOutline: styles.borderTextField,
								},
								className: styles.text,
							}}
							className={styles.size}
						/>
					</Grid>

					<Grid item xs={12}>
						<Typography
							className={styles.text}
							style={{ paddingTop: 50 }}
						>
							Password
						</Typography>
						<TextField
							id="password"
							type="password"
							variant="outlined"
							onChange={(event) =>
								setPassword(event.target.value)
							}
							InputProps={{
								classes: {
									notchedOutline: styles.borderTextField,
								},
								className: styles.text,
							}}
							className={styles.size}
						/>
					</Grid>

					<Grid item xs={5}>
						<Button
							style={{ width: 400, marginTop: 50, height: 50 }}
							variant="contained"
							onClick={() => fetchLogin()}
						>
							Entrar
						</Button>
					</Grid>

					{messageError && (
						<Grid item xs={12}>
							<Alert style={{ marginTop: 50 }} severity="error">
								{messageError}
							</Alert>
						</Grid>
					)}
				</FormControl>
			</Grid>
		</Paper>
	);
}
