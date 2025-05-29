import type { IDocumentPrintParamDto } from "./IDocumentPrintParamDto";

export interface IDocumentPrintDto {
    id: number;
    title: string;
    image: string;
    params: IDocumentPrintParamDto[];
}
