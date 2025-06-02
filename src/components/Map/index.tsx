import type { ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";

import { fromLonLat, get } from "ol/proj";

import GeoJSON from "ol/format/GeoJSON";

import type { ReadOptions } from "ol/format/Feature";

import type { Coordinate } from "ol/coordinate";

import type { Feature } from "ol";

import type { IMapPopupProps } from "./Map";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { vector, xyz } from "./Source";

import { FullScreenControl } from "./Controls";
import { getStyleCb } from "./Features/Styles";

//import geojsonObject from "./config";

export interface IGeoJson {
    type: "FeatureCollection";
    features: IGeoJsonFeature[];
}
export interface IGeoJsonFeature {
    type: "Feature";
    geometry: {
        type: "Point" | "Polygon" | "LineString";
        coordinates: number[] | number[][];
    };
    properties: {
        [key: number | string]: any;
    };
}

const startCenter = [133.4321339607488, 44.19711253508311];
const startZoom = 16;

interface IProps {
    onClick?: (params: IMapPopupProps | undefined) => void;
    poligonLayer?: IGeoJson;
    hiddenLayer?: IGeoJson;
    questsLayer?: IGeoJson;
    questPointsLayer?: IGeoJson;
    userLayer?: IGeoJson;
    center?: Coordinate;
    zoom?: number;
    children?: ReactNode;
    popup?: any;
}

export default function MapComponent({
    onClick,
    poligonLayer,
    hiddenLayer,
    questsLayer,
    questPointsLayer,
    userLayer,
    center = startCenter,
    zoom = startZoom,
    children,
    popup,
}: IProps) {
    const [mapCenter, setMapCenter] = useState<Coordinate>(fromLonLat(center));
    const [mapZoom, setMapZoom] = useState(zoom);
    const mapZoomRef = useRef<number>(zoom);
    const [questsVectorSource, setQuestsVectorSource] = useState<any>(null);
    const [questPointsVectorSource, setQuestPointsVectorSource] = useState<any>(null);
    const [poligonVectorSource, setPoligonVectorSource] = useState<any>(null);
    const [hiddenVectorSource, setHiddenVectorSource] = useState<any>(null);
    const [userCoordinates, setUserCoordinates] = useState<number[] | null>(startCenter);

    useEffect(() => {
        //setMapCenter(center);
        setMapCenter(fromLonLat(center));
    }, [center?.[0], center?.[1]]);
    useEffect(() => {
        setMapZoom(zoom);
    }, [zoom]);

    useEffect(() => {
        if (questsLayer) {
            const newQuestsVectorSource = vector({
                features: new GeoJSON().readFeatures(questsLayer, {
                    featureProjection: get("EPSG:3857"),
                } as ReadOptions),
            });
            setQuestsVectorSource(newQuestsVectorSource);
        }
    }, [questsLayer]);
    useEffect(() => {
        if (questPointsLayer) {
            const newQuestPointsVectorSource = vector({
                features: new GeoJSON().readFeatures(questPointsLayer, {
                    featureProjection: get("EPSG:3857"),
                } as ReadOptions),
            });
            setQuestPointsVectorSource(newQuestPointsVectorSource);
        }
    }, [questPointsLayer]);

    useEffect(() => {
        if (poligonLayer) {
            const newPoligonVectorSource = vector({
                features: new GeoJSON().readFeatures(poligonLayer, {
                    featureProjection: get("EPSG:3857"),
                } as ReadOptions),
            });
            setPoligonVectorSource(newPoligonVectorSource);
        }
    }, [poligonLayer]);
    useEffect(() => {
        if (hiddenLayer) {
            const newHiddenVectorSource = vector({
                features: new GeoJSON().readFeatures(hiddenLayer, {
                    featureProjection: get("EPSG:3857"),
                } as ReadOptions),
            });
            setHiddenVectorSource(newHiddenVectorSource);
        }
    }, [hiddenLayer]);

    useEffect(() => {
        if (!!userLayer?.features?.length && userLayer.features[0]?.geometry?.coordinates?.length) {
            if (
                userCoordinates === null ||
                userLayer.features[0].geometry.coordinates[0] !== userCoordinates[0] ||
                userLayer.features[0].geometry.coordinates[1] !== userCoordinates[1]
            ) {
                //update coordinate
                setUserCoordinates(userLayer.features[0].geometry.coordinates as number[]);
            }
        } else {
            //hide layer
            setUserCoordinates(null);
        }
    }, [userLayer]);

    const onMapClick = (data: IMapPopupProps | undefined) => {
        if (onClick) {
            onClick(data || undefined);
        }
        return null;
    };

    const onZoomChange = (newZoom: number) => {
        mapZoomRef.current = newZoom;
    };
    //const mapSource = osm();
    //const mapSource = xyz({ url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png", maxZoom: 20, attributions: {} });
    /*const mapSource = xyz({
        url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        maxZoom: 20,
        attributions: {},
    });*/
    /*const mapSource = xyz({
        url: "https://{a-c}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
        maxZoom: 20,
        attributions: {},
    });*/
    const mapSource = xyz({
        url: "https://khms3.googleapis.com/kh?v=998&hl=ru-RU&x={x}&y={y}&z={z}",
        maxZoom: 20,
        attributions: {},
    });

    return (
        <Map
            center={mapCenter}
            zoom={mapZoom}
            onClick={onMapClick}
            popup={popup}
            onZoomChange={onZoomChange}
            userCoordinates={userCoordinates}
        >
            <FullScreenControl />
            <Layers>
                <TileLayer
                    source={mapSource}
                    zIndex={0}
                />
                {!!poligonLayer && (
                    <VectorLayer
                        source={poligonVectorSource}
                        style={(f: Feature) => getStyleCb(f, mapZoomRef.current)}
                    />
                )}
                {!!hiddenLayer && (
                    <VectorLayer
                        source={hiddenVectorSource}
                        style={(f: Feature) => getStyleCb(f, mapZoomRef.current)}
                    />
                )}
                {!!questsLayer && (
                    <VectorLayer
                        source={questsVectorSource}
                        style={(f: Feature) => getStyleCb(f, mapZoomRef.current)}
                    />
                )}
                {!!questPointsLayer && (
                    <VectorLayer
                        source={questPointsVectorSource}
                        style={(f: Feature) => getStyleCb(f, mapZoomRef.current)}
                    />
                )}
            </Layers>
            {children}
        </Map>
    );
}
