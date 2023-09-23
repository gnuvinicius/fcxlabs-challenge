import { useEffect, useState } from 'react';
import { Container, Content, LoginArea, InputArea, MessageArea } from './styles'
import { login, validToken } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

export default function LoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusUser, setStatusUser] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('fcxlabs-token')
        if (token && validToken(token)) {
            navigate('/users')
        }
    }, [navigate])

    function onClickLogin() {
        login(username, password).then(response => handleLoginResponse(response))
    }

    function handleLoginResponse(response) {
        if (response.status !== 200) {
            response.json().then(data => setStatusUser(data.message))
        } else {
            response.json()
                .then(data => {
                    localStorage.setItem('fcxlabs-token', `${data.type} ${data.token}`)
                    navigate('/users')
                })
        }
    }

    return (
        <PrimeReactProvider>
            <Container>
                <Content>
                    <LoginArea>
                        <p>Log In</p>
                        <p className='subtitle'>Por favor, insira seu login e senha</p>
                        <InputArea>
                            <InputText onChange={e => setUsername(e.target.value)} placeholder='Username' />
                            <InputText onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' />
                        </InputArea>
                        <Button label='Log In' onClick={onClickLogin}></Button>
                        <MessageArea>
                            {statusUser && <Message severity="error" text={statusUser} />}
                        </MessageArea>
                    </LoginArea>
                </Content>
            </Container>
        </PrimeReactProvider>
    )
}