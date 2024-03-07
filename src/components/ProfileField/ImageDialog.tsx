import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react"

export function ImageDialog({ image }: { image: string; }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="rounded text-center border px-2 border-zinc-200
                    hover:bg-zinc-200 hover:text-slate-950 transition-colors duration-150"
                ><Eye /></button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Profile picture</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center space-x-2">
                    <img src={image} title="profile picture" alt="profile picture" />
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}