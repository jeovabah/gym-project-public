
  import InfoComponent from "../InfoComponent/InfoComponent";
  import RegistracionClient from "../RegistracionClient/RegistracionClient";

  
  

const MainDashboard = () => {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40 text-black">
        <div className="max-w-6xl w-full mx-auto grid gap-2">
          <h1 className="font-semibold text-3xl">Dashboard</h1>
        </div>
        <InfoComponent/>
        <RegistracionClient/>
      </main>
)
}

export default MainDashboard