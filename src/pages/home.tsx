import { useEffect, useRef, useState } from "preact/hooks";
import { toast } from "sonner";

import { PageTitle } from "@/components/PageTitle";

import { GetCounterStrikeData, getCounterStrikeLatestData } from "@/api-call/counter-strike.api";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { IPageProps } from "@/@types";
import { Button } from "@/components/ui/button";

export function Home({ }: IPageProps) {
    const [counterStrikeData, setCounterStrikeData] = useState<GetCounterStrikeData[]>([]);
    const page = useRef(1);

    const callApi = async () => {
        const {
            success,
            data,
            error
        } = await getCounterStrikeLatestData(page.current);

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

            <section>
                <h2 className="text-xl my-4 text-center text-zinc-300">
                    Latest Player Stats
                </h2>

                <Table className="w-5/6 mx-auto overflow-x-auto whitespace-nowrap">
                    {/* <TableCaption>Latest game records.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>Player</TableHead>
                            <TableHead>Map</TableHead>
                            <TableHead>Won?</TableHead>
                            <TableHead>Kills</TableHead>
                            <TableHead>Deaths</TableHead>
                            <TableHead>DMR</TableHead>
                            <TableHead>K/D Ratio</TableHead>
                            <TableHead className="text-right">Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {counterStrikeData.map(stat =>
                            <TableRow>
                                <TableCell className="font-medium">{stat.user.name}</TableCell>
                                <TableCell>{stat.map}</TableCell>
                                <TableCell>{stat.won}</TableCell>
                                <TableCell>{stat.kills}</TableCell>
                                <TableCell>{stat.deaths}</TableCell>
                                <TableCell>{stat.dmr}</TableCell>
                                <TableCell>{(stat.kills / stat.deaths).toFixed(2)}</TableCell>
                                <TableCell className="text-right">{stat.createdAt}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="mt-4 space-x-4 text-center">
                    <Button variant="outline" className="w-24">Previous</Button>
                    <Button variant="outline" className="w-24">Next</Button>
                </div>
            </section>
        </>
    )
}
