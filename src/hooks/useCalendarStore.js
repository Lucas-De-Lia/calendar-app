import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";


export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);


    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent( calendarEvent ));
    }

    const startSavingEvent = async( calendarEvent ) => {
      try {
        if(calendarEvent.id){
        
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent); 
        
        dispatch(onUpdateEvent( {...calendarEvent, user} ));
        return;
      }
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent( { ...calendarEvent, id: data.evento.id, user } ));

      } catch (error) {
        console.log('Error saving event', error);
        Swal.fire('Error saving event', error.response.data.msg, 'error');
      }
      
    }

    const startDeletingEvent = async() =>{
      try {
        await calendarApi.delete(`/events/${activeEvent.id}`); 
        dispatch(onDeleteEvent());
      } catch (error) {
        console.log('Error deleting event', error);
        Swal.fire('Error deleting event', error.response.data.msg, 'error');
      }
    }

    const startLoadingEvents = async ( ) => {
      try {
        const { data } = await calendarApi.get('/events');

        const events = convertEventsToDateEvents(data.eventos);
        dispatch(onLoadEvents(events));
      } catch (error) {
        console.log('Error loading events', error);
      }
    }
 
  return{
    //*props
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
