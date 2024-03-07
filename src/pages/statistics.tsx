import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PageTitle } from "@/components/PageTitle";

import { postCounterStrikeStat } from "@/api-call/counter-strike.api";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { IPageProps } from "@/@types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
    deaths: z.string().transform(v => parseInt(v)),
    dmr: z.string().transform(v => parseInt(v)),
    kills: z.string().transform(v => parseInt(v)),
    map: z.string().trim().min(1, { message: "Map is required" }),
    won: z.string(),
})

export function Statistics({ }: IPageProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            map: 'Ancient',
            won: 'true',
            deaths: 0,
            dmr: 0,
            kills: 0,
        }
    })

    const onSubmit = async (formBody: z.infer<typeof FormSchema>) => {
        const body = {
            deaths: formBody.deaths,
            dmr: formBody.dmr,
            kills: formBody.kills,
            map: formBody.map,
            won: formBody.won === 'true',
        }

        const {
            success,
            error,
            data,
            message,
        } = await postCounterStrikeStat(body);

        if (!success || !data) {
            return toast.error("Error on creating new stat.", {
                description: error?.message,
            })
        }

        form.reset({
            deaths: 0,
            dmr: 0,
            kills: 0,
            won: 'true',
            map: 'Ancient'
        });

        toast.success(message, {
            duration: 1500,
        })
    }

    return (
        <>
            <PageTitle title="Create new Statistics" />

            <section
                className="rounded p-4 border m-4"
            >
                <p className="text-sm text-zinc-400 mb-2">
                    Enter your numbers to create a new record.
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="deaths"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deaths</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="kills"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Kills</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="dmr"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>DMR</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="map"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Map</FormLabel>
                                    <FormControl>
                                        <Select {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select the map" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Select the map</SelectLabel>
                                                    <SelectItem value="Ancient">Ancient</SelectItem>
                                                    <SelectItem value="Anubis">Anubis</SelectItem>
                                                    <SelectItem value="Dust 2">Dust 2</SelectItem>
                                                    <SelectItem value="Inferno">Inferno</SelectItem>
                                                    <SelectItem value="Mirage">Mirage</SelectItem>
                                                    <SelectItem value="Nuke">Nuke</SelectItem>
                                                    <SelectItem value="Overpass">Overpass</SelectItem>
                                                    <SelectItem value="Office">Office</SelectItem>
                                                    <SelectItem value="Vertigo">Vertigo</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="won"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Win</FormLabel>
                                    <FormControl>
                                        <Select {...field}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Did you win the match?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Did you win?</SelectLabel>
                                                    <SelectItem value="true">Yes</SelectItem>
                                                    <SelectItem value="false">No</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <Button
                            type="submit"
                            variant="outline"
                            className="mt-4 w-full"
                        >Submit</Button>
                    </form>
                </Form>
            </section>
        </>
    )
}