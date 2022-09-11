import React, { useState } from 'react';
import useStyles from './styles';
import SearchIcon from '@mui/icons-material/Search';
import { Select } from '@mui/material';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'


function SearchByName (props) {
    const { updateResultMedia } = props
    const [searchTerm, setSearchTerm] = useState('')
    const [searchCategory, setSearchCategory] = useState('all')
    const [prevSearchTerm, setPrevSearchTerm] = useState(null)
    const [prevSearchCategory, setPrevSearchCategory] = useState(null)
    const classes = useStyles();
    
    const handleOnClick = () => {
        if (prevSearchTerm !== searchTerm || prevSearchCategory !== searchCategory) {
            setPrevSearchTerm(searchTerm)
            setPrevSearchCategory(searchCategory)
            updateResultMedia(searchTerm, searchCategory)
        }
    }

    const handleChange = e => {
        setSearchTerm(e.target.value)
        if (e.target.value === '') {
            setPrevSearchTerm('')
            setPrevSearchCategory(searchCategory)
            updateResultMedia('', searchCategory)
        }
    }

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
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleOnClick()
                        }
                    }}
                />
            </div>
            <FormControl>
                <InputLabel id="media-categories">Categories</InputLabel>
                <Select
                    sx={{width: '10rem', height: '40px', fontSize: 16}}
                    labelId="media-categories-label"
                    id="media-categories-select"
                    value={searchCategory}
                    label="Categories"
                    onChange={(e) => setSearchCategory(e.target.value)}
                >
                    <MenuItem value={'all'}>All</MenuItem>
                    <MenuItem value={'approved'}>Approved</MenuItem>
                    <MenuItem value={'notApproved'}>Disapproved</MenuItem>
                </Select>
            </FormControl>
            <Button 
                variant="contained" 
                disableElevation 
                onClick={handleOnClick}
                sx={{backgroundColor: '#1d3461', textTransform: 'none', margin: '2% 2%'}}
            >
                Search
            </Button>
        </div>
    )
}

export default SearchByName