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

export const InputArea = styled.div`
    height: 120px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin-bottom: 10px;
`

export const LoginArea = styled.div`
    display: flex;
    border-radius: 10px;
    width: 500px;
    height: 400px;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #fff;
    padding: 70px 50px 10px 50px;

    p {
        margin: 0;
    }

    .subtitle {
        font-size: 14px;
        color: gray;
        margin-bottom: 10px;
    }
`;

export const MessageArea = styled.div`
    display: flex;
    flex-direction: column;
    height: 50px;
    margin-top: 20px;
`