import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import SearchIcon from '@mui/icons-material/Search';

import { useDispatch } from 'react-redux';
import searchAction from '../store/actions/search.action';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.div`
    width: 100vw;
    height: 8vh;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: center;

    background-color: var(--grey) !important;
    color: var(--primary);

    z-index: 100;

`
const HeaderTitle = styled.h1`
    font-family: Roboto;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--primary);

    transition: ease all 0.5s;

    &:link {
        color: color: var(--primary);;
    };
    &:visited {
        color: color: var(--primary);;
    }
    &:hover{
        color: color: var(--primary-alt);;
    }
`

const Header = ({ children, title }) => {
    const dispatch = useDispatch();

    return (
        <HeaderWrapper>
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <StyledLink to="/"><HeaderTitle>{title}</HeaderTitle></StyledLink>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon sx={{ mr: 1, my: 0.5 }} />
                    <TextField 
                        type="search" 
                        id="search-textfield" 
                        label="Encontrar" 
                        variant="standard" 
                        onChange={(e) => dispatch(searchAction.SearchTextUpdate(e.target.value))}
                    />
                </Box>
                <StyledLink to="/new_task"><Button variant="filled">+ Tarefa</Button></StyledLink>
            </Grid>
        </HeaderWrapper>
    );
};

export default Header;