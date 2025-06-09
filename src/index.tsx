import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

import "./polyfills"; // Полифиллы для старых браузеров
import Loader from "./components/Loader";

import "./reportWebVitals";

const App = React.lazy(() => import("./App"));

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <Suspense
        fallback={
            <div
                style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Loader animate={false} />
            </div>
        }
    >
        <App />
    </Suspense>
);
