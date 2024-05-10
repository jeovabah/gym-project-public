import { TableRow,TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Banknote, Trash2 } from "lucide-react"
import ModalAlert from "../ModalAlert/ModalAlert"
import { api } from "@/services/api/api"
import { useState } from "react"
import ModalContent from "../ModalContent/ModalContent"
import  Content  from "../ModalContent/Content"
import EditContent from "../ModalContent/EditContent"



const ItemComponent = (props) => {

  const classeDoComponente = props.status=='PAGO'? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400": "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"

  const handleDelete = async () =>{
    await api.delete(`/client/delete/${props.id}`)
    props.getClient()
  }
  const [visible,setVisible] = useState(false)
  const [showMore,setShowMore] = useState(false)
  const [showEdit,setShowEdit] = useState(false)

  console.log(props)
  return (
    <TableRow>
    <TableCell className="font-medium">{props.name}</TableCell>
    <TableCell>
      <Badge
        className={classeDoComponente}
        variant="outline"
      >
        {props.status}
      </Badge>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <Banknote className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <span>{props.selectedDayToPay}</span>
      </div>
    </TableCell>
    <TableCell>
    <div className="flex items-center gap-1">
      <button className="flex items-center gap-1" onClick={()=>{ 
        setVisible(true)}
        }>
        <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400 cursor-pointer"/>
      <span className="w-4 h-4 text-red-500 dark:text-red-400 cursor-pointer" >Deletar</span>
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
    <div className=" gap-1">
      <button className="mt-3 items-center gap-1" onClick={()=>{ 
        setShowMore(true)}
        }>
        
      <span className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" >Ver mais</span>
      </button>
      <ModalContent
        title={"Dias de treino da semana"}
        showModal={showMore}
        setShowModal={setShowMore}
        cancelBtn={"FECHAR"}
        content={<Content
          daysOfWeek={props.daysOfWeek}
        />}
      />
      </div>
      <div className=" gap-1">
      <button className="mt-3 items-center gap-1" onClick={()=>{ 
        setShowEdit(true)}
        }>
        
      <span className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" >Editar</span>
      </button>
      <ModalContent
        title={"Dias de treino da semana"}
        showModal={showEdit}
        setShowModal={setShowEdit}
        cancelBtn={"FECHAR"}
        content={<EditContent
          id={props.id}
          setShowEdit={setShowEdit}
          getClient={props.getClient}
        />}
      />
      </div>
    </TableCell>
  </TableRow>
  )
}

export default ItemComponent
