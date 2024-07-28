import { useEffect, useState } from 'react';
import { generateColumns, generateRows } from '../utils';
import { ModalComponent } from './modal';
import { Button } from './button';

export const TableComponent = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<boolean[][]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [rowToDelete, setRowToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const newColumns = await generateColumns();
      const newRows = await generateRows(newColumns.length);
      setColumns(newColumns);
      setRows(newRows);
    };

    fetchData();
  }, []);

  const addRow = () => {
    setRows([
      ...rows,
      Array.from({ length: columns.length }, () => Math.random() < 0.5),
    ]);
  };

  const editRow = (index: number) => {
    const newRows = [...rows];
    newRows[index] = Array.from(
      { length: columns.length },
      () => Math.random() < 0.5,
    );
    setRows(newRows);
  };

  const confirmDeleteRow = (index: number) => {
    setRowToDelete(index);
    setModalMessage(`Вы уверены, что хотите удалить строку ${index + 1}?`);
    setShowModal(true);
  };

  const deleteRow = () => {
    if (rowToDelete !== null) {
      setRows(rows.filter((_, i) => i !== rowToDelete));
      setRowToDelete(null);
      setShowModal(false);
    }
  };

  return (
    <div>
      <Button className="add-row" onClick={addRow}>
        Добавить строку
      </Button>
      <table>
        <thead>
          <tr>
            <th></th>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>Заказ {rowIndex + 1}</td>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{ backgroundColor: cell ? 'green' : 'red' }}
                ></td>
              ))}
              <td>
                <Button className="edit-row" onClick={() => editRow(rowIndex)}>
                  Редактировать
                </Button>
                <Button
                  className="delete-row"
                  onClick={() => confirmDeleteRow(rowIndex)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalComponent
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={deleteRow}
        message={modalMessage}
      />
    </div>
  );
};
