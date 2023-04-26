import {useState} from "react";
import signIn from "@/config/signin";
import { useRouter } from 'next/router'
import styles from "@/styles/Home.module.css"
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

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
    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Sign In
            </Typography>
                <form onSubmit={handleForm} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <label htmlFor="email">
                        <input className="mb-4 flex flex-col gap-6" onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password">
                        <input className="mb-4 flex flex-col gap-6" onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                    </label>
                    <Button className="mt-6" fullWidth>
                        Sign In
                    </Button>
                </form>        
        </Card>);
}

export default SignIn;