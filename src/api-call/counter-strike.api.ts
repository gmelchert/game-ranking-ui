import { ICounterStrikeStatModel } from "@/@types";
import { useApi } from "@/hooks";
import { MutableRef } from "preact/hooks";

export interface GetCounterStrikeData extends ICounterStrikeStatModel {
    user: {
        name: string;
        steam: string;
        image: string;
    }
    testando: boolean
}

export const getCounterStrikeStat = async (page: number | MutableRef<number> = 1) =>
    useApi<GetCounterStrikeData[]>(`counter-strike?page=${page}`).get();

export const getCounterStrikeLatestData = async (page: number | MutableRef<number> = 1) =>
    useApi<GetCounterStrikeData[]>(`counter-strike?page=${page}`).get();

interface IBodyPostStat {
    deaths: number;
    dmr: number;
    kills: number;
    map: string;
    won: boolean;
}

export const postCounterStrikeStat = async (data: IBodyPostStat) =>
    useApi<ICounterStrikeStatModel>('counter-strike').post<IBodyPostStat>(data);