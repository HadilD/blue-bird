import React, { useState } from 'react';
import useStyles from './styles';
import SearchIcon from '@mui/icons-material/Search';
import { Select } from '@mui/material';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'


function SearchByName (props) {
    const { adminMedia } = props
    const [searchTerm, setSearchTerm] = useState('')
    const [searchCategory, setSearchCategory] = useState('all')
    const classes = useStyles();
    
    const handleChange = e => setSearchTerm(e.target.value)
    const handleSearchCategoryChange = (e) => {
        setSearchCategory(e.target.value)
        if (e.target.value === 'all') {
            adminMedia()
        }
        else if (e.target.value === 'approved') {
            adminMedia({is_approved: true})
        } else {
            adminMedia({is_approved: false})
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
                    onChange={handleSearchCategoryChange}
                >
                    <MenuItem value={'all'}>All</MenuItem>
                    <MenuItem value={'approved'}>Approved</MenuItem>
                    <MenuItem value={'notApproved'}>Disapporved</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default SearchByName