import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'


import { useNavigate } from "react-router-dom";
import { CryptoState } from '../CryptoContext';

const useStyle = makeStyles({
    cryptotitle: {
        flex:1,
        color: "#beb425",
        fontWeight: '800',
        fontSize: '20px',
        fontFamily: 'Montserrat',
        cursor: 'pointer'
    }
})

const Header = () => {
    const classes = useStyle();
    const history = useNavigate();
    const {currency, setCurrency} = CryptoState();

    console.log(currency);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#ffffff",
            },
            type: 'dark',
        },
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography onClick={() => history('/')} className={classes.cryptotitle}>
                            Crypto Tracker
                        </Typography>
                        <Select 
                        variant="outlined" 
                        style={{
                            width: 100,
                            height: 40,
                            marginLeft:20
                        }}
                        value={currency}
                        onChange={(e)=> setCurrency(e.target.value)}
                        > 
                            <MenuItem value={"INR"}>INR</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header