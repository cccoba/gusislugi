const svgIcons: { [key: string]: string } = {
    quest: `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="30" viewBox="0 0 44 30" style="fill:###color###;">
    <path d="M8.41668 30V26H12.5833V18L0.0833435 0H29.25L16.75 18V26H20.9167V30H8.41668ZM10.2917 8H19.0417L21.9583 4H7.37501L10.2917 8ZM31.3333 30C29.5972 30 28.1215 29.4167 26.9063 28.25C25.691 27.0833 25.0833 25.6667 25.0833 24C25.0833 22.3333 25.691 20.9167 26.9063 19.75C28.1215 18.5833 29.5972 18 31.3333 18C31.7153 18 32.0799 18.025 32.4271 18.075C32.7743 18.125 33.1042 18.2333 33.4167 18.4V0H43.8333V6H37.5833V24C37.5833 25.6667 36.9757 27.0833 35.7604 28.25C34.5451 29.4167 33.0695 30 31.3333 30Z"/>
    </svg>`,
    arrow2: `<svg xmlns="http://www.w3.org/2000/svg" style="fill:###color###;"  viewBox="0 96 960 960" height="48" width="48"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>`,
    arrow: `<svg xmlns="http://www.w3.org/2000/svg" style="fill:###color###;" viewBox="0 96 960 960" height="48" width="48"><path d="M400 776V376l200 200-200 200Z"/></svg>`,
};

function getSvgIcons(name: string, rgbColor?: string, rgbStroke?: string) {
    let value = svgIcons.quest;
    if (!!name && !!svgIcons?.[name]) {
        value = svgIcons[name];
    }
    if (!!rgbColor) {
        value = value.replace("###color###", rgbColor);
    }
    if (!!rgbStroke) {
        value = value.replace("###stroke###", rgbStroke);
    }
    return "data:image/svg+xml;utf8," + value;
}

export default getSvgIcons;
