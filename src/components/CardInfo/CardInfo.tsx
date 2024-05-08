
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'



const CardInfo = (props) => {

  return (
    <Card>
    <CardHeader>
    <CardTitle>{props.title}</CardTitle>
    <CardDescription>{props.description}</CardDescription>
    </CardHeader>
    <CardContent>
    <div className="flex items-center justify-between">
        {props.icon}
        {/*<UsersIcon className="w-8 h-8 text-black dark:text-gray-400" />*/}
        <span className="text-3xl font-bold">{props.value}</span>
    </div>
    </CardContent>
</Card>
  )
}

export default CardInfo
