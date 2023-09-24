import { useEffect, useState } from 'react';
import { Container, Control, DatatableArea, FilterField } from './styles'
import { getAllByFilter } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Paginator } from 'primereact/paginator';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';

export default function Main() {

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [size, setSize] = useState(null);
  const [first, setFirst] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilterCard, setShowFilterCard] = useState(false);

  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [username, setUsername] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [rangeAge, setRangeAge] = useState('');

  const statusOptions = ['Inativo', 'Ativo', 'Bloqueado']
  const rangeAgeOptions = [
    'Maior que 18 e menor que 26',
    'Maior que 25 e menor que 31',
    'Maior que 30 e menor que 36',
    'Maior que 35 e menor que 41'
  ]

  const statusToFilter = new Map()
  statusToFilter.set('Inativo', 0)
  statusToFilter.set('Ativo', 1)
  statusToFilter.set('Bloqueado', 2)

  useEffect(() => {

    getAllUserByFilter()
  }, [first])

  function getAllUserByFilter() {

    setLoading(true)
    const filter = buildFilterPath()
    getAllByFilter(filter)
      .then(response => response.json())
      .then(data => {
        setUsers(data.result)
        setSize(data.size)
        setLoading(false)
      })
  }

  const buildFilterPath = () => {
    let filter = `first=${first}&perPage=${10}`;
    if (status) {
      filter = filter.concat('', `&status=${statusToFilter.get(status)}`)
    }
    return filter;
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', { month: 'short', day: '2-digit', year: 'numeric' });
  }

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
  }

  const getSeverity = (status) => {
    switch (status) {
      case 'Inativo':
        return 'danger';
      case 'Ativo':
        return 'success';
      case 'Bloqueado':
        return 'info';
    }
  };

  const showHiddenFilterCard = () => {
    setShowFilterCard(!showFilterCard)
  }

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.createdAt);
  };

  const onPageChange = (e) => {
    setFirst(e.first)
    getAllUserByFilter()
  }

  const filterUsers = () => {
    getAllUserByFilter();
  }

  const clearFilterForm = () => {
    setName('')
    setCpf('')
    setUsername('')
    setStatus('')
    setRangeAge('')
  }

  return (
    <PrimeReactProvider>
      <Container>
        <Control>
          <Button icon='pi pi-search' severity='primary' outlined onClick={() => showHiddenFilterCard()} />
          <Button size='small' label='Inserir um novo' icon='pi pi-user-plus' onClick={() => setVisible(true)} />
          <Button size='small' severity='secondary' disabled={!selectedUser} label='alterar' icon='pi pi-pencil' onClick={() => setVisible(true)} />
          <Button icon='pi pi-lock' severity='warning' disabled={!selectedUser} tooltip='bloquear' tooltipOptions={{ position: 'bottom' }} />
          <Button icon='pi pi-times' severity='danger' disabled={!selectedUser} tooltip='excluir' tooltipOptions={{ position: 'bottom' }} />
        </Control>
        {showFilterCard && (
          <Card>
            <p>filtro</p>
            <FilterField>
              <div>
                <InputText onChange={e => setName(e.target.value)} placeholder='nome' />
                <InputText placeholder='cpf' />
              </div>
              <div>
                <InputText placeholder='username' />
                <Dropdown value={status} options={statusOptions} onChange={e => setStatus(e.value)} placeholder='status' />
              </div>
              <div>
                <InputText type='date' placeholder='data de nascimento' />
                <Dropdown value={rangeAge} options={rangeAgeOptions} onChange={e => setRangeAge(e.value)} placeholder='faixa etária' />
              </div>
              <div>
                <InputText type='date' placeholder='criado em' />
                <InputText type='date' placeholder='ultima atualização' />
              </div>
            </FilterField>
            <Button size='small' label='filtrar' icon='pi pi-search' onClick={() => filterUsers()} />
            <Button size='small' label='limpar' outlined onClick={() => clearFilterForm()} />
          </Card>
        )}


        <DatatableArea>
          <DataTable value={users} size={'small'} scrollable loading={loading}
            selectionMode='single' selection={selectedUser} onSelectionChange={(e) => setSelectedUser(e.value)} dataKey='id' metaKeySelection={false}>
            <Column field='name' header='nome' style={{ minWidth: '150px' }} />
            <Column field='username' header='login' style={{ minWidth: '200px' }} />
            <Column field='email' header='e-mail' style={{ minWidth: '200px' }} />
            <Column field='status' body={statusBodyTemplate} header='status'></Column>
            <Column field='cpf' header='documento'></Column>
            <Column field='motherName' header='nome da mãe' style={{ minWidth: '200px' }} />
            <Column field='phone' header='telefone'></Column>
            <Column field='birtday' body={dateBodyTemplate} header='data de nascimento' style={{ minWidth: '150px' }}></Column>
            <Column field='createdAt' body={dateBodyTemplate} header='criado em' style={{ minWidth: '150px' }}></Column>
            <Column field='updatedAt' body={dateBodyTemplate} header='ultima atualização' style={{ minWidth: '150px' }}></Column>
          </DataTable>
          <Paginator first={first} rows={10} totalRecords={size} onPageChange={onPageChange}
            template={{ layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink' }} />
        </DatatableArea>
      </Container>

      <Dialog header='Header' visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <p className='m-0'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </PrimeReactProvider>
  )
}