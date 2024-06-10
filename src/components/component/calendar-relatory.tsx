import { AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export function CalendarRelatory({ schedule, trainers }) {
  const [scheduelFilter, setScheduleFilter] = useState<any>([]);
  const days = [
    "Segunda",
    "Terca",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo",
  ];

  useEffect(() => {
    schedule && setScheduleFilter(schedule);
  }, [schedule]);

  const onSelectFilter = (trainerId: string = "") => {
    if (trainerId === "all") {
      setScheduleFilter(schedule);
      return schedule;
    }
    if (trainerId) {
      return Object.keys(schedule).reduce((acc, day) => {
        const filtered = Object.keys(schedule[day]).reduce((acc, time) => {
          const clients = schedule[day][time].filter((client) => {
            return client?.trainer?.id == trainerId;
          });

          if (clients?.length > 0) {
            acc[time] = clients;
          }

          return acc;
        }, {});

        if (Object.keys(filtered).length > 0) {
          acc[day] = filtered;
        }
        setScheduleFilter(acc);
        return acc;
      }, {});
    }
    setScheduleFilter(schedule);
    return schedule;
  };

  return (
    <section className="max-w-6xl w-full mx-auto grid gap-6">
      <div className="container">
        <div className="max-w-6xl flex flex-row w-full gap-2 justify-between">
          <h5 className="font-semibold text-3xl">Calendario Semanal</h5>
          <select
            onChange={(e) => {
              onSelectFilter(e.target.value);
            }}
            className="w-1/4 bg-white p-2 border border-gray-200 rounded-lg"
          >
            <option value="all">Todos</option>
            {trainers.map((trainer) => (
              <option key={trainer.id} value={trainer.id}>
                {trainer?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {days.map((day) => (
            <div
              key={day}
              className="rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-800"
            >
              <h3 className="text-lg font-semibold">{day}</h3>

              {scheduelFilter[day] &&
              Object.keys(scheduelFilter[day]).length > 0 ? (
                Object.keys(scheduelFilter[day])
                  .sort()
                  .map((time) => (
                    <div key={time} className="mt-2">
                      <p className="font-medium">{time}</p>

                      {scheduelFilter[day][time].map((client) => (
                        <div
                          key={client.id}
                          className="flex items-center gap-2 mt-2"
                        >
                          <Avatar className="w-8 h-8 bg-white">
                            <AvatarFallback>{client.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {client.name} -{" "}
                            <span className="text-gray-500">
                              "{client?.trainer?.name}"
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  ))
              ) : (
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Todos horarios disponiveis
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
