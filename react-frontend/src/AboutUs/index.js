import React from 'react'
import { Typography } from '@mui/material';
import useStyles from './styles';

const AboutUs = () => {

    const colabList = [
        {
            name: "Deepak Heman Das",
            pos: "Team Lead",
            link: "https://deepakrajpal27.github.io/",
        },
        {
            name: "Gulshair Butt",
            pos: "Backend Lead",
            link: "https://segullshairbutt.github.io/"
        },
        {
            name: "Mutee Ur Rehman",
            pos: "Frontend Lead",
            link: "https://murrehman.github.io/CV/"
        },
        {
            name: "Hadil Bader",
            pos: "Git Master",
            link: "https://hadild.github.io/",
        },
        {
            name: "Trushar Mandaviya",
            pos: "Backend Developer",
            link: "https://trushar07.github.io/CV/"
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
                    return <div key={index} onClick={() => window.location.href = item.link && item.link} className={classes.colabTile}>
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