import db from "@/config/firebase";
import {ref, onValue} from "firebase/database"
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { useEffect, useState } from "react";
import moment from "moment";
import { useAuthContext } from '@/components/Context';
import { useRouter } from "next/navigation";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

const Temperature = () => {
    //SESSION
    const { user } = useAuthContext();
    const router = useRouter();

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

            let dataDate = []
            let dataTemp = []

            snapshot.forEach(data => {
                const dataVal = data.val();
                dataDate.push(moment.unix(dataVal.epoch).format('MM-DD-YY h:mm A'))
                dataTemp.push(dataVal.Temperature)
            })
            console.log(dataDate)
            while(dataDate > 6) {
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
                tickes: {
                    fontSize: 10,
                    min: 0,
                    max: 50
                }
            }]
        }
    }

    return(
        <div>
            <Line data={tempData} options={options}/>
        </div>
    )
}

export default Temperature;