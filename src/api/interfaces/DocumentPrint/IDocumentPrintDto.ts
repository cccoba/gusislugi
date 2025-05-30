import type { IDocumentPrintParamDto } from "./IDocumentPrintParamDto";

export interface IDocumentPrintDto {
    id: number;
    title: string;
    zipName: string;
    originalName: string;
    exampleName: string;
    params: IDocumentPrintParamDto[];
}
