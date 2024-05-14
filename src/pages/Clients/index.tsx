import { TableHead, TableRow, TableHeader, TableBody, Table } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import ItemComponent from "@/components/ItemComponent/ItemComponent"
import { api } from "@/services/api/api"
import { useEffect, useState } from "react"

interface ClientProps{
  name: string,
  statusPaid: boolean,
  time: string,
  dayToPay: number,
  id: number,
  daysOfWeek: [{}]
}


const Clients = () => {

  const [clients, setClients] = useState([])

  useEffect(() => {
    
    getClient()

  }, []
  )

  const getClient = async () => {
    const Reposta = await api.get("client")
    if (Reposta.data != null) {
      setClients(Reposta.data.response)
    } 
    

  }

  return (
    <div>
      <section className="container mx-auto px-4 md:px-6 py-12 text-black">
        <div className="flex justify-between items-center mb-6 text-black" >
          <h1 className="text-2xl font-bold text-black">Listagem de Clientes</h1>
        </div>
        <div className="grid gap-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status de Pagamento</TableHead>
                  <TableHead className="hidden md:table-cell" >Dia de Pagamento</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  clients.map((client:ClientProps, i) => {

                    return (
                      <ItemComponent
                        name={client.name }
                        status={client.statusPaid == true ? "PAGO" : "NAO PAGO"}
                        date={client.time}
                        selectedDayToPay={client.dayToPay}
                        id={client.id}
                        key={i}
                        getClient={getClient}
                        daysOfWeek={client.daysOfWeek}
                      />
                    )
                  })

                }
              </TableBody>
            </Table>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Clients
