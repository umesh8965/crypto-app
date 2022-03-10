import { Container, createTheme, LinearProgress, Table, TableContainer, TableHead, TableCell, TableRow, TextField, ThemeProvider, Typography, TableBody, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'


const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
            fontFamily:'Montserrat, sans-serif',
        },
        type: "dark",
    },
});

const useStyle = makeStyles(() => ({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color: "#beb425",
        },
    },
    coinUp: {
        color: '#20d669'
    },
    coinDown: {
        color: '#f22727'
    }
}));


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
    const classes = useStyle();
    const [coinlist, setCoinlist] = useState([])
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const { currency, symbol } = CryptoState();
    const [page, setPage] = useState(1);
    const history = useNavigate();


    useEffect(() => {
        fetchAllCoins()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])


    const fetchAllCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency))
        setCoinlist(data)
        setLoading(false);
    }

    const handleSearchCoins = () => {
        return coinlist.filter((coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )
    }


    return (
        <ThemeProvider theme={darkTheme}>
            <Container>
                <Typography
                    variant="h4"
                    style={{ margin: 18 }}>
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    style={{ marginBottom: 20, width: "100%" }}
                    label="Search For a Crypto Currency.."
                    variant="outlined"
                    onChange={(e) => setSearch(e.target.value)}
                ></TextField>

                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "#beb425" }}></LinearProgress>
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: "#beb425" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        handleSearchCoins()
                                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map((row) => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            return (
                                                <TableRow
                                                    onClick={(() => history(`/coins/${row.id}`))}
                                                    className={classes.row}
                                                    key={row.name}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope='row'
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}
                                                    >
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />
                                                        <div
                                                            style={{ display: "flex", flexDirection: "column" }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey" }}>
                                                                {row.name}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {symbol}{" "}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        className={profit > 0 ? classes.coinUp : classes.coinDown}
                                                        style={{
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {symbol}{" "}
                                                        {numberWithCommas(
                                                            row.market_cap.toString().slice(0, -6)
                                                        )}
                                                        M
                                                    </TableCell>
                                                </TableRow>
                                            )

                                        })
                                    }
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination 
                count={(handleSearchCoins().length / 10).toFixed(0)}
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                  }}
                  classes={{ ul: classes.pagination }}
                ></Pagination>
            </Container>
        </ThemeProvider>

    )
}

export default CoinsTable