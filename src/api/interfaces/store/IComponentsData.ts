import { TIconName } from "components/Icon";

export interface IComponentsData {
    header: {
        title: string | "";
        icon?: TIconName | "";
        backUrl: string | null;
    };
    menu: {
        show: boolean;
        filterText: string;
        //data: IMenusItem[];
    };
    loader: {
        show: boolean;
        text?: string;
    };
    alert: {
        title?: string;
        text: string;
        type?: "info" | "error" | "success";
        show?: boolean;
    };
    withTelegram: boolean;
    redirect: null | { id?: any; page: string };
}
