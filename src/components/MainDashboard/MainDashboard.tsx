import { useEffect, useState } from "react";
import InfoComponent from "../InfoComponent/InfoComponent";

import { CalendarRelatory } from "../component/calendar-relatory";
import { api } from "@/services/api/api";

import Loading from "../component/Loading/Loading";

interface activeClientsProps {
  activeClients: number;
}

const MainDashboard = () => {
  const [trainers, setTrainers] = useState([]);
  const [activeClients, setActiveClients] = useState<activeClientsProps | null>(
    null
  );
  const [loading,setLoading] = useState(true)
  const [schedule, setSchedule] = useState({});

  const getTrainers = async () => {
    const response = await api.get("/trainer");
    setTrainers(response?.data?.response);
  };
  const getActiveClients = async () => {
    const response = await api.get("/client/quantityAll");
    if (response.data != null) {
      setActiveClients(response.data.response);
    }
  };

  const fetchSchedule = async () =>{
    const response = await api.get("/client/daysTrainner");
    setSchedule(response?.data?.response?.response);
  }

  useEffect(() => {
       // Função para buscar treinadores e clientes ativos
       const fetchData = async () => {
        try {
          await Promise.all([getTrainers(), getActiveClients(),fetchSchedule()]); // Espera ambas as solicitações serem completadas
          setLoading(false); // Define o estado de carregamento como false quando os dados são carregados
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      };
  
      fetchData(); // Chama a função para buscar os dados
    }, []);
 



  return (
    <div>
      {loading &&(
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-5 z-50">
        <Loading />
      </div>
      )};
      
      <div className={`transition-filter duration-100 ${loading ? 'blur' : ''}`}>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40 text-black">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Dashboard</h1>
        </div>
        <InfoComponent 
        trainers={trainers}
        activeClients={activeClients}
        />
        <CalendarRelatory schedule={schedule} />      
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
