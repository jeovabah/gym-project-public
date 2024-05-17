import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogTitle, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { api } from "@/services/api/api";

export default function EditTrainerModal(props) {
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    
    const handleClear = () => {
        setName("");
        setSpecialty("");
    };

    const handleConfirm = async() => {
        const payload = {
            name: name,
            specialty: specialty,
        };

        await api.put(`/trainer/update/${props.id}`, payload);
        
        handleClear();
        setIsOpen(false); // Fecha o modal
        window.location.reload(); // Atualiza a página
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
            
                <Button className="mr-2 rounded" size="sm" variant="outline" onClick={() => setIsOpen(true)}>Editar</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-black rounded-lg "style={{borderRadius: '0.75rem'}}>
                <DialogHeader>
                    <DialogTitle>Editar Treinador</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">
                            Nome
                        </Label>
                        <Input className="col-span-3" id="name" placeholder="Nome" defaultValue={props.name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="gap-3 grid grid-cols-4 items-center max-sm:gap-8">
                        <Label className="text-right text-black " htmlFor="especialidade">
                            Especialidade 
                        </Label>
                        <Input className="col-span-3" id="especialidade" placeholder="Especialidade" defaultValue={props.specialty} onChange={(e) => setSpecialty(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => {
                        if (name === "" || specialty === "") {
                            window.alert('Dados Incompletos!\nVerifique os dados e tente novamente');
                        } else {
                            handleConfirm();
                        }
                    }}
                    className="rounded bg-green-500 text-white">Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
