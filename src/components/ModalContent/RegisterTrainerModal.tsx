import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogTitle, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { api } from "@/services/api/api";

export default function Component() {
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

        await api.post("/trainer/add", payload);
        handleClear();
        setIsOpen(false); // Fecha o modal
        window.location.reload(); // Atualiza a página
    };
    console.log(specialty)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded" onClick={() => setIsOpen(true)}>Adicionar Treinador</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-black rounded">
                <DialogHeader>
                    <DialogTitle>Registre um Novo Treinador</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">
                            Nome
                        </Label>
                        <Input className="col-span-3" id="name" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right text-black" htmlFor="especialidade">
                            Especialidade
                        </Label>
                        <Input className="col-span-3" id="especialidade" placeholder="Especialidade" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => {
                        if (name === "" || specialty === "") {
                            window.alert('Dados Incompletos!\nVerifique os dados e tente novamente');
                        } else {
                            handleConfirm();
                        }
                    }}>Adicionar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
