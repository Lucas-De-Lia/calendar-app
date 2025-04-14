import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { NavBar } from "../components/NavBar"
import { localizer } from '../../helpers/calendarLocalizer'
import { getMesssagesEs } from '../../helpers/getMessages'
import { CalendarEvent } from '../components/CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'


export const CalendarPage = () => { 

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

  const eventStyleGetter = (event, start, end, isSelected) => {
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

  const onDoubleClick = () => {
    openDateModal();
  }
  const onSelect = (e) => {
    setActiveEvent(e);
  }
  const onViewChanged = (e) => {
    localStorage.setItem('lastView', e);
  }


  return (
    <>
      <NavBar/>
      <Calendar
      localizer={localizer}
      events={ events }
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px)' }}
      culture='es'
      messages= { getMesssagesEs() }
      eventPropGetter={ eventStyleGetter }
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent={ onDoubleClick }
      onSelectEvent={ onSelect }
      onView={ onViewChanged }
    />
    <CalendarModal/>
    <FabAddNew/>
    <FabDelete/>
    </>
  )
}
