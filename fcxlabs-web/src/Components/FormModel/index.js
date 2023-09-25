import { useState, forwardRef, useImperativeHandle } from 'react';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button';
import { createUser, updateById } from '../../services/UserService';
import { InputText } from 'primereact/inputtext';
import { FormFieldArea } from './styles'

const FormModel = forwardRef((props, ref) => {

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [cpf, setCpf] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birtday, setBirtday] = useState('');
  const [motherName, setMotherName] = useState('');

  const updateUser = (value) => {
    if (value) {
      setId(value.id);
      setName(value.name);
      setCpf(value.cpf);
      setUsername(value.username);
      setMotherName(value.motherName);
      setEmail(value.email);
      setPassword(value.password);
      setPhone(value.phone);
      setBirtday(value.birtday);
    } else {
      setId('');
      setName('');
      setCpf('');
      setUsername('');
      setMotherName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setBirtday('');
    }
  }

  useImperativeHandle(ref, () => {
    return {
      updateUser: updateUser
    }
  })

  const actionFormUser = (confirm) => {
    props.hide(false);
    if (confirm) {
      const user = { name, username, password, email, phone, cpf, birtday, motherName };
      if (id) {
        updateById(id, user).then(response => {
          if (response.status !== 200) {
            console.log('mostrar mensagem de erro!')
          }
        })
      } else {
        createUser(user)
          .then(response => {
            if (response.status !== 200) {
              console.log('mostrar mensagem de erro!')
            }
          });
      }
    }
  }

  const footerContent = (
    <div>
      <Button label="cancelar" icon="pi pi-times" onClick={() => actionFormUser(false)} className="p-button-text" />
      <Button label="cadastrar" icon="pi pi-check" onClick={() => actionFormUser(true)} autoFocus />
    </div>
  );

  return (
    <Dialog header='Cadastrar usuário' visible={props.visible}
      style={{ width: '50vw' }}
      onHide={() => actionFormUser(false)}
      footer={footerContent}>

      <FormFieldArea>
        <div className='fieldArea'>
          <p>Nome</p>
          <InputText value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className='fieldArea'>
          <p>CPF</p>
          <InputText value={cpf} onChange={e => setCpf(e.target.value)} />
        </div>
        <div className='fieldArea'>
          <p>Login</p>
          <InputText value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className='fieldArea'>
          <p>Nome da mãe</p>
          <InputText value={motherName} onChange={e => setMotherName(e.target.value)} />
        </div>
        <div className='fieldArea'>
          <p>E-Mail</p>
          <InputText value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='fieldArea'>
          <p>Password</p>
          <InputText value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className='fieldArea'>
          <p>Telefone</p>
          <InputText value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className='fieldArea'>
          <p>Data de aniversário</p>
          <InputText value={birtday} onChange={e => setBirtday(e.target.value)} type='date' />
        </div>
      </FormFieldArea>

    </Dialog>
  )
})

export default FormModel;