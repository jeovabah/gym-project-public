import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogContent, Dialog } from "@/components/ui/dialog"
import RegistracionClient from "../RegistracionClient/RegistracionClient"
import { useEffect, useState } from "react"
import { api } from "@/services/api/api"

export default function Component(props) {
    const [trainers, setTrainers] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const getTrainers = async () => {
      const response = await api.get("/trainer");
      setTrainers(response?.data?.response);
    };
  
    useEffect(() => {
      getTrainers();
    }, []);

/*    const handleRegisterConfirm = () => {
      setIsDialogOpen(false);
      props.getClient(); 
  };*/

  return (

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded">Registrar Cliente</Button>
      </DialogTrigger>
      <DialogContent className="max-sm:max-h-full overflow-y-auto sm:max-w-[440px] bg-white text-black "style={{borderRadius:'0.75rem'}}>
      <RegistracionClient 
      trainers={trainers} 
      getClient={props.getClient}
      setIsDialogOpen={setIsDialogOpen}
      />
      </DialogContent>
    </Dialog>
  )
}