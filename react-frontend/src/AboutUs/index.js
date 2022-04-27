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
        },
        {
            name: "Prof. Rainer Todtenhoefer",
            pos: "CEO / CTO",
            // link: "https://trushar07.github.io/CV/"
        }
    ]

    const classes = useStyles();

    return (

        <div className={classes.root}>
            <div onClick={() => window.location.href = colabList[0].link && colabList[0].link} className={classes.one}>
                <div className={classes.colabDetails}>
                    <Typography className={classes.colabName}>{colabList[0].name}</Typography>
                    <Typography className={classes.colabTitle}>{colabList[0].pos}</Typography>
                </div>
            </div>
            <div onClick={() => window.location.href = colabList[1].link && colabList[1].link} className={classes.two}>
                <div className={classes.colabDetails}>
                    <Typography className={classes.colabName}>{colabList[1].name}</Typography>
                    <Typography className={classes.colabTitle}>{colabList[1].pos}</Typography>
                </div>
            </div>
            <div onClick={() => window.location.href = colabList[2].link && colabList[2].link} className={classes.three}>
                <div className={classes.colabDetails}>
                    <Typography className={classes.colabName}>{colabList[2].name}</Typography>
                    <Typography className={classes.colabTitle}>{colabList[2].pos}</Typography>
                </div>
            </div>
            <div onClick={() => window.location.href = colabList[3].link && colabList[3].link} className={classes.four}>
                <div className={classes.colabDetails}>
                    <Typography className={classes.colabName}>{colabList[3].name}</Typography>
                    <Typography className={classes.colabTitle}>{colabList[3].pos}</Typography>
                </div>
            </div>
            <div onClick={() => window.location.href = colabList[4].link && colabList[4].link} className={classes.five}>
                <div className={classes.colabDetails}>
                    <Typography className={classes.colabName}>{colabList[4].name}</Typography>
                    <Typography className={classes.colabTitle}>{colabList[4].pos}</Typography>
                </div>
            </div>
            <div onClick={() => window.location.href = colabList[5].link && colabList[5].link} className={classes.six}>
                <div className={classes.colabDetails}>
                    <Typography className={classes.colabName}>{colabList[5].name}</Typography>
                    <Typography className={classes.colabTitle}>{colabList[5].pos}</Typography>
                </div>
            </div>
            <div className={classes.descriptionProject}>
                <Typography className={classes.descriptionValue}>Master Team Project / GDSD Spring 2022</Typography>
            </div>
        </div>
    )
}

export default AboutUs