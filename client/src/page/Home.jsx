import BaseLayout from "../layout/BaseLayout";

export const Home = () => {
    return (
        <BaseLayout
            content={
                <h1 className="text-red-600">Home page</h1>
            }
        />
    );
}