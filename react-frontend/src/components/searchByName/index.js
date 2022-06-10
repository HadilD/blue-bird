import React, { useState } from 'react';
import useStyles from './styles';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';


function SearchByName () {
    const [searchTerm, setSearchTerm] = useState('')
    const classes = useStyles();
    
    const handleChange = e => setSearchTerm(e.target.value)
    const handleOnClick = () => console.log('Search clicked..')

    return (
        <div className={classes.searchContainer}>
            <div className={classes.inputContainer}>
                <SearchIcon sx={{fontSize:30, color: "#D3D3D3", paddingLeft: '5px'}} />
                <input 
                    placeholder='Search by name' 
                    onChange={handleChange} 
                    className={classes.searchInput} 
                    type="text"
                    value={searchTerm}
                />
            </div>
            <div className={classes.searchButtonContainer}>
                <Button 
                    variant="contained" 
                    disableElevation 
                    onClick={handleOnClick}
                    sx={{backgroundColor: '#1d3461', textTransform: 'none'}}
                >
                    Search Media
                </Button>
            </div>

        </div>
    )
}

export default SearchByName