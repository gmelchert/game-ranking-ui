import { IUserEntity } from "@/@types";
import { createContext } from "preact";

export interface IUserLoggedState {
    userLogged: IUserEntity | null;
    setUserLogged: (user: IUserEntity) => void;
}

const initiateState: IUserLoggedState = {
    userLogged: null,
    setUserLogged: () => null,
}

export const UserLoggedContext = createContext<IUserLoggedState>(initiateState);