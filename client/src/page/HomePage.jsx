import { useContext } from "react";
import BaseLayout from "../layout/BaseLayout";
import { UserContext } from "../contexts/UserProvider";

export const Home = () => {
    const {user, isLoggedIn} = useContext(UserContext);
    console.log("🚀 ~ file: HomePage.jsx:16 ~ Home ~ isLoggedIn:", isLoggedIn)
    console.log("🚀 ~ file: HomePage.jsx:16 ~ Home ~ user:", user)

    return (
        <BaseLayout
            content={
                <h1 className="text-red-600 h-screen">Home page</h1>
            }
        />
    );
}