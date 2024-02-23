import { Header } from "./components/header";

type LayoutProps = {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />

            <main>
                {children}
            </main>
        </>
    )
}