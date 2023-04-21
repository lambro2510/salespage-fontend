import axios from "axios";
import { URL } from "../constant";
import { getErrorFromResponse } from "../utils";
const AccountService =  {
    async signIn(loginForm) {
        try{
            const response = await axios.post(URL + '/v1/api/account/sign-in',
            {
                username : loginForm?.username,
                password : loginForm?.password
            });
            return response.data;
        }catch(error){
            getErrorFromResponse(error);
        }
    },

    async signUp(signUpForm) {
        try{

        }catch(error){
            getErrorFromResponse(error)
        }
    }
}

export default AccountService;