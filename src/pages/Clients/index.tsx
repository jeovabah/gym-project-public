import { TableHead, TableRow, TableHeader, TableBody, Table } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import ItemComponent from "@/components/ItemComponent/ItemComponent";
import { api } from "@/services/api/api";
import { useEffect, useState } from "react";
import RegisterClientModal from "@/components/ModalContent/RegisterClientModal";
import Loading from "@/components/component/Loading/Loading";

interface ClientProps {
  name: string;
  statusPaid: boolean;
  time: string;
  dayToPay: number;
  id: number;
  daysOfWeek: [{}];
  trainingSheetDescription: string,
  dateOfBirth: any
}


const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getClient()]);
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

  return (
    <div>
      <div>
        <section className="container mx-auto px-4 md:px-6 py-12 text-black">
          <div className="flex justify-between items-center mb-6 text-black">
            <h1 className="text-2xl font-bold text-black">Listagem de Clientes</h1>
            <RegisterClientModal getClient={getClient} />
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
                    clients.map((client: ClientProps, i) => (
                      <ItemComponent
                        name={client.name}
                        status={client.statusPaid ? "PAGO" : "NAO PAGO"}
                        date={client.time}
                        selectedDayToPay={client.dayToPay}
                        id={client.id}
                        key={i}
                        getClient={getClient}
                        daysOfWeek={client.daysOfWeek}
                        trainingSheetDescription={client.trainingSheetDescription}
                        dateOfBirth={client.dateOfBirth}
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
