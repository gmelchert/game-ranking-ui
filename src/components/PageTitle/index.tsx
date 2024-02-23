type TPageTitleProps = {
    title: string;
}

export function PageTitle({
    title,
}: TPageTitleProps) {
    

    return (
        <div class="flex justify-between mt-4 pb-4 border-b">
            <h1 class="text-center text-3xl">
                {title}
            </h1>
        </div>
    )
}