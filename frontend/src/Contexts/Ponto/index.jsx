import { createContext, useState } from "react";
import { pontoStates } from "./data";

export const GlobalPontoContext = createContext();

export const PontoContext = ({ children }) => {
	const [pontoContextState, setPontoContextState] = useState(pontoStates);

	return (
		<GlobalPontoContext.Provider value={{ pontoContextState, setPontoContextState }}>
			{children}
		</GlobalPontoContext.Provider>
	);
};
