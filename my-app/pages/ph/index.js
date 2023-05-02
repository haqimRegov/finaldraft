import db from "@/config/firebase";
import {ref, onValue} from "firebase/database"
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { useEffect, useState } from "react";
import moment from "moment";
import ProtectedRoute from "@/components/Protected";
import Layout from "@/components/Layout";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const PH = () => {
    const [date, setDate] = useState([])
    const [ph, setPh] = useState([]) 

    useEffect(() => {
        const dbRef = ref(db, 'Water Quality');
    
        onValue(dbRef, async(snapshot)=>{
            const data = await snapshot.val()
            console.log(data)

            let dataDate = []
            let dataPh = []

            snapshot.forEach(data => {
                const dataVal = data.val();
                dataDate.push(moment.unix(dataVal.epoch).format('MM-DD-YY h:mm A'))
                dataPh.push(dataVal.pH)
            })
            console.log(dataDate)

            while(dataDate.length > 20) {
                dataDate.shift()
                dataPh.shift()
            }

            setDate(dataDate)
            setPh(dataPh)
        })

    }, [])

    useEffect(() => {
        console.log(date)
    }, [date])

    const phData = {
        labels: date ? [...date] : null,
        datasets: [
            {
                label: 'Temperature',
                data: ph ? [...ph] : null,
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
                tickes: {
                    fontSize: 10,
                    min: 0,
                    max: 14
                }
            }]
        }
    }

    return(
        <ProtectedRoute>
            <Layout>
                <div>
                    <Line data={phData} options={options}/>
                </div>
            </Layout>
        </ProtectedRoute>
    )
}

export default PH;