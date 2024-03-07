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

import { IPageProps } from "@/@types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
    deaths: z.string().transform(v => parseInt(v)),
    dmr: z.string().transform(v => parseInt(v)),
    kills: z.string().transform(v => parseInt(v)),
})

export function Statistics({}: IPageProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (body: z.infer<typeof FormSchema>) => {
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