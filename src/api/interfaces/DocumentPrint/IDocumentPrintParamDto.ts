import type { DocumentPrintParamAlignEnum } from "api/enums/DocumentPrintParamAlignEnum";
import type { DocumentPrintParamTypeEnum } from "api/enums/DocumentPrintParamTypeEnum";

export interface IDocumentPrintParamDto {
    type: DocumentPrintParamTypeEnum;
    size: number;
    color: string;
    x: number;
    y: number;
    width: number;
    height: number;
    align: DocumentPrintParamAlignEnum;
}
