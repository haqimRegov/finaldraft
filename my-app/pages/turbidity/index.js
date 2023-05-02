import db from "@/config/firebase";
import {ref, onValue} from "firebase/database"
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { useEffect, useState } from "react";
import moment from "moment";
import ProtectedRoute from "@/components/Protected";
import Layout from "@/components/Layout";
import { Alert } from "@material-tailwind/react";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const Turbidity = () => {
    const [date, setDate] = useState([])
    const [turbidity, setTurbidity] = useState([])  
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        const dbRef = ref(db, 'Water Quality');
    
        onValue(dbRef, async(snapshot)=>{
            const data = await snapshot.val()
            console.log(data)

            let dataDate = []
            let dataTurb = []

            snapshot.forEach(data => {
                const dataVal = data.val();
                dataDate.push(moment.unix(dataVal.epoch).format('MM-DD-YY h:mm A'))
                dataTurb.push(dataVal.Turbidity)
            })
            console.log(dataDate)
            
            while(dataDate.length > 20) {
                dataDate.shift()
                dataTurb.shift()
            }

            setDate(dataDate)
            setTurbidity(dataTurb)
        })

    }, [])

    useEffect(() => {
        if (turbidity.length > 0 && turbidity[turbidity.length - 1] > 30) {
            setAlert(
                <Alert color="red">
                    <div className="flex-1">
                        <span className="text-xl font-bold block text-red-700">Turbidity Alert!</span>
                        <p className="text-sm truncate">The water is becoming too cloudy</p>
                    </div>
                </Alert>
            );
        } else {
            setAlert(null);
        }
    }, [turbidity]);

    const turbData = {
        labels: date ? [...date] : null,
        datasets: [
            {
                label: 'Turbidity',
                data: turbidity ? [...turbidity] : null,
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
                    max: 3500
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
                <div className="flex w-full flex-col gap-2">
                    <Line data={turbData} options={options}/>
                </div>  
            </Layout>
        </ProtectedRoute>
    )
}

export default Turbidity;