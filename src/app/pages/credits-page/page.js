"use client";

import { useState } from "react";
import Credit from "./credit";
import Navigation from "@/app/components/Navigation";

export default function Page() {
    const [credits, setCredits] = useState(credits);

    //function to decide how to format the list of items by sortBy
    function listCredits() {
        return credits.map((credit) => (
            <li key={credit.name}>
                <Credit {...credit} />
            </li>
        ));
    }

    return (
        <body>
        <header>
            <Navigation />
        </header>
        <main className="flex w-full">
            <div>
            <h1 className="font-bold text-3xl m-1">Credits:</h1>
            <div className="flex flex-wrap justify-center ">
                <ul>{listCredits()}</ul>
            </div>
            </div>
        </main>
        </body>
    );
}