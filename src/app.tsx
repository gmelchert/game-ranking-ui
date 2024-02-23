import Router from "preact-router";

import { Home } from "./pages/home";
import { Profile } from "./pages/profile";

import { ThemeProvider } from "./components/theme-provider";
import { Layout } from "./components/Layout";

export function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout>
                <Router>
                    <Home path="/" />
                    <Profile path="/profile" />
                </Router>
            </Layout>
        </ThemeProvider>
    )
}
