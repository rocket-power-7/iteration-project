import BarChart from "./BarChart.jsx";
import React, { useEffect, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LineChart from "./LineChart.jsx";



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
    const [graphColor, setGraphColor] = useState()
    const [totalEmissions, setTotalEmissions] = useState()
    const [totalEmissionsGraph, setTotalEmissionsGraph] = useState()
    const [totalEmissionsGraphAvg, setTotalEmissionsGraphAvg] = useState()
    const [compareValue, setComparison] = useState('');
    const [carHistoricalData, setCarHistoricalData] = useState([2,8,5,6,3])
    const [bikeHistoricalData, setBikeHistoricalData] = useState([4,7,2,7,3])
    const [homeHistoricalData, setHomeHistoricalData] = useState([7,9,5,2,5])
    const [arrLength, setArrLength] = useState()
    const [historicalColor, setHistoricalColor] = useState()

    useEffect(() => {
            const arr = []
            console.log(carHistoricalData.length)
            for(let i = 1; i<=carHistoricalData.length; i++) {
                arr.push(i)
            }
            setArrLength(arr)
            if(carHistoricalData[arr.length-1] > carHistoricalData[0]) {
                setHistoricalColor('red')
            } else {
                setHistoricalColor('green')
            }
    }, [])

    const message = (data, average, type) => {
        if(data > average) {
            const percentage = (((data-average)/average)*100).toFixed(1)
            return `- Your ${type} carbon emissions are worse than the average ${type} by ${percentage}%`
        } else {
            const percentage = (((average-data)/average)*100).toFixed(1)
            return `- Your ${type} carbon emissions are better than the average ${type} by ${percentage}%`
        }
    }

    const data = (data, average) => {
            let result = Number(data).toFixed(2)
            return `(${result} kg vs ${average} kg)`
    }

    const gColor = (data, average) => {
        if(data > average) {
            return "red"
        } 
        return "green"
}

    const compareCO2 = (userArr, avgArr) => {
            if(userArr.length === 0) return
            const sumUser = userArr.reduce((partialSum, a) => partialSum + a, 0);
            const sumAvg = avgArr.reduce((partialSum, a) => partialSum + a, 0);
            if (sumUser > sumAvg) return `Your total weekly carbon emissions are ${(sumUser-sumAvg).toFixed(2)} kg more than the average`
            return `Your total weekly Carbon emissions are ${(sumAvg-sumUser).toFixed(2)} kg less than the average`
    }

    useEffect(() => {
        const averages = []
        const userData = []
        const label = []
        const color = []
        const carAvg = 1;
        const homeAvg = 2;
        const bikeAvg = 3;
        console.log(carCarbon)
        if(carCarbon !== 0) {
            averages.push(carAvg)
            userData.push(Number(carCarbon))
            label.push('Car')
            setCarMessage(message(carCarbon, carAvg, 'car') + ' ' + ' ' + data(carCarbon, carAvg))
            color.push(gColor(carCarbon, carAvg))
        }
        if (homeCarbon !== 0 ) {
            console.log(homeCarbon)
            averages.push(homeAvg)
            userData.push(Number(homeCarbon))
            label.push('Home')
            setHomeMessage(message(homeCarbon, homeAvg, 'home') + ' ' + ' ' + data(homeCarbon, homeAvg))
            color.push(gColor(homeCarbon, homeAvg))
        }
        if (bikeCarbon !== 0) {
            averages.push(bikeAvg)
            userData.push(Number(bikeCarbon))
            label.push('Motorbike')
            setBikeMessage(message(bikeCarbon, bikeAvg, 'bike')+ ' ' + ' ' + data(bikeCarbon, bikeAvg))
            color.push(gColor(bikeCarbon, bikeAvg))
        }
        

        setAvg(averages)
        setNames(label)
        setUserData(userData)
        setGraphColor(color)
        let x = compareCO2(userData, averages)
        setTotalEmissions(compareCO2(userData, averages))
        


    }, [carCarbon, bikeCarbon, homeCarbon])

    let graphData = {
        datasets: [{
            label: 'Your Data',
            data: userData,
            backgroundColor: graphColor,
        },{
            label: 'Average Data',
            data: avg,
            backgroundColor: ["blue"],
        }],
        labels: names,
    }



    let lineGraphData = {
        labels: arrLength,
        datasets: [{
            label: "Car",
            data: carHistoricalData,
            borderColor: "purple",
        },{
            label: "Bike",
            data: bikeHistoricalData,
            borderColor: "green",
        },{
            label: "Home",
            data: homeHistoricalData,
            borderColor: "blue",
        }]
    }

    const renderBox = () => {
        if (compareValue == "current"){
          return (
            <div>
            <BarChart chartData={graphData} style={{alignItems: "left"}}/>
            </div>
          )
        }
    
        if (compareValue == "historical"){
          return (
            <LineChart chartData={lineGraphData} style={{alignItems: "left"}}/>
          )
        }
      }

      const handleChange = (event, newCompare) => {
        setComparison(newCompare);
      };

    return (
        <div className="dashboard" style={{ background: 'linear-gradient(to right bottom, #D3D3D3, #abf7b1	)'}}>
            <div className="stats">
            <h3 style={{textAlign: "center", fontFamily: "system-ui"}}>EMISSION STATISTICS</h3>
            <h5 className="statss" style={{textAlign: "left", marginLeft: "15px", fontFamily: "sans-serif"}}>{carMessage}</h5>
            <h5 className="statss" style={{textAlign: "left", marginLeft: "15px", fontFamily: "sans-serif"}}>{bikeMessage}</h5>
            <h5 className="statss" style={{textAlign: "left", marginLeft: "15px", fontFamily: "sans-serif"}}>{homeMessage}</h5>
            <h4 className="statss" style={{textAlign: "center", marginLeft: "15px", fontFamily: "sans-serif"}}>{totalEmissions}</h4>
            </div>
            <div className="barchart" style={{margin: "10px", width: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <ToggleButtonGroup
            color="primary"
            value={compareValue}
            exclusive
            onChange={handleChange}
            sx={{background: "lightgrey"}}
            size="small"

            >
            <ToggleButton value="current">Current</ToggleButton>
            <ToggleButton value="historical" >Historical</ToggleButton>
            </ToggleButtonGroup>
            {renderBox()}
            </div>
        </div>
    )
 }