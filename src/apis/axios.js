import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// const URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api' // live
const URL = 'https://kickers-backend-5e360941484b.herokuapp.com/api' // local

export const ApiHandler = async (auth = true, isMutipart = false) => {
    console.log(".... runs api handler ...")
    try {
        const instance = axios.create({
            baseURL: URL,
        })
        const token = await AsyncStorage.getItem('Token')
    
        instance.interceptors.request.use((req) => {
            if (auth) {
                console.log(".... is Auth ....")
                req.headers.Authorization = `Bearer ${token}`
            }
            if (isMutipart) {
                req.headers['Content-Type'] = 'multipart/form-data'
            }

            console.log(".... req object api ....", req)
            // Do something before request is sent
            return req;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    
        return instance
    } catch (error) {
        console.log('error and api handler' , error.response)
    }
} 