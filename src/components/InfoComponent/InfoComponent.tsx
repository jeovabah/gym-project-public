import { UserIcon, UsersIcon, HandCoins, CoinsIcon } from "lucide-react";
import CardInfo from "../CardInfo/CardInfo";
import CardActiveTrainers from "../CardInfo/CardActiveTrainers";
import { Mask } from "@/utils/mask";
// import CardTotalClasses from "../CardInfo/CardTotalClasses";

const InfoComponent = ({ trainers, activeClients, paymentsData }) => {
  return (
    <div className="max-w-6xl w-full mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-black ">
      <CardInfo
        title="Clientes Ativos"
        description="Numero de Clientes Ativos"
        icon={<UsersIcon className="w-8 h-8 text-black dark:text-gray-400" />}
        value={activeClients ? activeClients.activeClients : 0}
      />
      <CardActiveTrainers
        title="Treinadores Ativos"
        description="Numero de Treinadores Ativos"
        icon={<UserIcon className="w-8 h-8 text-black dark:text-gray-400" />}
        value={trainers?.length || 0}
      />
      <CardInfo
        title={`Pagamentos Realizados no Mês ${
          new Date().getMonth() + 1
        } de ${new Date().getFullYear()}
        `}
        description="Valor total de pagamentos realizados no mês"
        icon={<HandCoins className="w-8 h-8 text-black dark:text-gray-400" />}
        value={`${Mask.formatCurrency(
          paymentsData?.totalClientsPaidThisMonth || 0
        )}`}
      />
      <CardInfo
        title="Histórico de pagamentos anual"
        description="Valor total de pagamentos realizados"
        icon={<CoinsIcon className="w-8 h-8 text-black dark:text-gray-400" />}
        value={`${Mask.formatCurrency(paymentsData?.totalPaid || 0)}`}
      />
    </div>
  );
};

export default InfoComponent;
