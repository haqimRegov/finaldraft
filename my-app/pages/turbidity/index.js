import db from "@/config/firebase";
import {ref, onValue} from "firebase/database"
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { useEffect, useState } from "react";
import moment from "moment";
import ProtectedRoute from "@/components/Protected";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const Turbidity = () => {
    const [date, setDate] = useState([])
    const [turbidity, setTurbidity] = useState([])  

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
            while(dataDate > 6) {
                dataDate.shift()
                dataTurb.shift()
            }

            setDate(dataDate)
            setTurbidity(dataTurb)
        })

    }, [])

    useEffect(() => {
        console.log(date)
    }, [date])

    const turbData = {
        labels: date ? [...date] : null,
        datasets: [
            {
                label: 'Temperature',
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
            <div>
                <Line data={turbData} options={options}/>
            </div>
        </ProtectedRoute>
    )
}

export default Turbidity;