import { useEffect, useState } from 'react';
import { DatatableArea } from './styles'
import { getAllByFilter } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

export default function Main() {

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUserByFilter()
  }, [])

  function getAllUserByFilter() {
    const filter = `page=${1}&perPage=${10}&status=${1}`
    getAllByFilter(filter)
      .then(response => response.json())
      .then(data => setUsers(data.result))
  }

  function formatDate(date) {
    return new Date(date).toLocaleTimeString("pt-BR", { month: "short", day: "2-digit", year: "numeric" });
  }

  const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.createdAt);
  };

  return (
    <PrimeReactProvider>
      <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
      <DatatableArea>
        <DataTable value={users} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
          <Column field="name" header="Nome"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="status" header="status"></Column>
          <Column field="cpf" header="CPF"></Column>
          <Column field="motherName" header="Nome da mãe"></Column>
          <Column field="phone" header="telefone"></Column>
          <Column field="createdAt" body={dateBodyTemplate} dataType="date" header="criado em"></Column>
        </DataTable>
      </DatatableArea>

      <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <p className="m-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Dialog>
    </PrimeReactProvider>
  )
}