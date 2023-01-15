import axios from 'axios'
import { notification } from 'antd';
import translate from '../language';
import { setToken } from '../store/actions';
import { } from 'react-redux';

const URL = "https://shoppee-fake-lpdgp.appengine.bfcplatform.vn"

    const AccountService = {
        async signIn(username, password) {
            try {
                const response = await axios.post(URL + '/v1/api/account/sign-in', {
                    username: username,
                    password: password
                });
                console.log(response)
                notification.success({
                    message:  'Wellcome back ' + response.data.username,
                    duration: 3,
                });
                return response.data;
            } catch (error) {
                notification.error({
                    message: 'Unsuccess login',
                    description: 'Please check username and password',
                    duration: 3,
                });
                throw error;
            }
        },

        async signUp(username, password, confirmPassword, firstName, lastName, email, phoneNumber, dateOfBirth) {
            try {
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
                notification.success({
                    message: "Success create account.",
                    duration: 3,
                });
                return response.data.value;
            } catch (error) {
                notification.error({
                    message: 'Create account unsuccess',
                    description: error.response.data.message,
                    duration: 3,
                });
                throw error;
            }
        }
    }


export default AccountService