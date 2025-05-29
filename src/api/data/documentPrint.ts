import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import type { IDocumentPrintDto } from "api/interfaces/DocumentPrint/IDocumentPrintDto";
import type { IDocumentPrintCreateDto } from "api/interfaces/DocumentPrint/IDocumentPrintCreateDto";
import type { IDocumentPrintCreateResultDto } from "api/interfaces/DocumentPrint/IDocumentPrintCreateResultDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "printDocuments&view=";

const DocumentPrintDataProvider = {
    crudList: (): Promise<IWebDataResult<IDocumentPrintDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<IDocumentPrintDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IDocumentPrintDto): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    create: (data: IDocumentPrintCreateDto): Promise<IWebDataResult<IDocumentPrintCreateResultDto>> => {
        return dataProvider(baseUrl + "create", "post", data);
    },
};
export default DocumentPrintDataProvider;
