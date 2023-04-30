import { useAuthContext } from "@/config/Context";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";

const SignIn = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {signIn} = useAuthContext();
    const router = useRouter()

    const handleForm = async (data) => {
        try {
            await signIn(data.email, data.password);
            //router.push("/home");
          } catch (error) {
            alert(error.message)
          }
    }

    return (
        <div class="bg-black w-screen h-screen flex items-center justify-center">
        <Card color="white" shadow={false} className="h-screen flex items-center justify-center rounded-s-2xl border-2 border-white">
            <Typography variant="h4" color="blue-gray">
                Sign In
            </Typography>
                <form onSubmit={handleSubmit(handleForm)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <label htmlFor="email">
                            <Input {...register("email", {required: "Email is required"})} type="email" placeholder="example@mail.com" />
                        </label>
                        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                        <label htmlFor="password">
                            <Input {...register("password", {required: "Password is required"})} type="password" placeholder="password"/>
                        </label>
                        {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                    </div>
                        <Button type="submit" className="mt-6" fullWidth>
                            Sign In
                        </Button>
                </form>        
        </Card>
        </div>
    )
}

export default SignIn;