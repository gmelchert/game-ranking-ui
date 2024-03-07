import { ICounterStrikeStatModel } from "@/@types";
import { useApi } from "@/hooks";

export const getCounterStrikeStat = async (page: number = 1) => 
    useApi<ICounterStrikeStatModel[]>(`counter-strike?page=${page}`).get();

export const getCounterStrikeLatestData = async () => 
    useApi<ICounterStrikeStatModel[]>('counter-strike/latest').get();

interface IBodyPostStat {
    deaths: number;
    dmr: number;
    kills: number;
}

export const postCounterStrikeStat = async (data: IBodyPostStat) =>
    useApi<ICounterStrikeStatModel>('counter-strike').post<IBodyPostStat>(data);