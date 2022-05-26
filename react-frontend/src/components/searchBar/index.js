import React, { useState } from 'react';
import useStyles from './styles';
import { Select } from '@mui/material';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';


function SearchBar(props) {
    const { fetchMedia } = {...props}
    const [searchCategory, setSearchCategory] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')
    const classes = useStyles();
    
    const handleChange = e => setSearchTerm(e.target.value)
    const handleSearchCategoryChange = e => setSearchCategory(e.target.value)
    const handleOnClick = () => fetchMedia(searchTerm, searchCategory)

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
                />
            </div>
            
            <FormControl>
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
    )
}

export default SearchBar