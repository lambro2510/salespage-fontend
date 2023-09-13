import { useEffect, useState } from "react";
import { UserDetail } from "../../../interfaces/models/user";
import http from "../../../utils/http";
import { apiRoutes } from "../../../routes/api";
import { handleErrorResponse } from "../../../utils";
import { Button } from "antd";

const ProfileCard = () => {

    const [profile,setProfile] = useState<UserDetail>()

    const loadProfile = () => {
        http.get(`${apiRoutes.user}/profile`)
        .then((res)=> {
            setProfile(res?.data?.data)
        })
        .catch((error) => {
            handleErrorResponse(error);
        })
    }

    useEffect(() => {
        Promise.all([loadProfile()])
        .then((res) => {})
        .catch((err) => {})
    }, [])

    return(
        <Button onClick={loadProfile}>
            click
        </Button>
    )
}

export default ProfileCard;