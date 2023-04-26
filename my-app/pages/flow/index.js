import db from "@/config/firebase";
import {ref, onValue} from "firebase/database"
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { useEffect, useState } from "react";
import moment from "moment";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const Flow = () => {
    const [date, setDate] = useState([])
    const [flow, setFlow] = useState([])

    useEffect(() => {
        const dbRef = ref(db, 'Water Quality');
    
        onValue(dbRef, async(snapshot)=>{
            const data = await snapshot.val()
            console.log(data)

            let dataDate = []
            let dataFlow = []

            snapshot.forEach(data => {
                const dataVal = data.val();
                dataDate.push(moment.unix(dataVal.epoch).format('MM-DD-YY h:mm A'))
                dataFlow.push(dataVal.Flow)
            })
            console.log(dataDate)
            while(dataDate > 6) {
                dataDate.shift()
                dataFlow.shift()
            }

            setDate(dataDate)
            setFlow(dataFlow)
        })

    }, [])

    useEffect(() => {
        console.log(date)
    }, [date])

    const flowData = {
        labels: date ? [...date] : null,
        datasets: [
            {
                label: 'Temperature',
                data: flow ? [...flow] : null,
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
                    max: 100
                }
            }]
        }
    }

    return(
        <div>
            <Line data={flowData} options={options}/>
        </div>
    )
}

export default Flow;