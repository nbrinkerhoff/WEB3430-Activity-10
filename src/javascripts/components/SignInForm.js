import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

toast.configure()

export function VHelp({message}){
    return <p className="help">{message}</p>
}

const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
})

export function SignInForm() {
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit(values){
            fetch('/api/users/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }).then((response) => {
                if(!response.ok) throw Error('Failed to sign in')
                return response.text()
            })
            .then(() => {
                toast('Successfully signed in', {
                    onClose: () => {
                        document.location = "/movies"
                    }
                })
            }).catch((error) => {
                toast('Failed to sign in', {
                    onClose: () => {
                        document.location = "/movies"
                    }
                })
            })

        }
    })

    const history = useHistory()
    
    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className="field">
                <label htmlFor="username">Username</label>
                <div className="control">
                    <input type="text" name="username" id="username" value={values.username} onChange={handleChange}/>
                    <VHelp message={errors.username}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <div className="control">
                    <input type="password" name="password" id="password" value={values.password} onChange={handleChange}/>
                    <VHelp message={errors.password}/>
                </div>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="field">
                <label></label>
                <div className="control">
                    <button className="primary" type="submit">Submit</button>
                    <button className="primary" onclick={()=> document.location.href = "/movies"}>Cancel</button>
                </div>
            </div>
        </form>
    )
}
