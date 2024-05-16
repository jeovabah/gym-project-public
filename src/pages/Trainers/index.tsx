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
import RegisterTrainerModal from "@/components/ModalContent/RegisterTrainerModal";
import ModalAlert from "@/components/ModalAlert/ModalAlert";
import EditTrainerModal from "@/components/ModalContent/EditTrainerModal";
import ModalContent from "@/components/ModalContent/ModalContent";

interface TrainersProps {
  id: number;
  name: string;
  specialty: string;
}

const Trainers = () => {
  const [trainers, setTrainers] = useState<TrainersProps[]>([]);
  const [deleteTrainerId, setDeleteTrainerId] = useState<number | null>(null);
  const [showMoreId, setShowMoreId] = useState<number | null>(null);
 
  

  useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    const Reposta = await api.get("trainer");
    if (Reposta.data != null) {
      setTrainers(Reposta.data.response);
    }
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/trainer/delete/${id}`);
    getClient();
    setDeleteTrainerId(null);
  };



  return (
    <div>
      <section className="container mx-auto px-4 md:px-6 py-12 text-black">
        <div className="flex justify-between items-center mb-6 text-black">
          <h1 className="text-2xl font-bold text-black">Listagem de Treinadores</h1>
          <RegisterTrainerModal />
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
                {trainers.map((trainer: TrainersProps) => (
                  <TableRow key={trainer.id}>
                    <TableCell className="font-medium">{trainer.name}</TableCell>
                    <TableCell>{trainer.specialty}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                      className="mr-2 rounded" 
                      size="sm" 
                      variant="outline"
                      onClick={()=>{setShowMoreId(trainer.id)}}
                      >Ver
                      </Button>
                      {showMoreId === trainer.id && (
                        <ModalContent
                          title={'Informações do Treinador'}
                          showModal={true}
                          setShowModal={() => setShowMoreId(null)}
                          cancelBtn='FECHAR'
                          content={
                            <div className="text-left text-black font-semibold text-lg">
                              <h1>Nome: {trainer.name}</h1>
                              <p>Especialidade: {trainer.specialty}</p>
                            </div>
                          }
                        />
                      )}
                      <EditTrainerModal
                        id={trainer.id}
                        name={trainer.name}
                        specialty={trainer.specialty}
                      />
                      <Button
                        className="rounded"
                        size="sm"
                        variant="outline"
                        onClick={() => setDeleteTrainerId(trainer.id)}
                      >
                        Deletar
                      </Button>
                      {deleteTrainerId === trainer.id && (
                        <ModalAlert
                          title={`Deseja realmente excluir ${trainer.name}?`}
                          showModal={deleteTrainerId === trainer.id}
                          setShowModal={() => setDeleteTrainerId(null)}
                          deleteBtn="Deletar"
                          cancelBtn="Cancelar"
                          handleConfirm={() => handleDelete(trainer.id)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Trainers;
