
const Content = (props) => {

  

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center justify-between">
            
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-5 ">
            <div className="bg-gray-300 rounded dark:bg-gray-800 p-4 sm:p-6 text-center">
                            <h3 className="text-lg font-semibold">{props.day}</h3>
              
                        </div>
              

            
            
              </div>
    </div>
          
  )
}

export default Content
