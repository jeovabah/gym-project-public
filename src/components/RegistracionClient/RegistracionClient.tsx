import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { api } from "@/services/api/api";

export const DaysOfWeek = [
  "Segunda",
  "Terca",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

export const RegistracionClient = ({ trainers,getClient,setIsDialogOpen }) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedDayToPay, setSelectedDayToPay] = useState(1);
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);
  const [time, setTime] = useState("");
  const [trainerId, setTrainerId] = useState<string>("");
  const [trainingSheetDescription,setTrainingSheetDescription] = useState("")

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleChange = (value, setSelected) => {
    setSelected(value);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    const daysAndTimes = {};

    selectedDays.forEach((day) => {
      if (!daysAndTimes[day]) {
        daysAndTimes[day] = [];
      }
      if (time) {
        daysAndTimes[day].push(time);
      }
    });

    const payload = {
      name: name,
      statusPaid: status,
      dayToPay: selectedDayToPay,
      daysOfWeek: daysAndTimes,
      trainerId,
      //trainingSheetDescription,
    };

    await api.post("/client/add", payload);

    handleClear();
    getClient()
    setIsDialogOpen(false)
  };

  const handleClear = () => {
    setName("");
    setTime("");
    setStatus(false);
    setSelectedDays([]);
    setSelectedDayToPay(1);
    //setTrainingSheetDescription("")
  };

  return (
    <div className="max-w-6xl w-full mx-auto grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Registro de clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold"></h1>
              <p className="text-black dark:text-gray-400">
                Registre um novo cliente para sua academia.
              </p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Nome do cliente"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label className="font-semibold">Dias que irá treinar</Label>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {DaysOfWeek.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={day.toLowerCase()}
                        name="training-days"
                        checked={selectedDays.includes(day)}
                        onChange={() => toggleDay(day)}
                      />
                      <label
                        className="text-sm font-normal"
                        htmlFor={day.toLowerCase()}
                      >
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 flex flex-col">
                <Label htmlFor="training-time">Horário do treino</Label>
                <input
                  className="w-max bg-gray-300 p-2 rounded"
                  type="time"
                  id="training-time"
                  onChange={(e) => setTime(e.target.value)}
                  value={time}
                />
              </div>
              <div>
                <Label className="font-semibold">Status do pagamento</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    onChange={(e) => setStatus(e.target.checked)}
                    checked={status}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trainer">Treinador</Label>
                <select
                  id="trainer"
                  className="w-full p-2 bg-gray-300 rounded"
                  onChange={(e) => setTrainerId(e.target.value)}
                >
                  <option value={undefined}>Selecione um treinador</option>
                  {trainers.map((trainer: any, i) => (
                    <option key={i} value={trainer.id}>
                      {trainer?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-day">Dia do pagamento</Label>
                <input
                  className="w-full p-2 bg-gray-300 rounded"
                  type="text"
                  inputMode="numeric"
                  id="payment-day"
                  required
                  value={selectedDayToPay}
                  onChange={(e) => {
                    let value = e?.target?.value;
                    value = value.replace(/\D/g, "");

                    if (Number(value) > 30) {
                      setSelectedDayToPay(30);
                      return;
                    }
                    handleChange(value, setSelectedDayToPay);
                  }}
                  pattern="[0-9]*"
                  min={1}
                  max={30}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="training-sheet">Ficha de Treino</Label>
                <textarea
                  id="training-sheet"
                  className="w-full p-2 bg-gray-300 rounded"
                  placeholder="Descrição da ficha de treino"
                  value={trainingSheetDescription}
                  onChange={(e) => setTrainingSheetDescription(e.target.value)}
                />
                </div>
              <button
                onClick={(e) => {
                  if (name !== "") {
                    handleConfirm(e);
                  }
                }}
                className="
                    w-full
                    py-2
                    text-white
                    bg-black
                    rounded
                    hover:bg-black-700
                    focus:ring-2
                    focus:ring-black-500
                    focus:outline-none
                    focus:ring-opacity-50
                  "
                type="submit"
              >
                Registrar Cliente
              </button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistracionClient;
