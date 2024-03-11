import { useMemo } from "react";
import { useParams } from "react-router";

function useParamsId() {
    const { id = "0" } = useParams();
    const intId = useMemo(() => {
        if (!!id) {
            const newIntId = parseInt(id);
            if (!!newIntId && newIntId > 0) {
                return newIntId;
            }
        }
        return 0;
    }, [id]);
    return intId;
}

export default useParamsId;
