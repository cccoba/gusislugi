import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import Loader from "./components/Loader";
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
