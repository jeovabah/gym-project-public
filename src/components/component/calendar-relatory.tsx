import { AvatarFallback, Avatar } from "@/components/ui/avatar";


export function CalendarRelatory({schedule}) {
  
  const days = [
    "Segunda",
    "Terca",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo",
  ];



  return (
    <section className="max-w-6xl w-full mx-auto grid gap-6">
      <div className="container">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h5 className="font-semibold text-3xl">Calendario Semanal</h5>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {days.map((day) => (
            <div
              key={day}
              className="rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-800"
            >
              <h3 className="text-lg font-semibold">{day}</h3>
              
              {schedule[day] && Object.keys(schedule[day]).length > 0 ? (
                Object.keys(schedule[day])
                  .sort()
                  .map((time) => (
                    <div key={time} className="mt-2">                      
                      <p className="font-medium">{time}</p>
                      
                      {schedule[day][time].map((client) => (
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
