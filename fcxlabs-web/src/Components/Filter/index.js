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
    filter = username ? filter.concat('', `&username=${username}`) : filter;

    props.filterUsers(1, filter);
  }

  const clearFilterForm = () => {
    setName('');
    setCpf('');
    setUsername('');
    setStatus('');

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
              <InputText value={username} onChange={e => setUsername(e.target.value)} placeholder='username' />
              <Dropdown value={status} onChange={e => setStatus(e.value)} options={statusOptions} placeholder='status' />
            </div>

          </FilterField>
          <Button size='small' label='filtrar' icon='pi pi-search' onClick={() => handleFilter()} />
          <Button size='small' label='limpar' outlined onClick={() => clearFilterForm()} />
        </Card>
      )}
    </div>
  )
}