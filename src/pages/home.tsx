import { useEffect, useRef, useState } from "preact/hooks";
import { toast } from "sonner";

import { PageTitle } from "@/components/PageTitle";

import { getCounterStrikeLatestData } from "@/api-call/counter-strike.api";

import { ICounterStrikeStatModel, IPageProps } from "@/@types";

export function Home({}: IPageProps) {
    const [counterStrikeData, setCounterStrikeData] = useState<ICounterStrikeStatModel[]>([]);
    const page = useRef(1);

    const callApi = async () => {
        const {
            success,
            data,
            error
        } = await getCounterStrikeLatestData();

        if (!success || !data) {
            return toast.error("Error on getting home page data.", {
                description: error?.message,
            })
        }

        setCounterStrikeData(data);
    }

    useEffect(() => {
        callApi();
    }, [])

    return (
        <>
            <PageTitle title="Home" />

        </>
    )
}
