import { MedicineTestEnum } from "api/enums/MedicineTestEnum";

export interface IMedicineTest {
    id: number;
    title: string;
    description: string;
    type: MedicineTestEnum;
    place: string;
    timer: number;
    params: number[];
}
