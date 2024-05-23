import React, {useCallback, useMemo} from 'react';
import {Link, useForm} from '@inertiajs/react';
import AuthLayout from "@/Layouts/AuthLayout";
import styles from './style.module.scss';

const Login = () => {

    const {data, setData, post, errors, clearErrors} = useForm({
        email: "",
        password: ""
    });

    const submit = useCallback((e) => {
        e.preventDefault();
        post('/login');
    }, [post]);

    const handleChange = useCallback((e) => {
        setData(e.target.name, e.target.value);
        if (errors) clearErrors();
    }, [setData, errors]);

    const isInvalid = useMemo(() => !!errors.email || !!errors.password, [errors]);

    return (
        <AuthLayout>
            <h2>Login to your account</h2>
            <form className={styles.form} onSubmit={submit}>
                <input type={"email"} placeholder={"Email"} name={"email"} value={data.email} onChange={handleChange} aria-invalid={isInvalid} autoComplete={"email"} required />
                <input type={"password"} placeholder={"Password"} name={"password"} value={data.password} onChange={handleChange} aria-invalid={isInvalid} autoComplete={"current-password"} required />
                <button type={"submit"}>Sign in</button>
            </form>
            <div className={styles.registerLink}>
                Don't have an account? <Link href={"/register"}>Register</Link>
            </div>
        </AuthLayout>
    );
}

export default Login;
