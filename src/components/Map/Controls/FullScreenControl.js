import { useContext, useEffect } from "react";
import { FullScreen } from "ol/control";

import MapContext from "../Map/MapContext";

export default function FullScreenControl() {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        const fullScreenControl = new FullScreen({});

        map.controls.push(fullScreenControl);

        return () => map.controls.remove(fullScreenControl);
    }, [map]);

    return null;
}
