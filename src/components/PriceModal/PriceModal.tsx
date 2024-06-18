import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react";

export default function PriceModal({ isOpen, onClose, onSubmit }) {
  const [amountPaid, setAmountPaid] = useState("");

  const handleSubmit = () => {
    onSubmit(amountPaid);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black sm:max-w-[350px]" style={{ borderRadius: "0.75rem" }}>
        <DialogHeader>
          <DialogTitle>Digite o valor pago</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="price" className="text-right">
              Valor:
            </Label>
            <Input 
              id="price" 
              type="number" 
              placeholder="R$ 0.00" 
              className="col-span-3"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" size="sm" variant="outline" onClick={handleSubmit}>
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}