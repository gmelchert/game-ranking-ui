import { IUserEntity } from "@/@types/entity/user.entity";
import { useApi } from "@/hooks";

interface IDataGetProfile {
    user: IUserEntity;
    counterStrike: any[];
}

export const getProfile = async () =>
    useApi<IDataGetProfile>('users/profile').get();


interface IBodyPutUser {
    image?: string;
    steam?: string;
    email?: string;
    name?: string;
    discord?: string;
}

export const putUser = async (body: IBodyPutUser) =>
    useApi<{
        user: IUserEntity;
        accessToken: string;
    }>('users').put<IBodyPutUser>(body);