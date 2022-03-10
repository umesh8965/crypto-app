import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousal from './Carousal';


const useStyle = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./crypto-image-3.jpg)",
        backgroundSize: "cover",
        backgroundPosition:"center"
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "left",
        textAlign: "left",
    },
    taglineh2: {
        fontWeight: 700,
        marginBottom: 15
    },
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
}))
const Banner = () => {
    const classes = useStyle();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant='h2'
                        className={classes.taglineh2}
                    >
                        Crypto Tracker
                    </Typography>
                    Get all Information about your crypto currency.
                </div>
                <Carousal />
            </Container>
           
        </div>
    )
}

export default Banner