import { useAuthContext } from '@/config/Context';
import { useRouter } from 'next/router'
import { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";

const SignUp = () => {
    const {signUp} = useAuthContext();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/home")
    }
    return (
        <div class="bg-black w-screen h-screen flex items-center justify-center">
        <Card color="white" shadow={false} className="h-screen flex items-center justify-center rounded-s-2xl border-2 border-white">
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <form onSubmit={handleForm} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <label htmlFor="email">
                            <Input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" size="lg" label="Email" />
                        </label>
                        <label htmlFor="password">
                            <Input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" label="Password" />
                        </label>
                    </div>
                        <Button type="submit" className="mt-6" fullWidth>
                            Sign Up
                        </Button>
                </form>        
        </Card>
        </div>
    );
}

export default SignUp;