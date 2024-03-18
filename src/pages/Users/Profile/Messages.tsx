import { users } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import lang from "lang";

interface IProps {}

const langPage = lang.pages.profile.messages;

function ProfileMessages({}: IProps) {
    const { data = [], error, isLoading: usersIsLoading, refetch } = useLoadApiData(users.getMessages, []);
    return <></>;
}
export default ProfileMessages;
