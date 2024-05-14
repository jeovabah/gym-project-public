

import { CalendarIcon, UserIcon, UsersIcon } from "lucide-react";
import CardInfo from "../CardInfo/CardInfo";
import CardActiveTrainers from "../CardInfo/CardActiveTrainers";
import CardTotalClasses from "../CardInfo/CardTotalClasses";
import { useEffect, useState } from "react";
import { api } from "@/services/api/api";


interface activeClientsProps{
  activeClients:number;
}


const InfoComponent = () => {
  const [activeClients,setActiveClients] = useState<activeClientsProps | null>(null);
  useEffect(()=>{

    getActiveClients()

  })
  
  const getActiveClients = async () =>{
    const response = await api.get("/client/quantityAll")
    if(response.data != null){
      setActiveClients(response.data.response)
    }

  }


  return (
      <div className="max-w-6xl w-full mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-black ">
      <CardInfo
        title="Clientes Ativos"
        description="Numero de Clientes Ativos"
        icon={<UsersIcon className="w-8 h-8 text-black dark:text-gray-400" />}
        value={activeClients ? activeClients.activeClients : 0}
      />
      <CardActiveTrainers
        title="Treinadores Ativos"
        description="Numero de Treinadores Ativos"
        icon={<UserIcon className="w-8 h-8 text-black dark:text-gray-400" />}
        value={12}
      />
      <CardTotalClasses
        title="Total de Turmas"
        description="Numero de turmas"
        icon={<CalendarIcon className="w-8 h-8 text-black dark:text-gray-400" />}
        value={68}
      />
      </div>
  )
}

export default InfoComponent
