import { TableRow,TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Banknote, Trash2 } from "lucide-react"
import ModalAlert from "../ModalAlert/ModalAlert"
import { api } from "@/services/api/api"
import { useState } from "react"



const ItemComponent = (props) => {

  const classeDoComponente = props.status=='pago'? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400": "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"

  const handleDelete = async () =>{
    await api.delete(`/client/delete/${props.id}`)
    props.getClient()
  }
  const [visible,setVisible] = useState(false)

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
        title={`Deseja realmente excluir ${props.name}`}
        showModal={visible}
        setShowModal={setVisible}
        deleteBtn="Deletar"
        cancelBtn="Cancelar"
        handleConfirm={handleDelete}
      />
    </div>
    </TableCell>
  </TableRow>
  )
}

export default ItemComponent
