import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Banknote, Trash2 } from "lucide-react";
import ModalAlert from "../ModalAlert/ModalAlert";
import { api } from "@/services/api/api";
import { useState } from "react";
import ModalContent from "../ModalContent/ModalContent";
import Content from "../ModalContent/Content";
import EditContent from "../ModalContent/EditContent";

const ItemComponent = (props) => {
  const classeDoComponente =
    props.status === "PAGO"
      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
      : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400";

  const handleDelete = async () => {
    await api.delete(`/client/delete/${props.id}`);
    props.getClient();
  };

  const handleUpdatePaid = async (checked) => {
    setStatus(checked);
    await api.put(`/client/update/${props.id}`, {
      statusPaid: checked,
    });
    props.getClient();
  };

  const [visible, setVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [status, setStatus] = useState(props.status === "PAGO");

  return (
    <TableRow>
      <TableCell className="font-medium">{props.name}</TableCell>
      <TableCell>
        <Badge className={classeDoComponente} variant="outline">
          {props.status}
        </Badge>
        <div className="mt-2 flex items-center space-x-4">
          <input
            type="checkbox"
            className="toggle toggle-success"
            onChange={(e) => {
              handleUpdatePaid(e.target.checked);
            }}
            checked={status}
          />
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="flex items-center gap-2">
          <Banknote className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <span>{props.selectedDayToPay}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <button
            className="flex items-center gap-1"
            onClick={() => {
              setVisible(true);
            }}
          >
            <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400 cursor-pointer max-sm: items-center text-center" />
            <span className="w-4 h-4 text-red-500 dark:text-red-400 cursor-pointer max-sm:hidden ">
              Deletar
            </span>
          </button>
          <ModalAlert
            title={`Deseja realmente excluir ${props.name} ?`}
            showModal={visible}
            setShowModal={setVisible}
            deleteBtn="Deletar"
            cancelBtn="Cancelar"
            handleConfirm={handleDelete}
          />
        </div>
        <div className="gap-1">
          <button
            className="mt-3 items-center gap-1"
            onClick={() => setShowMore(true)}
          >
            <span className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer">
              Ver mais
            </span>
          </button>
          <ModalContent
            title={"Dias de treino da semana"}
            showModal={showMore}
            setShowModal={setShowMore}
            cancelBtn={"FECHAR"}
            className={"sm:hidden"}
            content={
              <div>
                {props.daysOfWeek &&
                  Object.entries(props.daysOfWeek).map(([day, times]: any) => (
                    <Content day={day} time={times?.join(", ")} key={day} />
                  ))}
              </div>
            }
            paymentContent={
              <TableCell className="sm:hidden">
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span>{props.selectedDayToPay}</span>
                </div>
              </TableCell>
            }
          />
        </div>
        <button
            className="mt-3 items-center gap-1"
            onClick={() => setShowEdit(true)}
          >
            <span className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer">
              Editar
            </span>
          </button>
        <div className="gap-1 ">
          <ModalContent
            title={"Editar Cliente"}
            showModal={showEdit}
            setShowModal={setShowEdit}
            cancelBtn={"FECHAR"}
            className={'hidden'}
            content={
              <EditContent
                id={props.id}
                setShowEdit={setShowEdit}
                getClient={props.getClient}
                clientName={props.name}
                daysOfWeek={props.daysOfWeek}
              />
            }
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ItemComponent;
