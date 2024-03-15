import { IWebDataResult } from "api/interfaces/data/IWebDataResult";

import { dataProvider } from "./dataProvider";

const baseUrl = "files&view=";
const FilesDataProvider = {
    uploadFile: (file: File): Promise<IWebDataResult<string>> => {
        const fd = new FormData();
        fd.append("formFile", file);
        fd.append("fileName", file.name);
        return dataProvider(baseUrl + `add`, "post", fd, {
            requestType: "raw",
        });
    },
    remove: (name: string): Promise<boolean> => {
        return dataProvider(baseUrl + `remove`, "post", { name });
    },
};
export default FilesDataProvider;
