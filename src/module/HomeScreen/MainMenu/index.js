import * as React from 'react';
import UserService from '../../../service/UserService';

const MainMenu = () => {
    const [profile, setProfile] = React.useState({});

    React.useEffect(() => {
        setProfile(getProfileData);
    })

    const getProfileData = async () =>  await UserService.getProfile();

}