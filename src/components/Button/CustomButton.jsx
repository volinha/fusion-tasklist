import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
    margin-right: 32px !important;
`

const CustomButton = ({ content }) => {
    return (
        <StyledLink to="/new_task">
                <Button variant="contained" role='button'>{content}</Button>
        </StyledLink>
    );
};

export default CustomButton;