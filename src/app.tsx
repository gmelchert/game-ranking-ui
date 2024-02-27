import Router from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { Home } from "./pages/home";
import { Profile } from "./pages/profile";
import { SignIn } from "./pages/sign-in";

import { IUserLogged, UserLoggedContext } from "./contexts";

import { ThemeProvider } from "./components/theme-provider";
import { Layout } from "./components/Layout";
import { Toaster } from "./components/ui/toaster";

import { getProfile } from "./api-call";

export function App() {
    const [userLogged, setUserLogged] = useState<IUserLogged | null >(null);

    const setUser = async () => {
        const {
            success,
            data,
        } = await getProfile();

        if (success && data) {
            return setUserLogged(data.user);
        }

        localStorage.removeItem('jwt');
    }

    useEffect(() => {
        const jwtFromStorage = localStorage.getItem('jwt');
        if (jwtFromStorage) {
            setUser();
        }
    }, [])
    

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <UserLoggedContext.Provider value={{ userLogged, setUserLogged }}>
                <Layout>
                    <Router>
                        <Home path="/" />
                        <Profile path="/profile" />
                        <SignIn path="/sign-in" />
                    </Router>
                    <Toaster />
                </Layout>
            </UserLoggedContext.Provider>
        </ThemeProvider>
    )
}