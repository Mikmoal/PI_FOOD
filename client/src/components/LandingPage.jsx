import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
border - radius: 3px;
padding: 0.5rem 0;
margin: 0.5rem 1rem;
border 2px solid white;
`;

export default function LandingPage() {

    return (
        <div>
            <p>Bienvenidos a Foods</p>
            <Button as={Link} to={'/home'}>Entrar</Button>
        </div >
    )
}