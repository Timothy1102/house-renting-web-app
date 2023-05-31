import { useContext } from "react";
import BaseLayout from "../layout/BaseLayout";
import { UserContext } from "../contexts/UserProvider";

export const Home = () => {
    // // Storing a value in local storage
    // localStorage.setItem('myKey', 'test value');

    // // Retrieving a value from local storage
    // const storedValue = localStorage.getItem('myKey');
    // console.log("🚀 ~ file: Home.jsx:9 ~ Home ~ storedValue:", storedValue)

    // localStorage.removeItem('myKey');

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