import db from "@/config/firebase";
import {ref, onValue} from "firebase/database"
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/Protected";

import { useEffect, useState } from "react";
import { useAuthContext } from '@/config/Context';
import { useRouter } from "next/router";

import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip} from 'chart.js';
import { Alert } from "@material-tailwind/react";

import moment from "moment";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

const Temperature = () => {

    const { user } = useAuthContext();
    const router = useRouter();

    //SESSION
    useEffect(() => {
        if (user == null) router.push("/session")
    }, [user]) //SESSION

    const [date, setDate] = useState([])
    const [temp, setTemp] = useState([]) 
    const [alert, setAlert] = useState(null);


    useEffect(() => {
        const dbRef = ref(db, 'Water Quality');
    
        onValue(dbRef, async(snapshot)=>{
            const data = await snapshot.val()
            console.log(data)

            let dataDate = [];
            let dataTemp = [];

            snapshot.forEach(data => {
                const dataVal = data.val();
                dataDate.push(moment.unix(dataVal.epoch).format('MM-DD-YY h:mm A'))
                dataTemp.push(dataVal.Temperature)
            })
            console.log(dataDate);

            while(dataDate.length > 15) {
                dataDate.shift()
                dataTemp.shift()
            }

            setDate(dataDate)
            setTemp(dataTemp)
        })

        }, [])

    useEffect(() => {
        if (temp.length > 0 && temp[temp.length - 1] > 30) {
            setAlert(
                <Alert color="red">
                    <div className="flex-1">
                        <span className="text-xl font-bold block text-red-700">Temperature Alert!</span>
                        <p className="text-sm truncate">The temperature has exceeded 30 degrees Celsius.</p>
                    </div>
                </Alert>
            );
        } else {
            setAlert(null);
        }
    }, [temp]);

    const tempData = {
        labels: date ? [...date] : null,
        datasets: [
            {
                label: 'Temperature',
                data: temp ? [...temp] : null,
                backgroundColor : ['#ff577f45'],
                borderColor: ['#eb596e'],
                pointBackgroundColor: '#ec4646',
                pointBorderColor: '#ec4646',
            },
        ]
    }

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontSize: 8
                }
            }],
            yAxes: [{
                ticks: {
                    fontSize: 10,
                    min: 0,
                    max: 50
                }
            }]
        }
    }

    return(
        <ProtectedRoute>
            <Layout>
                <div className="flex w-full flex-col gap-2">
                    {alert}
                </div>
                <div>
                    <Line data={tempData} options={options}/>
                </div> 
            </Layout>
        </ProtectedRoute>
    )
}

export default Temperature;