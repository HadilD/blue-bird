import React, { useEffect } from 'react'
import { Typography } from '@mui/material';
import useStyles from './styles';
import { useDispatch } from 'react-redux'
import { setPageName } from '../../redux/slice/pagename'

const Collaber = (props) => {
    const classes = useStyles();
    const {name, pos, link} = {...props}
    return (
        <div onClick={() => window.location.href = link && link} className={classes.one}>
            <div className={classes.colabDetails}>
                <Typography className={classes.colabName}>{name}</Typography>
                <Typography className={classes.colabTitle}>{pos}</Typography>
            </div>
        </div>
    )
}

const AboutUs = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageName("About Us"))
    })

    const colabList = [
        {
            name: "Prof. Rainer Todtenhoefer",
            pos: "CEO / CTO",
            // link: "https://trushar07.github.io/CV/"
        },
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
            pos: "Frontend Devloper",
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
            name: "Sagar Dhaware",
            pos: "Frontend Lead",
            // link: ""
        },
    ]

    const classes = useStyles();

    return (

        <div className={classes.container}>
            <div className={classes.subContainer}>
                {
                    colabList.map((colab, index) => {
                        if (index <= 2) return(<Collaber name={colab.name} pos={colab.pos} link={colab.link} key={index} /> )
                        return null                    
                    })
                }
            </div>
            <div className={classes.moduleHeadingContainer}>
                <div className={classes.descriptionProject}>
                    <Typography className={classes.descriptionValue}>Master Team Project / GDSD Spring 2022</Typography>
                </div>
            </div>
            <div className={classes.subContainer}>
                {
                    colabList.map((colab, index) => {
                        if (index > 2) return(<Collaber name={colab.name} pos={colab.pos} link={colab.link} key={index} /> )
                        return null                    
                    })
                }
            </div>
        </div>
    )
}

export default AboutUs