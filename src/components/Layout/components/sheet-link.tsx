import { Link } from "preact-router/match"

type TSheetLinkProps = {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export function SheetLink({
    children,
    href,
    icon,
}: TSheetLinkProps) {
    return (
        <Link 
            href={href}
            className="flex gap-4 p-2 rounded transition-colors duration-200"
            activeClassName="bg-indigo-900"
        >
            {icon}
            <span>{children}</span>
        </Link>
    )
}