import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, Palette, Book } from 'lucide-react';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#3b82f6');
  const [loading, setLoading] = useState(true);

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#475569'
  ];

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/subjects');
      setSubjects(res.data);
    } catch (err) {
      console.error('Error fetching subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newName) return;
    try {
      await api.post('/subjects', { name: newName, color: newColor });
      setNewName('');
      fetchSubjects();
    } catch (err) {
      console.error('Error creating subject');
    }
  };

  const handleDeleteSubject = async (id) => {
    if (!window.confirm('Delete this subject and all associated tasks?')) return;
    try {
      await api.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (err) {
      console.error('Error deleting subject');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">My Subjects</h1>
        <p className="text-sm md:text-base text-slate-400">Organize your study material into manageable subjects.</p>
      </div>

      {/* Add Subject Card */}
      <div className="bg-slate-800/40 p-5 md:p-8 rounded-3xl border border-slate-700/50 shadow-2xl">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Plus size={20} className="text-primary-500" />
          Create New Subject
        </h2>
        <form onSubmit={handleAddSubject} className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
          <div className="flex-1 space-y-2 w-full">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Subject Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Mathematics, World History"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary-500/50 outline-none transition-all text-sm md:text-base"
            />
          </div>
          <div className="space-y-2 w-full lg:w-auto">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Theme Color</label>
            <div className="flex flex-wrap gap-2 p-2 bg-slate-900/50 rounded-xl border border-slate-700 justify-center lg:justify-start">
              {colors.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setNewColor(c)}
                  className={`w-8 h-8 md:w-6 md:h-6 rounded-full transition-all ${newColor === c ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-60 hover:opacity-100'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full lg:w-auto bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary-500/20 text-sm md:text-base"
          >
            Create
          </button>
        </form>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map(subject => (
          <div
            key={subject.id}
            className="group relative bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 md:p-6 hover:border-slate-600 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: subject.color }}
              >
                <Book size={20} md:size={24} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base md:text-lg truncate">{subject.name}</h3>
                <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold whitespace-nowrap" style={{ color: subject.color }}>
                  Subject Category
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDeleteSubject(subject.id)}
              className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all ml-2"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        {subjects.length === 0 && !loading && (
          <div className="md:col-span-2 py-12 text-center text-slate-500 italic">
            No subjects created yet. Start by adding one above.
          </div>
        )}
      </div>
    </div>
  );
};

export default Subjects;
