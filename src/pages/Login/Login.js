import React, {useEffect, useState} from "react";

import eyeIcon from "../../assets/images/eye-icon.svg";
import appStore from "../../assets/images/app-store.png";
import googlePlay from "../../assets/images/google-play.png";

import "./Login.css";
import {useFormik} from "formik";

import * as yup from "yup"

// --------------------------------------------------------

const Input = (props) => {

    const statuses = {
        invalid: {
            input: {
                className: "input-invalid"
            },
        },
        valid: {
            input: {
                className: "input-valid"
            },
        }
    }

    const status = statuses[props.status ?? "valid"]

    return (<div className="form-group">
        <input
            type={props.type ?? "text"}
            id={props.id}
            name={props.name}
            defaultValue={props.value}
            onBlur={props.onBlur}
            onChange={props.onChange}
            placeholder={props.placeHolder}
            className={`form-control ${status.input.className}`}
        />
        <span className={"error-message"}>{props.errorMessage}</span>
        {props.absoluteRightComponent}
    </div>)
}

// --------------------------------------------------------

const SecureInput = (props) => {
    const [visibility, setVisibility] = useState(false);

    return (<Input
        {...props}
        type={visibility ? "text" : "password"}
        absoluteRightComponent={<button
            type="button"
            className="visibility"
            onClick={() => setVisibility(!visibility)}
        >
            <img src={eyeIcon} alt="eye-icon"/>
        </button>}
    />)
}

// --------------------------------------------------------

const Button = (props) =>
{
    const statuses = {
        disable: {
            disabled: true
        },
        active: {}
    }

    const status = statuses[props.status ?? "active"]

    return (
        <button onClick={props.onClick} disabled={status.disabled} type="button" className="btn btn-primary login-btn">
            <span>Log In</span>
        </button>
    )
}

// --------------------------------------------------------

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('The email format is not valid')
        .required('This is a required field'),
    password: yup
        .string()
        .required('This is a required field')
        .min(8, 'The password should be greater than 8 characters')
        .matches(
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]+$/,
            'The password format is not valid'
        ),
});

const LoginForm = () =>
{
    const [submitBtnStatus, setSubmitBtnStatus] = useState("active")

    const formController = useFormik({
        validateOnChange: false,
        validateOnBlur: true,
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            alert(`Email: ${values.email}\nPassword: ${values.password}`);
        }
    })

    const handleSubmit = () => {
        try {
            validationSchema.validateSync(formController.values, { abortEarly: false })
            setSubmitBtnStatus("active")
        } catch (e) {
            setSubmitBtnStatus("disable")
        }
        formController.handleSubmit()

    }

    const handleInputChange = (e) => {
        formController.setFieldError(e.target.name, '');
        formController.handleChange(e);
        setSubmitBtnStatus("active")
    };

    return (
        <form method="post">
            <Input
                id={"email"}
                name={"email"}
                onBlur={formController.handleBlur}
                onChange={handleInputChange}
                value={formController.values.email}
                errorMessage={formController.touched.email && formController.errors.email}
                placeHolder={"Email"}/>
            <SecureInput
                id={"password"}
                name={"password"}
                onBlur={formController.handleBlur}
                onChange={handleInputChange}
                value={formController.values.password}
                errorMessage={formController.touched.password && formController.errors.password}
                placeHolder={"Password"}/>
            <Button status={submitBtnStatus} onClick={handleSubmit}/>
        </form>
    )
}

// --------------------------------------------------------

const Login = () => {

    return (<div className="login-page">
        <div className="login-section">
            <h2 className="title">Instagram</h2>
            <div className="login-container">

                <LoginForm/>

                <p className="seperator">
                    <span className="seperator-text">or</span>
                </p>
                <ul className="alternative-login">
                    <li>
                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className="social-icon"></span>
                            <span className="social-text">Login with Facebook</span>
                        </a>
                    </li>
                </ul>
                <p className="forget-password">
                    <a href="https://www.instagram.com/">Forgot password?</a>
                </p>
            </div>
        </div>
        <div className="signup-section">
            <p>
                Don't have an account? <a href="/signUp">Sign up</a>
            </p>
        </div>
        <div className="get-the-app-section">
            <p className="get-the-app-text">Get the app</p>
            <div className="store-list">
                <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
                    <img className="digital-store" src={appStore} alt="app-store"/>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D5FFEA1A9-BA03-4013-A737-939DD21CF41F%26utm_content%3Dlo%26utm_medium%3Dbadge">
                    <img className="digital-store" src={googlePlay} alt="app-store"/>
                </a>
            </div>
        </div>
    </div>);
};

export default Login;
