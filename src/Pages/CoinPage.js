import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../Components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from "../Components/CoinsTable";
import parse from 'html-react-parser';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    fontFamily: "Montserrat",
    paddingBottom: 15,
    paddingTop: 0,
    padding: 25,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    paddingTop: 10,
    padding: 25,
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const CoinPage = () => {

  const {id} = useParams();
  const [getCoin, setGetCoin] = useState([]);
  const classes = useStyles();

  const { currency, symbol } = CryptoState();

  useEffect(() => {
    getCoinsDetails()
   
  }, [currency])
  

  const getCoinsDetails = async () => {
    const getSingleCoin = await axios.get(SingleCoin(id));
    setGetCoin(getSingleCoin.data);
  }


  if (getCoin.length <= 0) {
    return <LinearProgress style={{ backgroundColor: "gold" }} />
  };
  
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
      <img
          src={getCoin?.image.large}
          alt={getCoin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        
         <Typography variant="h3" className={classes.heading}>
          {getCoin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
         
          {parse(getCoin?.description.en.split(". ")[0])}.
        </Typography>

        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(getCoin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                getCoin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                getCoin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
   <CoinInfo coin={getCoin} />
      </div>
   


  )
}

export default CoinPage