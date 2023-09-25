import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function ConfirmModel(props) {

  const footerContent = (
    <div>
      <Button label="Não" icon="pi pi-times" onClick={() => props.action(false)} className="p-button-text" />
      <Button label="Sim" icon="pi pi-check" onClick={() => props.action(true)} autoFocus />
    </div>
  );

  return (
    <Dialog header={props.messageHeader} onHide={() => props.action(false)}
      visible={props.visible} style={{ width: '50vw' }} footer={footerContent}>
      <p className="m-0">
        {props.messageBody}
      </p>
    </Dialog>
  )
}