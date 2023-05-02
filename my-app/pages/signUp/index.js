import { useAuthContext } from '@/config/Context';
import { useForm } from "react-hook-form";
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
    const {register, handleSubmit, formState:{errors}} = useForm();

    const handleForm = async (data) => {
        await signUp(data.email, data.password);
    }

    return (
        <form onSubmit={handleSubmit(handleForm)}>
            <div className="bg-blue-gray w-screen h-screen flex items-center justify-center">
            <Card className="w-2/6 h-4/6 rounded-2xl border-solid border-4 border-amber">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-8 my-8 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign Up
                    </Typography>
                </CardHeader>

                <CardBody className="flex flex-col gap-4">
                    <div className="mb-4 flex flex-col gap-6">
                        <label htmlFor="email">
                            <Input {...register("email", {required: "Email is required"})} type="email" placeholder="example@mail.com" />
                        </label>
                        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                        <label htmlFor="password">
                            <Input {...register("password", {required: "Password is required"})} type="password" placeholder="password" />
                        </label>
                        {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                    </div>
                </CardBody>
                
                <CardFooter className="pt-0">
                    <Button type="submit" className="mt-6" fullWidth>
                        Sign Up
                    </Button> 
                </CardFooter> 
            </Card>
            </div>
        </form>
    );
}

export default SignUp;