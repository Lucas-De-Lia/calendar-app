import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";


export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);


    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent( calendarEvent ));
    }

    const startSavingEvent = async( calendarEvent ) => {
      //TODO: LLEGAR AL BACKEND


      //TODO BIEN
      if(calendarEvent._id){ 
        dispatch(onUpdateEvent( {...calendarEvent} ));
      }else{
        dispatch(onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() } ));
      }
    }

    const startDeletingEvent = () =>{

      //TODO: LLEGAR AL BACKEND
      dispatch(onDeleteEvent());
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

  }
}
