import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { toast } from "sonner"

import { UserLoggedContext } from '@/contexts';

import { postSignIn } from '@/api-call';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { PageTitle } from '@/components/PageTitle';

import { IPageProps } from '@/@types';

const FormSchema = z.object({
    login: z.string().min(1, {
        message: "Login is required.",
    }),
    password: z.string().min(6, {
        message: "Password is required.",
    }),
})

export function SignIn({ }: IPageProps) {
    const { setUserLogged } = useContext(UserLoggedContext);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (body: z.infer<typeof FormSchema>) => {
        const {
            success,
            error,
            data,
        } = await postSignIn(body);

        if (!success || !data) {
            return toast.error("Error on singning in.", {
                description: error?.message,
            })
        }

        const {
            user,
            accessToken,
        } = data;

        setUserLogged(user);
        localStorage.setItem('jwt', accessToken);

        route('/profile');
    }

    return (
        <>
            <PageTitle title='Sign in' />

            <section
                className="rounded p-4 border m-4"
            >
                <p className="text-sm text-zinc-400 mb-2">
                    Enter your email and password to login.
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="login"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Login</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="example@mail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="******" {...field} />
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
