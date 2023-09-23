import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    background-color: rgb(158,160,246);
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
`;

export const Control = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
    //border: 1px solid black;
`

export const DatatableArea = styled.div`
    margin-left: 40px;
    width: 80%;
`