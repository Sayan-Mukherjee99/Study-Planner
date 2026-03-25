import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Study Calendar</h1>
          <p className="text-slate-400">Visualize your academic schedule and upcoming deadlines.</p>
        </div>
        
        <div className="flex items-center bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700/50">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-700 rounded-xl transition-all">
            <ChevronLeft size={20} />
          </button>
          <div className="px-6 font-bold text-lg min-w-[160px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </div>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-700 rounded-xl transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="bg-slate-800/20 border border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl">
        {/* Days Header */}
        <div className="grid grid-cols-7 bg-slate-800/40 border-b border-slate-700/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-4 text-center text-xs font-black uppercase tracking-widest text-slate-500">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, idx) => {
            const dayTasks = tasks.filter(t => isSameDay(new Date(t.deadline), day));
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isToday = isSameDay(day, new Date());

            return (
              <div 
                key={idx} 
                className={`min-h-[140px] p-2 border-r border-b border-slate-700/30 transition-all hover:bg-slate-800/10 ${
                  !isCurrentMonth ? 'opacity-20' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-lg ${
                    isToday ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'text-slate-400'
                  }`}>
                    {format(day, 'd')}
                  </span>
                </div>
                
                <div className="space-y-1.5">
                  {dayTasks.map(task => (
                    <div 
                      key={task.id} 
                      className="group cursor-pointer relative px-2 py-1.5 rounded-lg text-[10px] font-bold truncate transition-all hover:scale-105"
                      style={{ 
                        backgroundColor: `${task.subject_color || '#3b82f6'}22`, 
                        color: task.subject_color || '#3b82f6',
                        borderLeft: `3px solid ${task.subject_color || '#3b82f6'}`
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <span className={`w-1 h-1 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-current'}`} />
                        <span className={task.status === 'completed' ? 'line-through opacity-50' : ''}>
                          {task.title}
                        </span>
                      </div>
                      <div className="hidden group-hover:block absolute z-10 top-full left-0 mt-2 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-48 text-slate-200 pointer-events-none">
                        <p className="font-black mb-1">{task.title}</p>
                        <p className="text-[9px] text-slate-500 flex items-center gap-1 font-normal">
                          <Clock size={10} /> {format(new Date(task.deadline), 'HH:mm')} • {task.priority} Priority
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
