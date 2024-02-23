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

import { Menu, HomeIcon, UserIcon } from "lucide-react"
import { Link } from "preact-router"
import { SheetLink } from "./sheet-link"

export function SheetDemo() {
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

                    <SheetLink href="/profile" icon={<UserIcon />}>
                        Profile
                    </SheetLink>
                </div>

                <SheetFooter>
                    teste
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
