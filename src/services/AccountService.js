import axios from 'axios'

const URL = "https://salepage-server-rherm.appengine.bfcplatform.vn/"

const AccountService = {
    async signIn(username, password) {
        const response = await axios.post(URL + '/v1/api/account/sign-in', {
            username: username,
            password: password
        },{
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type' : 'application/json',
                'Accept' : '*/*',
                'Accept-Encoding' : 'gzip, deflate, br',
                'Connection' : 'keep-alive'
            }
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
            },{
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                }
            });
        return response.data;
    },

    async verifyCode(token, code) {
        const response = await axios.post(URL + '/v1/api/account/verify', {
            code: code
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Access-Control-Allow-Origin' : '*'
            }
        });
        return response.data;
    },

    async createVerifyCode(token) {
        const response = await axios.post(URL + '/v1/api/account/verify-code', null, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        return response.data;
    }
}

export default AccountService
