import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
  } from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Checkbox } from "@/components/ui/checkbox";
  import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";

const RegistracionClient = () => {
  return (
    
    <div className="max-w-6xl w-full mx-auto grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Registration</CardTitle>
              <CardDescription>
                Register a new client for your gym.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold">Client Registration</h1>
                  <p className="text-black dark:text-gray-400">
                    Register a new client for your gym.
                  </p>
                </div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter client name" required />
                  </div>
                  <div>
                    <Label className="font-semibold">Training Days</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="monday" name="training-days" />
                        <Label className="text-sm font-normal" htmlFor="monday">
                          Monday
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tuesday" name="training-days" />
                        <Label
                          className="text-sm font-normal"
                          htmlFor="tuesday"
                        >
                          Tuesday
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="wednesday" name="training-days" />
                        <Label
                          className="text-sm font-normal"
                          htmlFor="wednesday"
                        >
                          Wednesday
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="thursday" name="training-days" />
                        <Label
                          className="text-sm font-normal"
                          htmlFor="thursday"
                        >
                          Thursday
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="friday" name="training-days" />
                        <Label className="text-sm font-normal" htmlFor="friday">
                          Friday
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="saturday" name="training-days" />
                        <Label
                          className="text-sm font-normal"
                          htmlFor="saturday"
                        >
                          Saturday
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sunday" name="training-days" />
                        <Label className="text-sm font-normal" htmlFor="sunday">
                          Sunday
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="training-time">Training Time</Label>
                    <select
                      id="training-time"
                      className="w-full bg-white p-2 border rounded-md"
                    >
                      <option value="6am-8am">6am - 8am</option>
                      <option value="8am-10am">8am - 10am</option>
                      <option value="10am-12pm">10am - 12pm</option>
                      <option value="4pm-6pm">4pm - 6pm</option>
                      <option value="6pm-8pm">6pm - 8pm</option>
                    </select>
                  </div>
                  <div>
                    <Label className="font-semibold">Payment Status</Label>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="paid" name="payment-status">
                          <RadioGroupItem id="paid" value="paid" />
                        </RadioGroup>
                        <Label className="text-sm font-normal" htmlFor="paid">
                          Paid
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="paid" name="payment-status">
                          <RadioGroupItem id="unpaid" value="unpaid" />
                        </RadioGroup>
                        <Label className="text-sm font-normal" htmlFor="unpaid">
                          Unpaid
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-day">Payment Day</Label>
                    <select
                      id="payment-day"
                      className="w-full bg-white p-2 border rounded-md"
                    >
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </select>
                  </div>
                  <button
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
                    Register Client
                  </button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
  )
}

export default RegistracionClient
