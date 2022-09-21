import React, { useState } from 'react';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search';
import { Select } from '@mui/material';
import useStyles from './styles';

function SearchBar(props) {
    const { fetchMedia } = {...props}
    const [searchCategory, setSearchCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const [prevSearchTerm, setPrevSearchTerm] = useState(null)
    const [prevSearchCategory, setPrevSearchCategory] = useState(null)
    const classes = useStyles();
    
    const handleChange = e => {
        setSearchTerm(e.target.value)
        if (e.target.value === '') {
            setPrevSearchTerm('')
            setPrevSearchCategory(searchCategory)
            fetchMedia('', searchCategory)
        }
    }
    const handleSearchCategoryChange = e => setSearchCategory(e.target.value)
    
    const handleOnClick = () => {
        if (prevSearchTerm !== searchTerm || prevSearchCategory !== searchCategory) {
            setPrevSearchTerm(searchTerm)
            setPrevSearchCategory(searchCategory)
            fetchMedia(searchTerm, searchCategory)
        }
    }

    return (
        <div className={classes.searchContainer}>
            <div className={classes.inputContainer}>
                <SearchIcon sx={{fontSize:30, color: "#D3D3D3", paddingLeft: '5px'}} />
                <input 
                    placeholder='Search by name or tag..' 
                    onChange={handleChange} 
                    className={classes.searchInput} 
                    type="text"
                    value={searchTerm}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleOnClick()
                        }
                    }}
                />
            </div>
            <div className={classes.categoryButtonCont}>
                <FormControl className={classes.categorySelector}>
                    <InputLabel id="media-categories">Categories</InputLabel>
                    <Select
                        sx={{width: '120px', height: '40px', fontSize: 16}}
                        labelId="media-categories-label"
                        id="media-categories-select"
                        value={searchCategory}
                        label="Categories"
                        onChange={handleSearchCategoryChange}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'image'}>Image</MenuItem>
                        <MenuItem value={'video'}>Video</MenuItem>
                        <MenuItem value={'audio'}>Audio</MenuItem>
                    </Select>
                </FormControl>
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
           

        </div>
    )
}

export default SearchBar