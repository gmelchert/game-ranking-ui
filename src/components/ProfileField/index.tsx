import { useContext, useRef } from "preact/hooks";
import { HTMLAttributes } from "preact/compat";
import { Pen } from "lucide-react";
import { toast } from 'sonner';

import { UserLoggedContext } from "@/contexts";

import { putUser } from "@/api-call";


import { IUserEntity } from "@/@types";
import { ImageDialog } from "./ImageDialog";

interface IProfileFieldProps {
    field: keyof IUserEntity;
    inputLabel: string;
    variant?: 'image';
}

export function ProfileField({
    field,
    inputLabel,
    variant,
}: IProfileFieldProps) {
    const { userLogged, setUserLogged } = useContext(UserLoggedContext);
    if (!userLogged) {
        return null;
    }

    const inputRef = useRef<HTMLInputElement>(null);

    const onEditHandle = async () => {
        if (!inputRef.current) return;
        const body = {
            [field]: inputRef.current.value,
        }
        const {
            success,
            error,
            data,
        } = await putUser(body);
        if (!success || !data) return toast({
            title: `Error on updating ${inputLabel.toUpperCase()}`,
            description: error?.message,
            variant: "destructive",
        })

        toast.success(`${inputLabel.toUpperCase()} updated!`, {
            duration: 1500,
        })
        
        localStorage.setItem('jwt', data.accessToken);
        setUserLogged(data.user);
    }

    const inputProps: HTMLAttributes<HTMLInputElement> = {
        className: "bg-blue-950 focus:outline-none font-bold flex-grow",
        id: `input-${field}`,
        value: userLogged[field],
        ref: inputRef,
    }

    return (
        <div className="flex gap-2">
            <label
                className="bg-blue-950 rounded p-2 flex gap-2
                flex-grow"
                htmlFor={`input-${field}`}
            >
                <span className="text-zinc-200 ">
                    {inputLabel}:
                </span>
                <input {...inputProps} />
            </label>

            {(variant && variant === 'image') && (
                <ImageDialog image={userLogged[field]} />
            )}

            <button
                className="rounded text-center border px-2 border-zinc-200
                hover:bg-zinc-200 hover:text-slate-950 transition-colors duration-150"
                onClick={onEditHandle}
            ><Pen /></button>
        </div>
    )
}