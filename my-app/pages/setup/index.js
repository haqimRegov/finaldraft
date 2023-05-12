import ProtectedRoute from "@/components/Protected";
import { useAuthContext } from '@/config/Context';
import { useEffect, useState } from "react";

import Router from 'next/router';

import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
   
  const Setup = () => {
    const { user } = useAuthContext();

    const[data, setData] = useState();

    useEffect(() => {
        if (user == null) Router.push("/session")
    }, [user]) //SESSION

    const sendProps = () => {
        Router.push("/temperature")

        Router.push({
            pathname: '/temperature',
            query: data,
        });

        Router.push({
            pathname: '/flow',
            query: data,
        });

        Router.push({
            pathname: '/turbidity',
            query: data,
        });

        Router.push({
            pathname: '/ph',
            query: data,
        });
      }

    const handleInput = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <ProtectedRoute>
            <div className="bg-dark-brown w-screen h-screen flex items-center justify-center">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="white">
                Setup
              </Typography>
              <Typography color="white" className="mt-1 font-normal">
                Enter the threshold value for each paramaeter.
              </Typography>
              <form onSubmit={sendProps} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  <Input className='border-solid border border-amber' size="lg" label="Temperature" name="temperature" onChange={handleInput}/>
                  <Input className='border-solid border border-amber' size="lg" label="Water Flow" name="waterflow" onChange={handleInput}/>
                  <Input className='border-solid border border-amber' size="lg" label="Turbidity" name="waterturb" onChange={handleInput}/>
                  <Input className='border-solid border border-amber' size="lg" label="pH" name="waterph" onChange={handleInput}/>
                </div>
                <Button type="submit" className="mt-6" fullWidth>
                  Apply
                </Button>
              </form>
            </Card>
            </div>
        </ProtectedRoute>
    );
  }

  export default Setup;