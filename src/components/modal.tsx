import { Button } from './button';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

export const ModalComponent = ({
  show,
  onClose,
  onConfirm,
  message,
}: ModalProps) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Подтверждение</h1>
        <p>{message}</p>
        <Button onClick={onConfirm}>Подтвердить</Button>
        <Button onClick={onClose}>Отмена</Button>
      </div>
    </div>
  );
};
