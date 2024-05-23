import React, {useCallback} from 'react';
import {Link, useForm} from '@inertiajs/react';
import AuthLayout from "@/Layouts/AuthLayout";
import styles from './style.module.scss';

const Register = () => {

    const {data, setData, post, errors, clearErrors} = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const submit = useCallback((e) => {
        e.preventDefault();
        post('/register');
    }, [post]);

    const handleChange = useCallback((e) => {
        setData(e.target.name, e.target.value);
        if (errors) clearErrors(e.target.name);
    }, [setData]);

    return (
        <AuthLayout>
            <h2>Create a new account</h2>
            <form className={styles.form} onSubmit={submit}>
                <input type={"text"} placeholder={"Full name"} name={"name"} value={data.name} onChange={handleChange} aria-invalid={!!errors.name} autoComplete={"name"} required/>
                <input type={"email"} placeholder={"Email"} name={"email"} value={data.email} onChange={handleChange} aria-invalid={!!errors.email} autoComplete={"email"} required/>
                <input type={"password"} placeholder={"Password"} name={"password"} value={data.password} onChange={handleChange} aria-invalid={!!errors.password} autoComplete={"new-password"} required/>
                <input type={"password"} placeholder={"Confirm password"} name={"password_confirmation"} value={data.password_confirmation} onChange={handleChange} aria-invalid={!!errors.password_confirmation} autoComplete={"new-password"} required/>
                <button type={"submit"}>Sign up</button>
            </form>
            <div className={styles.registerLink}>
                Already have an account? <Link href={"/login"}>Login</Link>
            </div>
        </AuthLayout>
    );
}

export default Register;
