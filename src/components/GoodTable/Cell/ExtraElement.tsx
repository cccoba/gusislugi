import { ReactNode } from "react";

interface IProps {
    element?: ReactNode | Function;
    rowValues: any;
}

function GoodTableCellExtraElement({ element, rowValues }: IProps) {
    return <>{!!element ? (typeof element === "function" ? element(rowValues) || null : element) : null}</>;
}
export default GoodTableCellExtraElement;
