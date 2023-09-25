import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { FilterField } from './styles';
import { useState } from 'react';

export default function Filter(props) {

  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [username, setUsername] = useState('');
  const [birtday, setBirtday] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [rangeAge, setRangeAge] = useState('');

  const statusOptions = ['Inativo', 'Ativo', 'Bloqueado'];

  const statusToFilter = new Map();
  statusToFilter.set('Inativo', 0);
  statusToFilter.set('Ativo', 1);
  statusToFilter.set('Bloqueado', 2);

  const rangeAgeOptions = [
    'Maior que 18 e menor que 26',
    'Maior que 25 e menor que 31',
    'Maior que 30 e menor que 36',
    'Maior que 35 e menor que 41'
  ];

  const handleFilter = () => {
    let filter = '';
    filter = name ? filter.concat('', `&name=${name}`) : filter;
    filter = cpf ? filter.concat('', `&cpf=${cpf}`) : filter;
    filter = status ? filter.concat('', `&status=${statusToFilter.get(status)}`) : filter;

    props.filterUsers(filter);
  }

  const clearFilterForm = () => {
    setName('');
    setCpf('');
    setUsername('');
    setStatus('');
    setBirtday('');
    setRangeAge('');
    setCreatedAt('');
    setUpdatedAt('');
  }

  return (
    <div>
      {props.visible && (
        <Card>
          <p>filtro</p>
          <FilterField>
            <div>
              <InputText value={name} onChange={e => setName(e.target.value)} placeholder='nome' />
              <InputText value={cpf} onChange={e => setCpf(e.target.value)} placeholder='cpf' />
            </div>
            <div>
              <InputText value={username} onChange={e => setUsername(e.value)} placeholder='username' />
              <Dropdown value={status} onChange={e => setStatus(e.value)} options={statusOptions} placeholder='status' />
            </div>
            <div>
              <InputText value={birtday} onChange={e => setBirtday(e.value)} type='date' placeholder='data de nascimento' />
              <Dropdown value={rangeAge} onChange={e => setRangeAge(e.value)} options={rangeAgeOptions} placeholder='faixa etária' />
            </div>
            <div>
              <InputText value={createdAt} onChange={e => setCreatedAt(e.value)} type='date' placeholder='criado em' />
              <InputText value={updatedAt} onChange={e => setUpdatedAt(e.value)} type='date' placeholder='ultima atualização' />
            </div>
          </FilterField>
          <Button size='small' label='filtrar' icon='pi pi-search' onClick={() => handleFilter()} />
          <Button size='small' label='limpar' outlined onClick={() => clearFilterForm()} />
        </Card>
      )}
    </div>
  )
}