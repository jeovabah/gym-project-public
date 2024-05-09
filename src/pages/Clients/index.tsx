import { TableHead, TableRow, TableHeader, TableBody, Table } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import ItemComponent from "@/components/ItemComponent/ItemComponent"
import { api } from "@/services/api/api"
import { useEffect, useState } from "react"

interface ClientProps{
  nameClient: string,
  statusPaid: boolean,
  time: string
  selectedDayToPay: number

}


const Clients = () => {

  const [clients, setClients] = useState([])

  useEffect(() => {
    console.log("entrando no useEffect")
    getClient()

  }, []
  )

  const getClient = async () => {
    const Reposta = await api.get("client")
    if (Reposta.data != null) {
      setClients(Reposta.data.response)
    }
    console.log(Reposta.data.resposnse)

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
                  <TableHead>Horario de Treino</TableHead>
                  <TableHead>Dia de Pagamento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/*<ItemComponent
                name= "Teste1"
                status="Active"
                date="Classe 1 - 8 de Maio de 2023"
  />*/}
                {
                  clients.map((client:ClientProps, i) => {

                    return (
                      <ItemComponent
                        name={client.nameClient}
                        status={client.statusPaid == true ? "pago" : "nao pago"}
                        date={client.time}
                        selectedDayToPay={client.selectedDayToPay}
                        key={i}
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
