import { IUserShortDto } from "../user/IUserShortDto";

import { IMedicineDiseases } from "./IMedicineDiseases";

export interface IMedicinePatientFullData {
    user: IUserShortDto;
    diseases: IMedicineDiseases[];
}
