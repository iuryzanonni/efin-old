import React from "react";
import { Grid } from "@material-ui/core";

import { DayTime } from "./DayTime";

import { PontoContext } from "../../Contexts/Ponto";
import { MenuPeriod } from "./MenuPeriod";

export default function Ponto() {
	const infoDay = {
		Entrada: new Date(2021, 11, 14, 10, 0),
		Almoço: new Date(2021, 11, 14, 15, 32),
		Volta: new Date(2021, 11, 14, 16, 0),
		Saída: new Date(2021, 11, 14, 18, 0),
	};

	return (
		<PontoContext>
			<Grid container spacing={1} direction="column">
				<Grid item xs={12}>
					<MenuPeriod />
				</Grid>

				{[1, 0].map((index) => {
					return (
						<Grid key={index} item xs={12}>
							<DayTime infoDay={infoDay} />
						</Grid>
					);
				})}
			</Grid>
		</PontoContext>
	);
}
