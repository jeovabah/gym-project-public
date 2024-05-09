import { TableRow,TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlarmClock, Banknote } from "lucide-react"



const ItemComponent = (props) => {

  const classeDoComponente = props.status=='pago'? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400": "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"

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
        <AlarmClock className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
        <span>{props.date}</span>
      </div>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        <Banknote className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <span>{props.selectedDayToPay}</span>
      </div>
    </TableCell>
  </TableRow>
  )
}

export default ItemComponent
