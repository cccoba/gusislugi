import { hexToRgb } from "@mui/system";
import type { Feature } from "ol";
import { Circle, Fill, Stroke, Style, Icon, Text } from "ol/style";

import getConst from "api/common/getConst";

import getSvgIcons from "./SvgIcons";

export const colors = {
    primary: " #517da2",
    white: "#FFFFFF",
};

const defValues = {
    textShowZoom: 16,
    objectShowZoom: 8,
    pointRadius: 5,
    userZoom: 16,
};

export interface IFeatureProps {
    name: string;
    desc: string;
    zoomStart: number;
    radius?: number;
    image?: string;
    svgImage?: string;
    localImage?: boolean;
    opacity?: number;
    scale?: number;
    rotation?: number;
    fill?: {
        color?: string;
    };
    stroke?: {
        color?: string;
        dash?: number;
        width?: number;
    };
    text?: {
        offsetY?: number;
        scale?: number;
        fill?: {
            color?: string;
        };
        stroke?:
            | {
                  color?: string;
                  dash?: number;
                  width?: number;
              }
            | false;
    };
}

export const getStyleCb = (feature: Feature, zoom: number) => {
    const props = feature.getProperties();
    const type = feature.getGeometry()?.getType();
    switch (type) {
        case "Polygon":
            return mapStylePolygonFunction(props as IFeatureProps, zoom);
        case "Point":
            return mapStylePointFunction(props as IFeatureProps, zoom);
        case "LineString":
            return mapStyleLineStringFunction(props as IFeatureProps, zoom, feature.getGeometry());
    }
    return [];
};

function getImageUrl(name: string) {
    return getConst("images-url") + "/" + name;
}
export function getLocalImageUrl(name: string) {
    return process.env.PUBLIC_URL + "/assets/images/map/" + name;
}
export function getColor(color: any, def: string, params = null) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (result) {
        return color;
    }
    if (color.indexOf("###") === 0 && !!params) {
        return getValue(color, params, "color", def);
    }
    return def;
}
export function getValue(value: any, params: any, type: any, def: any) {
    value = value.replace("###", "").replace("###", "");
    if (value.length) {
        if (value.indexOf("p") === 0) {
            value = parseInt(value.replace("p", ""));
            if (!!value && !!params[value] && !!params[value][type] && params[value][type] != "false") {
                return params[value][type];
            }
        }
    }
    return def;
}
export function getTitle(text: string, params: any) {
    if (!!params && !!text && text.indexOf("###") === 0) {
        return getValue(text, params, "title", text);
    }
    return text;
}
export function mapStyleLineStringFunction(props: IFeatureProps, zoom: number, geometry: any) {
    if (!!props?.zoomStart && zoom < props.zoomStart) {
        return [];
    }

    const style: any = {
        stroke: new Stroke({
            color: props.stroke?.color,
            width: props.stroke?.width ? props.stroke.width : 1,
            lineDash: [props.stroke?.dash ? props.stroke.dash : 0],
        }),
    };
    if (zoom >= defValues.textShowZoom) {
        style.text = new Text({
            text: props.name,
            textAlign: "center",
            scale: 1,
            fill: new Fill({
                color: props.fill?.color,
            }),
        });
    }
    const styles = [new Style(style)];
    /*if (!!geometry) {
    geometry.forEachSegment((start: any, end: any) => {

      const dx = end[0] - start[0];
      const dy = end[1] - start[1];
      const rotation = Math.atan2(dy, dx);
      // arrows
      styles.push(
        new Style({
          geometry: new Point(end),
          image: new Icon({
            src: getSvgIcons("arrow", hexToRgb(props?.stroke?.color || "")),
            anchor: [0.66, 0.5],
            scale: 0.7,
            rotateWithView: true,
            rotation: -rotation,
          }),
        })
      );
    });
  }*/
    return styles;
}
export function mapStylePolygonFunction(props: IFeatureProps, zoom: number) {
    const style: any = {
        fill: new Fill({
            color: props.fill?.color,
        }),
        stroke: new Stroke({
            color: props.stroke?.color,
            width: props.stroke?.width ? props.stroke.width : 1,
            lineDash: [props.stroke?.dash ? props.stroke.dash : 0],
        }),
    };
    if (zoom >= defValues.textShowZoom) {
        style.text = new Text({
            text: props.name,
            textAlign: "center",
            scale: 1,
            fill: new Fill({
                color: props.stroke?.color ? props.stroke.color : colors.primary,
            }),
        });
    }
    return [new Style(style)];
}
export function mapStylePointFunction(props: IFeatureProps, zoom: number) {
    let style: any = {};
    if (!props?.image && !props?.svgImage) {
        //notImage
        style = {
            image: new Circle({
                fill: new Fill({
                    color: props.fill?.color,
                }),
                radius: props?.radius ? props.radius : defValues.pointRadius,
                stroke: new Stroke({
                    color: props.stroke?.color,
                    width: props.stroke?.width ? props.stroke.width : 1,
                    lineDash: [props.stroke?.dash ? props.stroke.dash : 0],
                }),
            }),
        };

        if (zoom >= defValues.textShowZoom) {
            style.text = new Text({
                text: getTitle(props["name"], null),
                offsetX: 15,
                textAlign: "start",
                scale: 1.5,
                fill: new Fill({
                    color: props.fill?.color,
                }),
                stroke: new Stroke({
                    color: props.stroke?.color,
                    width: props.stroke?.width ? props.stroke.width : 1,
                }),
            });
        }
        return [new Style(style)];
    }
    if (props?.image) {
        style = {
            image: new Icon({
                opacity: props?.opacity ? props.opacity : 1,
                scale: props?.scale ? props.scale : 1,
                rotation: props?.rotation ? props.rotation : 0,
                rotateWithView: true,
                src: props?.localImage ? getLocalImageUrl(props.image) : getImageUrl(props.image),
            }),
        };
    } else {
        style = {
            image: new Icon({
                opacity: props?.opacity ? props.opacity : 1,
                scale: props?.scale ? props.scale : 1,
                rotation: props?.rotation ? props.rotation : 0,
                rotateWithView: true,
                src: getSvgIcons(
                    props.svgImage || "",
                    hexToRgb(props.fill?.color || colors.primary),
                    hexToRgb(props.stroke?.color || colors.white)
                ),
            }),
        };
    }
    if (zoom >= defValues.textShowZoom) {
        const textProps: any = {};
        textProps.fill = new Fill(props?.text?.fill ? props.text.fill : props.fill);
        if (typeof props?.text?.stroke !== "undefined") {
            if (props.text.stroke) {
                textProps.stroke = new Stroke(props.text.stroke);
            }
        } else {
            textProps.stroke = new Stroke({
                color: props.stroke?.color,
                width: props.stroke?.width ? props.stroke.width : 1,
            });
        }

        style.text = new Text({
            text: getTitle(props.name, null),
            offsetY: props?.text?.offsetY ? props.text.offsetY : 0,
            scale: props?.text?.scale ? props.text.scale : 1.2,
            ...textProps,
        });
    }
    return [new Style(style)];
}
