import React from 'react'
import { Typography } from '@mui/material';
import useStyles from './styles';

const AboutUs = () => {

    const colabList = [
        {
            name: "Deepak Heman Das",
            pos: "Team Lead",
            link: "https://deepakrajpal27.github.io/",
            // image: "./../"
        },
        {
            name: "Gulshair Butt",
            pos: "Backend Lead",
            link: "https://segullshairbutt.github.io/"
        }
    ]

    const classes = useStyles();

    return (

        <div className={classes.root}>
            {/* <div>
                    <img src={deepakImage} className={classes.colabImg} />
                </div> */}
            {
                colabList.map((item, index) => {
                    return <div key={index} onClick={() => window.location.href = item.link} className={classes.colabTile}>
                        <div className={classes.colabDetails}>
                            <Typography className={classes.colabName}>{item.name}</Typography>
                            <Typography className={classes.colabTitle}>{item.pos}</Typography>
                        </div>
                    </div>
                })
            }


        </div>
    )
}

export default AboutUs