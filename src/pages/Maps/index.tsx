import { useState } from "react";

import lang from "lang";
import { Loader, Map, Page } from "components";
import useGetData from "store/rtkProvider";
import type { IMapsData } from "api/interfaces/Maps/IMapsData";
import type { IMapPopupProps } from "components/Map/Map";

export default function Maps() {
    const langPage = lang.components.map;
    const [popup, setPopup] = useState<IMapPopupProps | undefined>(undefined);
    const { data, isLoading } = useGetData<IMapsData>("maps", {
        poligon: {
            type: "FeatureCollection",
            features: [],
        },
        center: undefined,
    });
    const defaultPoligon = {
        type: "FeatureCollection" as const,
        features: [],
    };
    const toMapClick = (value: IMapPopupProps | undefined) => {
        setPopup(value?.props ? value : undefined);
    };
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            backUrl="/"
            icon="map"
            fabMargin={false}
            scrollTop={false}
        >
            {isLoading ? (
                <Loader />
            ) : (
                <Map
                    popup={popup}
                    poligonLayer={data?.poligon || defaultPoligon}
                    center={data.center}
                    zoom={17}
                    onClick={toMapClick}
                />
            )}
        </Page>
    );
}
