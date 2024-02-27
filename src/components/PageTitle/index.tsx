type TPageTitleProps = {
    title: string;
}

export function PageTitle({
    title,
}: TPageTitleProps) {
    
    return (
        <h1 className="text-4xl text-center py-4 border-b">
            {title}
        </h1>
    )
}