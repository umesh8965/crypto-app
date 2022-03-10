import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';


const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    },
    coinUp: {
        color: '#20d669'
    },
    coinDown: {
        color: '#f22727'
    }
}));

const Carousal = () => {
    const classes = useStyles()
    const [trending, setTrending] = useState([])
    const { currency, symbol } = CryptoState()


    useEffect(() => {
        fetchAllTrandingCoins()
    }, [currency])

    const fetchAllTrandingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }


    const getTrendingCoins = trending.map((coin) => {
        let profit = coin?.price_change_24h >= 0;
        return (
            <Link
                className={classes.carouselItem}
                to={`/coins/${coin.id}`}
            >
                <img
                    src={coin?.image}
                    alt={coin?.name}
                    height="80"
                    style={{ marginBottom: 10 }} />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span className={profit > 0 ? classes.coinUp : classes.coinDown}>
                    {profit && "+"}
                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                   
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });



    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={getTrendingCoins}
            >

            </AliceCarousel>
        </div>
    )
}

export default Carousal