import { TableHead, TableRow, TableHeader, TableBody, Table } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import ItemComponent from "@/components/ItemComponent/ItemComponent";
import { api } from "@/services/api/api";
import { useEffect, useState } from "react";
import RegisterClientModal from "@/components/ModalContent/RegisterClientModal";
import Loading from "@/components/component/Loading/Loading";


interface Trainer {
  id: number;
  name: string;
}
interface ClientProps {
  trainerId: string;
  name: string;
  statusPaid: boolean;
  time: string;
  dayToPay: number;
  id: number;
  daysOfWeek: [{}];
  trainingSheetDescription: string,
  dateOfBirth: any,
  trainer: Trainer,
  
  //phoneNumber: String
}


const Clients = () => {
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientsFilter, setClientsFilter] = useState<ClientProps[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  

  useEffect(() => {
    clients && setClientsFilter(clients);
  }, [clients]);
  

  const onSelectFilter = (trainerId: string = "") => {
    console.log(trainerId)
    if (trainerId === "all") {
      setClientsFilter(clients);
      return clients;
    }
    if (trainerId){
      
      const clientFiltered = clients.filter((client)=>{
        return client.trainerId == trainerId
        })
      
      setClientsFilter(clientFiltered)
      }
  };
  
  const onHandleSearch = (text) =>{
    
    if(text === ""){setClientsFilter(clients); return}

    const filterSearch = clients.filter((client)=>{
      if(client.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))){
        return client
      }
    })
    
    setClientsFilter(filterSearch)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getClient(),getTrainers()]);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const getClient = async () => {
    const response = await api.get("client");
    if (response.data != null) {
      setClients(response.data.response);
    }
  };

  const getTrainers = async () => {
    const response = await api.get("/trainer");
    setTrainers(response?.data?.response);
  };


  return (
    <div>
      <div>
        <section className="container mx-auto px-4 md:px-6 py-12 text-black">
          <div className="flex justify-between items-center mb-6 text-black flex-wrap">
            <h1 className="text-2xl font-bold text-black">Listagem de Clientes</h1>
            <select
              onChange={(e) => {
                onSelectFilter(e.target.value);
              }}
              className="bg-white p-2 border border-gray-200 rounded-lg"
            >
              <option value="all">Todos</option>
              {trainers &&
                trainers.map((trainer: Trainer) => ( // Alterado para Trainer
                  <option key={trainer.id} value={trainer.id.toString()}>
                    {trainer.name}
                  </option>
                ))}
            </select>
            <RegisterClientModal getClient={getClient} />
          </div>
          <div>
          <input
              className="input input-bordered w-full max-w-xs mb-4 bg-gray-200"
              placeholder="Nome do cliente"              
              onChange={(e) => onHandleSearch(e.target.value)}
            />
            
          </div>
          <div className="grid gap-4 transition-filter duration-300">
            <Card>
              <Table>
                <TableHeader>
                  
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Status de Pagamento</TableHead>
                    <TableHead className="hidden md:table-cell">Dia de Pagamento</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className=" justify-center items-center py-8 ">
                        <Loading/>
                      </td>
                    </tr>
                  ) : (
                    clientsFilter.map((client: ClientProps, i) => (
                      <ItemComponent
                        name={client.name}
                        status={client.statusPaid ? "PAGO" : "NAO PAGO"}
                        statusPaid={client.statusPaid}
                        
                        date={client.time}
                        selectedDayToPay={client.dayToPay}
                        id={client.id}
                        key={i}
                        getClient={getClient}
                        daysOfWeek={client.daysOfWeek}
                        trainingSheetDescription={client.trainingSheetDescription}
                        dateOfBirth={client.dateOfBirth}
                        //phoneNumber={client.phoneNumber}
                        
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Clients;
