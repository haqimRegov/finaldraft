import db from "@/config/firebase";
import {ref, onValue} from "firebase/database"
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/Protected";

import { useEffect, useState } from "react";
import { useAuthContext } from '@/config/Context';
import { useRouter } from "next/router";

import { Bar, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';

import moment from "moment";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Temperature = () => {

    const { user } = useAuthContext();
    const router = useRouter();

    //SESSION
    useEffect(() => {
        if (user == null) router.push("/session")
    }, [user]) //SESSION

    const [date, setDate] = useState([])
    const [temp, setTemp] = useState([]) 


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

            while(dataDate.length > 10) {
                dataDate.shift()
                dataTemp.shift()
            }

            setDate(dataDate)
            setTemp(dataTemp)
        })

        }, [])

    useEffect(() => {
        console.log(date)
    }, [date])

    const tempData = {
        labels: date ? [...date] : null,
        datasets: [
            {
                label: 'Temperature',
                data: temp ? [...temp] : null,
                borderColor: ['#eb596e'],
                backgroundColor : ['#ff577f45'],
                pointBackgroundColor: '#ec4646',
                pointBorderColor: '#ec4646'
            },
        ]
    }

    const options = {
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
                <div>
                    <Line data={tempData} options={options}/>
                </div> 
            </Layout>
        </ProtectedRoute>
    )
}

export default Temperature;