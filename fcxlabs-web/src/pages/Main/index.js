import { useEffect, useState, useRef } from 'react';
import { Container, Control, DatatableArea } from './styles'
import { getAllByFilter, blockerById, inactiveUserById } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Tag } from 'primereact/tag';
import ConfirmModel from '../../Components/ConfirmModel';
import Filter from '../../Components/Filter';
import FormModel from '../../Components/FormModel'

export default function Main() {

  const navigate = useNavigate();
  const ref = useRef(null);

  const [showFormDialog, setShowFormDialog] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [first, setFirst] = useState(1);
  const [size, setSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilterCard, setShowFilterCard] = useState(false);

  const [filter, setFilter] = useState('')

  useEffect(() => {
    getAllUserByFilter(1, '');
  }, []);

  const getAllUserByFilter = (first, filter) => {

    setLoading(true);
    setFirst(first)

    let path = `first=${first}&perPage=${10}`;
    path = path.concat('', filter)

    getAllByFilter(path)
      .then(response => {
        if (response.status === 401) {
          localStorage.removeItem('fcxlabs-token')
          navigate('/')
        } else {
          response.json().then(data => {
            setUsers(data.result);
            setSize(data.size);
            setLoading(false);
          });
        }
      });
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
    setShowFilterCard(!showFilterCard);
  }

  const handleClickUpdate = (value) => {
    setSelectedUser(value);
    ref.current.updateUser(value);
  }

  const dateBodyTemplate = (rowData) => {
    return new Date(rowData.createdAt).toLocaleDateString('pt-BR', { month: 'short', day: '2-digit', year: 'numeric' })
  };

  const onPageChange = (e) => {
    setFirst(e.first);
    getAllUserByFilter(e.first, filter);
  }

  const filterUsers = (value) => {
    setFilter(value)
    getAllUserByFilter(first, value);
  }

  const actionConfirmBlock = (confirm) => {
    setShowBlockDialog(false);
    if (confirm) {
      blockerById(selectedUser.id).then(_ => getAllUserByFilter());
    }
  }

  const actionConfirmDelete = (confirm) => {
    setShowDeleteDialog(false);
    if (confirm) {
      inactiveUserById(selectedUser.id).then(_ => getAllUserByFilter());
    }
  }

  return (
    <PrimeReactProvider>
      <Container>
        <Control>
          <Button icon='pi pi-search' severity='primary' outlined onClick={() => showHiddenFilterCard()} />

          <Button size='small' severity='primary' label='Inserir um novo' icon='pi pi-user-plus'
            onClick={() => setShowFormDialog(true)} />

          <Button size='small' severity='primary' disabled={!selectedUser} label='alterar' icon='pi pi-pencil'
            onClick={() => setShowFormDialog(true)} />

          <Button icon='pi pi-lock' severity='warning' disabled={!selectedUser} tooltip='bloquear'
            onClick={() => setShowBlockDialog(true)} tooltipOptions={{ position: 'bottom' }} />

          <Button icon='pi pi-times' severity='danger' disabled={!selectedUser} tooltip='excluir'
            onClick={() => setShowDeleteDialog(true)} tooltipOptions={{ position: 'bottom' }} />

        </Control>

        <Filter visible={showFilterCard} filterUsers={filterUsers} />

        <DatatableArea>
          <DataTable value={users} size={'small'} scrollable loading={loading}
            selectionMode='single' selection={selectedUser}
            onSelectionChange={(e) => handleClickUpdate(e.value)}
            dataKey='id' metaKeySelection={false}>
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

      <FormModel ref={ref} visible={showFormDialog} userToUpdate={selectedUser} hide={() => setShowFormDialog(false)} />

      <ConfirmModel visible={showBlockDialog}
        action={actionConfirmBlock}
        messageHeader={'Confirme, Por favor!'}
        messageBody={'Você tem certeza que deseja BLOQUEAR este usuário?'} />

      <ConfirmModel visible={showDeleteDialog}
        action={actionConfirmDelete}
        messageHeader={'Confirme, Por favor!'}
        messageBody={'Você tem certeza que deseja EXCLUIR este usuário?'} />

    </PrimeReactProvider>
  )
}