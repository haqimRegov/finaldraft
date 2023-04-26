import {useState} from "react";
import signIn from "@/config/signin";
import { useRouter } from 'next/navigation'
import styles from "@/styles/Home.module.css"

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/home")
    }
    return (<div className={styles.login_form_container}>
        <div className={styles.login_form}>
            <h1 className={styles.header}>Sign In</h1>
            <form onSubmit={handleForm} className={styles.form}>
                <label htmlFor="email">
                    <input className={styles.input_text} onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <input className={styles.input_text} onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <button type="submit">Sign In</button>
            </form>
        </div>

    </div>);
}

export default SignIn;