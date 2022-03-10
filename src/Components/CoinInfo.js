import { Button, CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';

import {
    Chart as ChartJS, CategoryScale, LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { chartDays } from '../config/buttonData';
import SelectButton from './SelectButton';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const useStyles = makeStyles((theme) => ({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
    },
}));
const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
    },
});

const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState([]);
    const { currency, symbol } = CryptoState();
    const [days, setDays] = useState(1);
    const classes = useStyles();

    useEffect(() => {
        getHistoricData()
    }, [currency, days])


    const getHistoricData = async () => {
        const getHistoricPriceData = await axios.get(HistoricalChart(coin.id, days, currency))
        const getHistoricPriceDetails = getHistoricPriceData.data
        setHistoricData(getHistoricPriceDetails.prices)
    }
    console.log(historicData)
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    historicData.length <= 0 ? (
                        <CircularProgress
                            style={{ color: "gold" }}
                            size={250}
                            thickness={1}
                        />
                    ) : (
                        <>
                            <Line

                                data={{
                                    labels: historicData.map((coin) => {
                                        let date = new Date(coin[0]);
                                        let time = date.getHours > 12 ?
                                            `${date.getHours() - 12} : ${date.getMinutes()} PM` :
                                            `${date.getHours()} : ${date.getMinutes()} AM`
                                        return days === 1 ? time : date.toLocaleDateString();
                                    }),
                                    datasets: [
                                        {
                                            data: historicData.map((coin) => coin[1]),
                                            label: `Price ( Past ${days} Days ) in ${currency}`,
                                            borderColor: "#EEBC1D",
                                        },
                                    ],

                                }}
                                options={{
                                    elements: {
                                        point: {
                                            radius: 1,
                                        },
                                    },
                                }}
                            />
                            <div style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}>
                                {chartDays.map((timeline) => (
                                    <SelectButton
                                        key={timeline.value}
                                        onClick={() => setDays(timeline.value)}
                                        selected={timeline.value === days}
                                    >
                                        {timeline.label}
                                    </SelectButton>
                                ))}
                            </div>
                        </>
                    )
                }
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo