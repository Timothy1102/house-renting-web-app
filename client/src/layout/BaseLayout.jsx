import React from "react";

export const BaseLayout = ({ children }) => {
    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <h1>Header</h1>
            {children}
            <h1>Footer</h1>
        </>
    );
};
