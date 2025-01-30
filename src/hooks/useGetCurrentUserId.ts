import { useRecoilValue } from "recoil";
import { userState } from "../recoil/atoms/userState"; // 정확한 경로 확인

const useGetCurrentUserId = (): number | null => {
    const user = useRecoilValue(userState);
    return user?.id || null;
};

export default useGetCurrentUserId;
