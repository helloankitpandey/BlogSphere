import { SignupInput } from "@akki2216/medium-zod";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {

    const navigate = useNavigate();
    // trpc is strictly type for both backend & frontend 
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest() {

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (e) {
            // alert the user that the request failed
            alert("Error while signing up")
        }

    }


    return (
        <div className="h-screen flex justify-center flex-col">
            {/* {JSON.stringify(postInputs)} */}
            <div className="flex justify-center">
               <div>
               <div className="px-10">
                    <div className="text-3xl font-extrabold">
                    {type === "signin" ? "Log In Now": "Create Your Profile"}
                    </div>
                    <div className="text-slate-500">
                    {type === "signin" ? "Haven’t joined yet?" : "Start where you left off-" } 
                        <Link className="pl-1 underline" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up": "Sign in"}
                        </Link>
                        {/* Reconnect with your thoughts-Login */}
                    </div>
                </div>
                <div className="pt-1">
                {type === "signup" ? <LabelledInput lable="Name" placeholder="Ankit Pandey..." onchange={(e) => {
                    setPostInputs({
                        ...postInputs, //give me all existing keys from here
                        name: e.target.value
                    })
                }} /> : null }
                <LabelledInput lable="Email" placeholder="ankit@gmail.com" onchange={(e) => {
                    setPostInputs({
                        ...postInputs, //give me all existing keys from here
                        username: e.target.value
                    })
                }} />
                <LabelledInput lable="Password" type={"password"} placeholder="123456" onchange={(e) => {
                    setPostInputs({
                        ...postInputs, //give me all existing keys from here
                        password: e.target.value
                    })
                }} />
                <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    {type === "signup" ? "Sign up" : "Sign in"}
                </button>
                </div>
               </div>
            </div>
        </div>
    )
}

interface LabelledInputType {
    lable: string;
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ lable, placeholder, onchange, type }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-lg text-black font-bold pt-4">{lable}</label>
            <input onChange={onchange} type={ type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}