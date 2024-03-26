import { TUseGetDataName } from "store/rtkProvider";

export interface IGlobalStore {
    loadedRtk: TUseGetDataName[];
}

(document as any).GlobalStore = {
    loadedRtk: [],
};
const _store = (document as any).GlobalStore as IGlobalStore;

/**
 * простой стор для хранения глобальных данных для простой передачи между системами
 */
const GlobalStore = {
    addLoadedRtk: (name: TUseGetDataName) => {
        if (!_store.loadedRtk.includes(name)) {
            _store.loadedRtk.push(name);
            return true;
        }
        return false;
    },
    isLoadedRtk: (name: TUseGetDataName) => {
        return _store.loadedRtk.includes(name);
    },
};

export default GlobalStore;
