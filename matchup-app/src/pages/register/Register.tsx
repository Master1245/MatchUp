import RegisterForm from "../../components/forms/register-form/RegisterForm";
import Navbar from "../../components/navbar/Navbar";
import "./register.styles.scss";

export function Register() {
    return (
        <>
            <Navbar />
            <div className="container">
                <RegisterForm />
            </div>
        </>
    )
}