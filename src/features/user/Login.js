import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import axios from 'axios'

function Login(){

    const INITIAL_LOGIN_OBJ = {
        password : "",
        emailId : ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    console.log("🚀😍 ------------------------------------------------------🚀😍");
    console.log("🚀😍 ~ file: Login.js:18 ~ Login ~ loginObj:", loginObj);
    console.log("🚀😍 ------------------------------------------------------🚀😍");


    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")

        if(loginObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
        if(loginObj.password.trim() === "")return setErrorMessage("Password is required! (use any value)")
        else{
            setLoading(true);
            // Call API to check user credentials and save token in localstorage
            /* The line `axios.post(loginObj)` is making a POST request to an API endpoint with the
            `loginObj` as the request body. It is sending the user's login credentials (email and
            password) to the server for authentication. */

           try {
            axios.post('http://localhost:8080/api/users/admin', loginObj).then( res => {
                setLoading(false);
                if(res){
                    localStorage.setItem("token", "DumyTokenHere")
                    setLoading(false)
                    window.location.href = '/app/welcome'
                } else {
                    localStorage.setItem("token", "")
                    setLoading(false)
                    setErrorMessage('Something went wrong, please contact to the Admin');
                }
            }).catch(error => {

                console.log("🚀😍 -----------------------------------------------------🚀😍");
                console.log("🚀😍 ~ file: Login.js:50 ~ axios.post ~ error:", error);
                console.log("🚀😍 -----------------------------------------------------🚀😍");

                
                localStorage.setItem("token", "")
                setLoading(false)
                setErrorMessage('Something went wrong, please contact to the Admin');
            })
           } catch (error) {

            console.log("🚀😍 -----------------------------------------------------🚀😍");
            console.log("🚀😍 ~ file: Login.js:62 ~ submitForm ~ error:", error);
            console.log("🚀😍 -----------------------------------------------------🚀😍");

            
           }
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setLoginObj({...loginObj, [updateType] : value})
    }

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                    <form onSubmit={(e) => submitForm(e)}>

                        <div className="mb-4">

                            <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/>

                            <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue}/>

                        </div>

                        <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                        <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

                        <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login