import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, Calendar as CalendarIcon, Filter } from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subject_id: '',
    deadline: '',
    priority: 'medium'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, subjectsRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/subjects')
      ]);
      setTasks(tasksRes.data);
      setSubjects(subjectsRes.data);
    } catch (err) {
      console.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      // Ensure subject_id is null if empty string
      const taskData = {
        ...formData,
        subject_id: formData.subject_id === '' ? null : formData.subject_id
      };
      await api.post('/tasks', taskData);
      setFormData({ title: '', subject_id: '', deadline: '', priority: 'medium' });
      setShowAddForm(false);
      fetchData();
    } catch (err) {
      console.error('Error creating task');
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      // Only send necessary fields for update, ensuring IDs and core data are clean
      const updateData = {
        title: task.title,
        subject_id: task.subject_id,
        deadline: task.deadline,
        priority: task.priority,
        status: newStatus
      };
      await api.put(`/tasks/${task.id}`, updateData);
      fetchData();
    } catch (err) {
      console.error('Error updating task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting task');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Tasks & Goals</h1>
          <p className="text-sm md:text-base text-slate-400">Manage your daily study objectives.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg shadow-primary-500/20 w-full sm:w-auto"
        >
          <Plus size={20} />
          {showAddForm ? 'Cancel' : 'New Task'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-slate-800/40 p-5 md:p-8 rounded-3xl border border-slate-700/50 shadow-2xl animate-in fade-in slide-in-from-top-4">
          <form onSubmit={handleCreateTask} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="What are you studying?"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Subject</label>
                <select
                  value={formData.subject_id}
                  onChange={(e) => setFormData({...formData, subject_id: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-sm md:text-base"
                >
                  <option value="">General / No Subject</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Deadline</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-primary-500/50 transition-all text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Priority</label>
                <div className="grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({...formData, priority: p})}
                      className={`py-2.5 md:py-3 rounded-xl border text-[10px] md:text-sm font-bold capitalize transition-all ${
                        formData.priority === p 
                          ? 'bg-primary-600/20 border-primary-500 text-primary-400 shadow-inner' 
                          : 'bg-slate-900/40 border-slate-700 text-slate-500 hover:border-slate-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-primary-500/20 text-sm md:text-base"
            >
              Add Task to Schedule
            </button>
          </form>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-3 md:space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-slate-800/20 border border-slate-700/50 rounded-2xl p-4 md:p-6 hover:bg-slate-800/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4 md:gap-6 flex-1 w-full">
              <button onClick={() => handleToggleStatus(task)} className="mt-1 sm:mt-0 ring-offset-slate-900 rounded-full focus:ring-2 focus:ring-primary-500 transition-all">
                {task.status === 'completed' ? (
                  <CheckCircle2 className="text-green-500" size={24} md:size={28} />
                ) : (
                  <Circle className="text-slate-600 hover:text-slate-400" size={24} md:size={28} />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <h3 className={`text-base md:text-lg font-bold truncate ${task.status === 'completed' ? 'line-through text-slate-600' : 'text-slate-200'}`}>
                    {task.title}
                  </h3>
                  <span 
                    className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded border whitespace-nowrap"
                    style={{ borderColor: `${task.subject_color}44`, color: task.subject_color || '#94a3b8' }}
                  >
                    {task.subject_name || 'General'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                  <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-slate-500">
                    <CalendarIcon size={14} />
                    {new Date(task.deadline).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className={`flex items-center gap-1.5 text-[11px] md:text-xs font-bold uppercase ${
                    task.priority === 'high' ? 'text-red-400' : task.priority === 'medium' ? 'text-orange-400' : 'text-blue-400'
                  }`}>
                    <AlertCircle size={14} />
                    {task.priority} Priority
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end w-full sm:w-auto border-t sm:border-t-0 border-slate-700/30 pt-3 sm:pt-0">
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {tasks.length === 0 && !loading && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto text-slate-600">
              <Filter size={40} />
            </div>
            <p className="text-slate-500 font-medium">Your task list is empty. Focus on your goals by adding a new task.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
