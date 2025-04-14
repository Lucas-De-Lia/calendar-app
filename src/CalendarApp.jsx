import { BrowserRouter } from "react-router"
import { AppRouter } from "./routes/AppRouter"
import { Provider } from "react-redux"
import { store } from "./store/store"


export const CalendarApp = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
      </Provider>
  )
}
