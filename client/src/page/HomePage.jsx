import BaseLayout from "../layout/BaseLayout";

export const Home = () => {
    // // Storing a value in local storage
    // localStorage.setItem('myKey', 'test value');

    // // Retrieving a value from local storage
    // const storedValue = localStorage.getItem('myKey');
    // console.log("🚀 ~ file: Home.jsx:9 ~ Home ~ storedValue:", storedValue)

    // localStorage.removeItem('myKey');

    return (
        <BaseLayout
            content={
                <h1 className="text-red-600 h-screen">Home page</h1>
            }
        />
    );
}