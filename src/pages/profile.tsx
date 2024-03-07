import { route } from "preact-router";
import { useContext } from "preact/hooks";

import { UserLoggedContext } from "@/contexts";

import { PageTitle } from "@/components/PageTitle";
import { ProfileField } from "@/components/ProfileField";

import { IPageProps } from "@/@types";
import { useDate } from "@/hooks";

export function Profile({}: IPageProps) {
    const { userLogged } = useContext(UserLoggedContext);
    if (!userLogged) {
        route('/sign-in');
        return null;
    }

    return (
        <>
            <PageTitle title="Profile" />

            <h2 className="text-zinc-300 mt-4 pl-2 text-xl">
                Welcome back, {userLogged.name}!
            </h2>

            <section className="rounded p-2 grid grid-cols-1 gap-4">
                <ProfileField inputLabel="Username" field="name" />
                <ProfileField inputLabel="Email" field="email" />
                <ProfileField inputLabel="Steam" field="steam" />
                <ProfileField inputLabel="Discord" field="discord" />
                <ProfileField inputLabel="Image" field="image" variant="image" />
            </section>

            <hr />

            <p className="mt-4 p-2">
                <span className="text-zinc-200 ">User created on:</span> {useDate(userLogged.createdAt)}
            </p>
        </>
    )
}