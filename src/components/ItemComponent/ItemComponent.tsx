import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Banknote, Eye, Pencil, Trash2 } from "lucide-react";
import ModalAlert from "../ModalAlert/ModalAlert";
import { api } from "@/services/api/api";
import { useEffect, useState } from "react";
import ModalContent from "../ModalContent/ModalContent";
import Content from "../ModalContent/Content";
import EditContent from "../ModalContent/EditContent";
import InputDateComponent from "../InputDateComponent/InputDateComponent";
import PriceModal from "../PriceModal/PriceModal";
//import { Mask } from "@/utils/mask";

interface PendingUpdate {
  checked: boolean;
  amountPaid: number;
}

const ItemComponent = (props) => {
  
  const [visible, setVisible] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [status, setStatus] = useState(props.status === "PAGO");
  //const maskedDate = Mask.maskBirthday(props.dateOfBirth);
  //const formattedDate = Mask.tranformMaskBirthdayInUs(maskedDate);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<PendingUpdate | null>(null);


  const classeDoComponente =
    props.status === "PAGO"
      ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
      : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400";

  const handleDelete = async () => {
    await api.delete(`/client/delete/${props.id}`);
    props.getClient();
  };
  
  const handleUpdatePaid = async (checked,amountPaid) => {
    setStatus(checked);
    await api.put(`/client/update/${props.id}`, {
      statusPaid: checked,
      amountPaid: amountPaid,
    });
    props.getClient();
    console.log(amountPaid)
  };


  useEffect(() => {
    if (pendingUpdate) {
      handleUpdatePaid(pendingUpdate.checked, pendingUpdate.amountPaid);
      setPendingUpdate(null);
    }
  }, [pendingUpdate]);
  
  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked;
    if (checked) {
      setShowPriceModal(true);
    } else {
      await handleUpdatePaid(checked, 0); // Envia 0 quando desmarcado
    }
  };




const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  
  return `${day}/${month}/${year}`;
};

  

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
            onChange={handleCheckboxChange}
            checked={status}
            
            />
          {showPriceModal && (
            <PriceModal
              isOpen={showPriceModal}
              onClose={() => setShowPriceModal(false)}
              onSubmit={async (amountPaid) => {
                setShowPriceModal(false);
                setPendingUpdate({ checked: true, amountPaid });
              }}
            />
          )}
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
        <div className="items-center gap-1 mt-3">
          <button
            className="flex items-center gap-1"
            onClick={() => setShowMore(true)}
          >
            <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer max-sm: items-center text-center"/>
            <span className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer whitespace-nowrap max-sm:hidden">
              Ver Mais
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
            
            
            trainingSheetContent={
              <div>
                <h3 className="text-lg font-medium mb-4">Ficha de Treino</h3>
                <textarea
                  id="training-sheet"
                  className="w-full p-2 bg-gray-300 rounded"
                  readOnly
                  disabled
                  defaultValue={props.trainingSheetDescription}
                  style={{ resize: 'none' }}
                />
              </div>
            }

            dateOfBirthContent={
              <div className="mt-4" style={{pointerEvents: 'none'}}>
                <InputDateComponent
                  dateOfBirth={formatDate(props.dateOfBirth)}
                  
                  readOnly
                  disabled
                />
              </div>
            }
            

          />
        </div>
        <button
            className="flex items-center gap-1 mt-3"
            onClick={() => setShowEdit(true)}
          >
            <Pencil className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer max-sm: items-center text-center" />
            <span className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer max-sm:hidden">
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
                trainingSheetDescription={props.trainingSheetDescription}
                selectedDays={props.selectedDays}
                status={props.statusPaid}
                dateOfBirth={formatDate(props.dateOfBirth)}
                //phoneNumber={props.phoneNumber}
              />
            }
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ItemComponent;
