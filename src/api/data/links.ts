import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import type { ILinkDto } from "api/interfaces/user/ILinkDto";
import type { ILinkCategoryDto } from "api/interfaces/user/ILinkCategoryDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "db&view=";

const LinksDataProvider = {
    getLinks: (): Promise<IWebDataResult<ILinkCategoryDto[]>> => {
        return dataProvider(`${baseUrl}links`);
    },
    getLink: (id: number): Promise<IWebDataResult<ILinkDto>> => {
        return dataProvider(`${baseUrl}link&id=${id}`);
    },
};
export default LinksDataProvider;
