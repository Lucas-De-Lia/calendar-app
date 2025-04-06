import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { NavBar } from "../components/NavBar"
import { addHours } from 'date-fns'
import { localizer } from '../../helpers/calendarLocalizer'
import { getMesssagesEs } from '../../helpers/getMessages'

const events = [{
  title:"Cumpleaños de Fernando",
  notes:"Comprar el pastel",
  start:new Date(),
  end: addHours(new Date(), 2),
  bgColor:"#fafafa",
  user:{
    _id:"123",
    name:"Lucas"
  }
}]

export const CalendarPage = () => {

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log({event, start, end, isSelected});
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return  {
      style
    }
  }

  return (
    <>
      <NavBar/>
      <Calendar
      localizer={localizer}
      events={ events }
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px)' }}
      culture='es'
      messages= { getMesssagesEs() }
      eventPropGetter={ eventStyleGetter }
    />
    </>
  )
}
