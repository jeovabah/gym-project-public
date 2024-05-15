import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { api } from "@/services/api/api";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface TrainersProps {
  id: number;
  name: string;
  specialty: string;
}

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    const Reposta = await api.get("trainer");
    if (Reposta.data != null) {
      setTrainers(Reposta.data.response);
    }
  };

  return (
    <div>
      <section className="container mx-auto px-4 md:px-6 py-12 text-black">
        <div className="flex justify-between items-center mb-6 text-black">
          <h1 className="text-2xl font-bold text-black">
            Listagem de Treinadores
          </h1>
        </div>
        <div className="grid gap-4 overflow-auto">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainers.map((trainer: TrainersProps, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {trainer?.name}
                      </TableCell>
                      <TableCell>{trainer?.specialty}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          className="mr-2 rounded"
                          size="sm"
                          variant="outline"
                        >
                          Ver
                        </Button>
                        <Button
                          className="mr-2 rounded"
                          size="sm"
                          variant="outline"
                        >
                          Editar
                        </Button>
                        <Button className="rounded" size="sm" variant="outline">
                          Deletar
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Trainers;
