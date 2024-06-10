import { useEffect, useState } from "react";
import InfoComponent from "../InfoComponent/InfoComponent";

import { CalendarRelatory } from "../component/calendar-relatory";
import { api } from "@/services/api/api";

import Loading from "../component/Loading/Loading";

interface activeClientsProps {
  activeClients: number;
}

const MainDashboard = () => {
  const [trainers, setTrainers] = useState([]);
  const [activeClients, setActiveClients] = useState<activeClientsProps | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState({});
  const [paymentsData, setPaymentsData] = useState([]);

  const getTrainers = async () => {
    const response = await api.get("/trainer");
    setTrainers(response?.data?.response);
  };
  const getActiveClients = async () => {
    const response = await api.get("/client/quantityAll");
    if (response.data != null) {
      setActiveClients(response.data.response);
    }
  };

  const getPaymentPerMonth = async () => {
    const { data } = await api.get("/payment/totalPaid");
    if (data != null) {
      setPaymentsData(data?.response);
    }
  };

  const verifyPaymentOnThisMonth = async () => {
    try {
      const { data } = await api.post("/payment/verifyPaymentsClients");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSchedule = async () => {
    const response = await api.get("/client/daysTrainner");
    setSchedule(response?.data?.response?.response);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getTrainers(),
          getActiveClients(),
          fetchSchedule(),
          getPaymentPerMonth(),
          verifyPaymentOnThisMonth(),
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-5 z-50">
          <Loading />
        </div>
      )}
      ;
      <div
        className={`transition-filter duration-100 ${loading ? "blur" : ""}`}
      >
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40 text-black">
          <div className="max-w-6xl w-full mx-auto grid gap-2">
            <h1 className="font-semibold text-3xl">Dashboard</h1>
          </div>
          <InfoComponent
            trainers={trainers}
            activeClients={activeClients}
            paymentsData={paymentsData}
          />
          <CalendarRelatory schedule={schedule} trainers={trainers} />
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
