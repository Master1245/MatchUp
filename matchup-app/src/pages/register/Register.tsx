import { useEffect } from "react";
import { WordLanguage } from "../../components/language/Language";
import RegisterForm from "../../components/forms/register-form/RegisterForm";
import Navbar from "../../components/navbar/Navbar";
import "./register.styles.scss";

export function Register() {
    useEffect(() => {
        document.title = "BaileSul - Register";
    }, []);
    return (
        <>
            <Navbar />
            <div className="container">
                <h2 style={{textAlign:'center', marginTop:40}}>
                    <WordLanguage text="Register now!" />
                </h2>
                <RegisterForm />
            </div>
        </>
    )
}