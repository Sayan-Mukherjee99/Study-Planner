import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { CheckCircle2, Circle, Clock, Flame, BookOpen, Target, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, subjectsRes] = await Promise.all([
          api.get('/tasks'),
          api.get('/subjects')
        ]);
        setTasks(tasksRes.data);
        setSubjects(subjectsRes.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.length - completedTasks;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const chartData = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: pendingTasks },
  ];

  const COLORS = ['#3b82f6', '#1e293b'];

  if (loading) {
    return <div className="text-slate-400">Loading Dashboard...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Study Dashboard</h1>
        <p className="text-slate-400">Track your progress and stay on top of your subjects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Total Tasks</p>
            <p className="text-2xl font-bold">{tasks.length}</p>
          </div>
          <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-500">
            <Target size={24} />
          </div>
        </div>
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Completed</p>
            <p className="text-2xl font-bold text-blue-500">{completedTasks}</p>
          </div>
          <div className="bg-green-500/10 p-3 rounded-2xl text-green-500">
            <CheckCircle2 size={24} />
          </div>
        </div>
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Subjects</p>
            <p className="text-2xl font-bold">{subjects.length}</p>
          </div>
          <div className="bg-purple-500/10 p-3 rounded-2xl text-purple-500">
            <BookOpen size={24} />
          </div>
        </div>
        <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">Completion Rate</p>
            <p className="text-2xl font-bold">{completionRate}%</p>
          </div>
          <div className="bg-orange-500/10 p-3 rounded-2xl text-orange-500">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock size={20} className="text-blue-500" />
              Focusing on Today
            </h2>
          </div>
          
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="bg-slate-800/20 border border-slate-700/50 p-12 rounded-3xl text-center">
                <p className="text-slate-500">No tasks for today. Time to relax or plan ahead!</p>
              </div>
            ) : (
              tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl flex items-center justify-between group hover:border-slate-600 transition-all">
                  <div className="flex items-center gap-4">
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="text-blue-500" size={24} />
                    ) : (
                      <Circle className="text-slate-600" size={24} />
                    )}
                    <div>
                      <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${task.subject_color}22`, color: task.subject_color }}>
                          {task.subject_name || 'No Subject'}
                        </span>
                        <span className="text-xs text-slate-500">
                          Due: {new Date(task.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs font-bold uppercase ${
                    task.priority === 'high' ? 'text-red-400' : task.priority === 'medium' ? 'text-orange-400' : 'text-blue-400'
                  }`}>
                    {task.priority}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Analytics Card */}
        <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 flex flex-col items-center justify-center space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2 self-start">
            <Flame size={20} className="text-orange-500" />
            Study Progress
          </h2>
          
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black">{completionRate}%</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest">Done</span>
            </div>
          </div>

          <div className="w-full space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-slate-400">Completed</span>
              </div>
              <span className="font-bold">{completedTasks}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <span className="text-slate-400">Pending</span>
              </div>
              <span className="font-bold">{pendingTasks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
