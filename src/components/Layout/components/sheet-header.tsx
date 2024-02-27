import { useContext } from "preact/hooks";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Menu, HomeIcon, UserIcon, LogInIcon } from "lucide-react"

import { SheetLink } from "./sheet-link"
import { UserLoggedContext } from "@/contexts";
import { Link } from "preact-router";

export function SheetDemo() {
    const { userLogged } = useContext(UserLoggedContext);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="text-center">
                    <Menu height={40} />
                </button>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="border-b pb-4">
                        {/* <img 
                            src='/logo.jpg'
                            title='Corigas Logo'
                            className='w-10'
                        /> */}

                        Game Ranking
                    </SheetTitle>
                </SheetHeader>

                <div className="py-4 space-y-2">
                    <SheetLink href="/" icon={<HomeIcon />}>
                        Home
                    </SheetLink>

                    {userLogged && <SheetLink href="/profile" icon={<UserIcon />}>
                        Profile
                    </SheetLink>}

                    {!userLogged && <SheetLink href="/sign-in" icon={<LogInIcon />}>
                        Sign-in
                    </SheetLink>}
                </div>

                {!userLogged &&<SheetFooter className="border-t pt-4">
                    <Link className="underline" href="/sign-on">Register your account</Link>
                </SheetFooter>}
            </SheetContent>
        </Sheet>
    )
}
