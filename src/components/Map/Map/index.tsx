import type { ReactNode } from "react";
import { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";

import "ol/ol.css";
import "./Map.css";
import * as ol from "ol";
import type View from "ol/View";
import Overlay from "ol/Overlay";
import { fromLonLat, toLonLat } from "ol/proj";
import OLVectorLayer from "ol/layer/Vector";
import { getCenter } from "ol/extent";
import type { Coordinate } from "ol/coordinate";
import { defaults as defaultControls } from "ol/control/defaults";

import VectorSource from "ol/source/Vector";
import { Point } from "ol/geom";
import { Fill, Icon, Stroke, Style, Text } from "ol/style";
import lang from "lang";

import { ScaleLine } from "ol/control";

import { colors, getLocalImageUrl } from "../Features/Styles";

import MapPopup from "./Popup";
import MapContext from "./MapContext";

export interface IMapPopupPropsProps {
    name?: string;
    description?: string;
    actions?: any[];
    fill?: {
        color?: string;
    };
    stroke?: {
        color?: string;
        width?: number;
        dash?: number;
    };
}
export interface IMapPopupProps {
    coordinate: Coordinate;
    props?: IMapPopupPropsProps;
    pixel: number[];
    center: Coordinate;
}
interface IProps {
    children?: ReactNode;
    zoom: number;
    center: Coordinate;
    onClick: Function;
    onZoomChange: (newZoom: number) => void;
    popup?: IMapPopupProps;
    userCoordinates: number[] | null;
}

const Map = ({ children, zoom, center, popup, onClick, onZoomChange, userCoordinates }: IProps) => {
    const mapRef = useRef<any>();
    const [map, setMap] = useState<ol.Map | null>(null);
    const mapViewRef = useRef<View | null>(null);
    const mapPopupRef = useRef<Overlay>();
    const [popupTitle, setPopupTitle] = useState("");
    const [popupDesc, setPopupDesc] = useState("");
    const userLayer = useRef<any>(null);

    useEffect(() => {
        mapViewRef.current = new ol.View({ zoom, center, maxZoom: 21 });
        mapPopupRef.current = new Overlay({
            positioning: "center-center",
            stopEvent: true,
        });
        const popupEl = document.getElementById("popup");
        if (popupEl) {
            mapPopupRef.current.setElement(popupEl);
        }

        const options = {
            view: mapViewRef.current,
            layers: [],
            controls: defaultControls({ attribution: false }),
            overlays: [mapPopupRef.current],
        };

        const mapObject = new ol.Map(options);
        mapObject.addControl(new ScaleLine({ units: "metric" }));
        mapObject.on("click", mapClick);
        mapObject.on("moveend", moveEnd);
        mapObject.setTarget(mapRef.current);
        const userPoint = new ol.Feature({
            type: "icon",
            geometry: new Point(fromLonLat([131.88331692655, 43.115589701514])),
        });
        const userPointStyle = new Style({
            image: new Icon({
                opacity: 1,
                scale: 1,
                src: getLocalImageUrl("user.png"),
            }),
            text: new Text({
                text: lang.components.map.you,
                textAlign: "center",
                offsetY: 32,
                scale: 1.5,
                fill: new Fill({
                    color: colors.primary,
                }),
                stroke: new Stroke({
                    color: colors.white,
                }),
            }),
        });
        userLayer.current = new OLVectorLayer({
            source: new VectorSource({
                features: [userPoint],
            }),
            style: (feature) => {
                return userPointStyle;
            },
        });
        userLayer.current.setZIndex(1);
        userLayer.current.setVisible(false);
        mapObject.addLayer(userLayer.current);
        setMap(mapObject);

        return () => mapObject.setTarget(undefined);
    }, []);
    useEffect(() => {
        if (userLayer.current) {
            const userLayerCurrent = userLayer.current;
            if (!userCoordinates?.length) {
                userLayerCurrent.setVisible(false);
            } else {
                if (!userLayerCurrent.getVisible()) {
                    userLayerCurrent.setVisible(true);
                    if (mapViewRef.current) {
                        mapViewRef.current.animate({
                            center: fromLonLat(userCoordinates),
                            duration: 500,
                            zoom: zoom,
                        });
                    }
                }
                const features = userLayerCurrent.getSource().getFeatures();
                if (features?.length) {
                    features[0].getGeometry().setCoordinates(fromLonLat(userCoordinates));
                }
            }
        }
    }, [userCoordinates]);
    const moveEnd = (event: any) => {
        if (!mapViewRef.current) return;
        const newZoom = mapViewRef.current.getZoom();
        if (!!newZoom && newZoom !== zoom) {
            onZoomChange(newZoom ? newZoom : 0);
        }
    };
    useEffect(() => {
        if (!map || !mapViewRef.current) return;
        mapViewRef.current.animate({
            center: center,
            duration: 500,
            zoom: zoom,
        });
    }, [center[0], center[1], zoom]);
    useEffect(() => {
        if (!map || !mapViewRef.current) return;
        if (!popup) {
            mapPopupRef.current?.setPosition(undefined);
        } else {
            mapPopupRef.current?.setPosition(popup.coordinate);

            setPopupTitle(popup.props?.name || "");
            setPopupDesc(popup.props?.description || "");
        }
    }, [popup]);
    const mapClick = (event: any) => {
        if (onClick) {
            const data: any = {
                pixel: event.pixel,
                coordinate: event.coordinate,
            };
            const feature = event.target.forEachFeatureAtPixel(event.pixel, (f: any) => f);
            if (!feature) {
                onClick(data);
                return;
            }
            const { geometry, ...params } = feature.getProperties();
            const extend = geometry.getExtent();
            data.center = toLonLat(getCenter(extend));
            data.props = params;
            setTimeout(() => {
                onClick(data);
            }, 100);
        }
        return null;
    };
    return (
        <MapContext.Provider value={{ map }}>
            <Box
                ref={mapRef}
                className="ol-map"
            >
                {children}
                <MapPopup
                    id="popup"
                    title={popupTitle}
                    desc={popupDesc}
                />
            </Box>
        </MapContext.Provider>
    );
};

export default Map;
