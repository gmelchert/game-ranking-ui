import { IUserEntity } from "@/@types/entity/user.entity";
import { useApi } from "@/hooks";

interface IPostSignIn {
    login: string;
    password: string;
}

interface IDataPostSignIn {
    user: IUserEntity;
    accessToken: string;
}

export const postSignIn = async (data: IPostSignIn) =>
    useApi<IDataPostSignIn>('auth/sign-in').post<IPostSignIn>(data);

interface IPostSignOnBody {
    name: string;
    email: string;
    steam: string;
    discord?: string;
    image: string;
    password: string;
}

export const postSignOn = async (data: IPostSignOnBody) =>
    useApi<IDataPostSignIn>('auth/sign-on').post<IPostSignOnBody>(data);