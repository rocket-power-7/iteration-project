import BarChart from "./BarChart.jsx";
import React, { useEffect, useState } from "react";



 export default function Chart( { carCarbon, bikeCarbon, homeCarbon } ) {

    const [userData, setUserData] = useState()
    const [carData, setCarData] = useState()
    const [homeData, setHomeData] = useState()
    const [xData, setXData] = useState()
    const [avg, setAvg] = useState()
    const [names, setNames] = useState()
    const [carMessage, setCarMessage] = useState()
    const [bikeMessage, setBikeMessage] = useState()
    const [homeMessage, setHomeMessage] = useState()

    const message = (data, average, type) => {
        if(data > average) {
            const percentage = (((data-average)/average)*100).toFixed(1)
            return `Your ${type} is worse than the average American ${type} by ${percentage}%`
        } else {
            const percentage = (((average-data)/average)*100).toFixed(1)
            return `Your ${type} is better than the average American ${type} by ${percentage}%`
        }
    }

    useEffect(() => {
        const averages = []
        const userData = []
        const label = []
        const carAvg = 1;
        const homeAvg = 2;
        const bikeAvg = 3;
        console.log(carCarbon)
        if(carCarbon !== 0) {
            averages.push(carAvg)
            userData.push(carCarbon)
            label.push('car')
            setCarMessage(message(carCarbon, carAvg, 'car'))
        }
        if (homeCarbon !== 0 ) {
            console.log(homeCarbon)
            averages.push(homeAvg)
            userData.push(homeCarbon)
            label.push('home')
            setHomeMessage(message(homeCarbon, homeAvg, 'home'))
        }
        if (bikeCarbon !== 0) {
            averages.push(bikeAvg)
            userData.push(bikeCarbon)
            label.push('x')
            setBikeMessage(message(bikeCarbon, bikeAvg, 'bike'))
        }

        setAvg(averages)
        setNames(label)
        setUserData(userData)
    }, [carCarbon, bikeCarbon, homeCarbon])

    let graphData = {
        datasets: [{
            label: 'car',
            data: userData // I think should be [carz, homez, xz]
        },{
            label: 'Average',
            data: avg
        }],
        labels: names
    }

    let options = {
        chartArea:{
            backgroundColor: "rgba(251, 85, 85, 0.4)"
        }
    }

    return (
        <div className="dashboard" style={{ background: 'linear-gradient(to right bottom, #abf7b1, #D3D3D3	)', opacity: 0.8 }}>
            <div className="stats">
            <h3 style={{textAlign: "center"}}>Your Statistics</h3>
            <h5 className="statss" style={{textAlign: "left"}}>{carMessage}</h5>
            <h5 className="statss" style={{textAlign: "left"}}>{bikeMessage}</h5>
            <h5 className="statss" style={{textAlign: "left", border: "solid", marginLeft: "0px"}}>{homeMessage}</h5>
            </div>
            <div className="barchart">
                <BarChart chartData={graphData} options={options} />
            </div>
        </div>
    )
 }