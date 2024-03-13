export interface IComponentsData {
    header: {
        title: string | "";
        icon: string | null;
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
    redirect: null | { id?: any; page: string };
}
