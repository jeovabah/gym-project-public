import { useState, useEffect } from "react";
import { DaysOfWeek } from "../RegistracionClient/RegistracionClient";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { api } from "@/services/api/api";
import InputDateComponent from "../InputDateComponent/InputDateComponent";
import { Mask } from "@/utils/mask";

const EditContent = (props) => {
  const [selectedDays, setSelectedDays] = useState<string[]>( []);
  const [selectedDayToPay, setSelectedDayToPay] = useState( 1);
  
  const [name, setName] = useState(props.clientName || "");
  const [time, setTime] = useState(props.time || "");
  const [dateOfBirth, setdateOfBirth] = useState(props.dateOfBirth || "");
  const [trainingSheetDescription, setTrainingSheetDescription] = useState(props.trainingSheetDescription || "");

  useEffect(() => {
    setSelectedDays([]);
    setSelectedDayToPay(1);
    
    setName(props.clientName || "");
    setTime(props.time || "");
    setdateOfBirth(props.dateOfBirth || "");
    setTrainingSheetDescription(props.trainingSheetDescription || "");
  }, [props]);

  const toggleDay = (day) => {
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
    if (Array.isArray(selectedDays)) {
      selectedDays.forEach((day) => {
        if (!daysAndTimes[day]) {
          daysAndTimes[day] = [];
        }
        if (time) {
          daysAndTimes[day].push(time);
        }
      });
    }

    const maskedDate = Mask.maskBirthday(dateOfBirth);
    const formattedDate = Mask.tranformMaskBirthdayInUs(maskedDate);

    const payload = {
      daysOfWeek: daysAndTimes,
      name: name,
      statusPaid: props.status,
      dayToPay: selectedDayToPay,
      dateOfBirth: formattedDate,
      trainingSheetDescription,
    };
    await api.put(`/client/update/${props.id}`, payload);
    handleClear();
    props.setShowEdit(false);
    props.getClient();
  };

  const handleClear = () => {
    setName("");
    setTime("");
    
    setSelectedDays([]);
    setSelectedDayToPay(1);
    setTrainingSheetDescription("");
  };

  return (
    <form className="space-y-4 max-sm:max-h-full overflow-y-auto sm:max-w-[440px] bg-white text-black" style={{ borderRadius: '0.75rem' }}>
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          placeholder="Nome"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <InputDateComponent
          dateOfBirth={dateOfBirth}
          setdateOfBirth={setdateOfBirth}
          defaultBithday={props.dateOfBirth}
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
              <label className="text-sm font-normal" htmlFor={day.toLowerCase()}>
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
          required
        />
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
            let value = e.target.value;
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
          required
        />
      </div>
      <button
        onClick={(e) => {
          if (name !== "") {
            handleConfirm(e);
          }
        }}
        className="w-full py-2 text-white bg-green-600 hover:bg-black-700 focus:ring-2 focus:ring-black-500 focus:outline-none focus:ring-opacity-50"
        type="submit"
      >
        Atualizar
      </button>
    </form>
  );
};

export default EditContent;
