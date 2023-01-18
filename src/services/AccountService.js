import axios from 'axios'
import { notification } from 'antd';
import { } from 'react-redux';

const URL = "https://shoppee-fake-lpdgp.appengine.bfcplatform.vn"

const AccountService = {
    async signIn(username, password) {
        const response = await axios.post(URL + '/v1/api/account/sign-in', {
            username: username,
            password: password
        });
        return response.data;

    },

    async signUp(username, password, confirmPassword, firstName, lastName, email, phoneNumber, dateOfBirth) {
            const response = await axios.post(URL + '/v1/api/account/sign-up', {
                username: username,
                password: password,
                confirmPassword: confirmPassword,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                dateOfBirth: dateOfBirth
            });
        return response.data;
    }
}


export default AccountService