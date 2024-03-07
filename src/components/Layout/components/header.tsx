import { Link } from "preact-router";
import { SheetDemo } from "./sheet-header";

export function Header() {
    return (
        <header
            className="p-4 bg-slate-300 dark:bg-blue-950"
        >
            <div className='flex gap-4 items-center justify-between'>
                <Link href='/'>
                    <img 
                        src='/logo.jpg'
                        title='Corigas Logo'
                        className='w-10 rounded'
                    />
                </Link>

                <SheetDemo />
            </div>


        </header>
    )
}