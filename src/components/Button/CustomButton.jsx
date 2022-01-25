import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
`

const CustomButton = ({ content, to }) => {
    return (
        <StyledLink to={to}>
                <Button variant="contained" role='button'>{content}</Button>
        </StyledLink>
    );
};

export default CustomButton;