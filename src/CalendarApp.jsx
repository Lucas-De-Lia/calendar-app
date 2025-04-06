import { BrowserRouter } from "react-router"
import { AppRouter } from "./routes/AppRouter"


export const CalendarApp = () => {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}
