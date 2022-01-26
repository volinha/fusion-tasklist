import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Box, Button, Grid, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import styled from 'styled-components';

import searchAction from '../store/actions/search.action';

const HeaderWrapper = styled.nav`
    min-width: 100%;
    height: 10vh;

    display: flex;
    flex-direction: row;

    @media (min-width: 320px) {
        flex-direction: column;
    }

    justify-content: space-between;
    align-items: center;

    background-color: var(--gray) !important;
    color: var(--primary);

    z-index: 100;

    font-size: clamp(0.5rem, 0.5rem + 1vw, 7rem);
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

const StyledSearchBox = styled(TextField)`
    display: grid;
    
    @media screen and (max-width: 767px) {
        width: 50%;
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
                <StyledLink to="/"><HeaderTitle>TaskList</HeaderTitle></StyledLink>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon sx={{ mr: 1, my: 0.5 }} />
                    <StyledSearchBox 
                        type="search" 
                        id="search-textfield" 
                        label="Encontrar" 
                        variant="standard" 
                        onChange={(e) => dispatch(searchAction.SearchTextUpdate(e.target.value))}
                    />
                </Box>
                <StyledLink to="/new_task"><Button variant="outlined">+ Tarefa</Button></StyledLink>
            </Grid>
        </HeaderWrapper>
    );
};

export default Header;