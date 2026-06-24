import React from 'react';
import { CheckSquare, Plus, CheckCircle2, Trash2 } from 'lucide-react';

export default function TaskBoard({
  tasks,
  taskFilter,
  setTaskFilter,
  searchQuery,
  handleAddTask,
  newTaskTitle,
  setNewTaskTitle,
  newTaskPriority,
  setNewTaskPriority,
  newTaskCategory,
  setNewTaskCategory,
  handleUpdateTaskStatus,
  handleDeleteTask
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Operational Task Workspace</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Add, drag, filter, and resolve action items live</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['All', 'To Do', 'In Progress', 'Done'].map(statusFilter => (
            <button
              key={statusFilter}
              onClick={() => setTaskFilter(statusFilter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                taskFilter === statusFilter
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {statusFilter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Enqueue Action Item</h3>
          
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">Task Title</label>
              <input 
                type="text" 
                placeholder="Audit network firewall protocols..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">Priority</label>
                <select 
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-955 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                  <option value="Low">🟢 Low</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="High">🟠 High</option>
                  <option value="Critical">🔴 Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">Category</label>
                <select 
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-955 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                  <option value="DevOps">DevOps</option>
                  <option value="AI Ops">AI Ops</option>
                  <option value="Design">Design</option>
                  <option value="Database">Database</option>
                  <option value="Security">Security</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add to Active Sprint
            </button>
          </form>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {tasks
            .filter(task => taskFilter === 'All' || task.status === taskFilter)
            .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(task => (
              <div 
                key={task.id} 
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-indigo-500/40 transition-all shadow-sm"
              >
                <div className="flex items-start gap-3.5">
                  <button 
                    onClick={() => handleUpdateTaskStatus(task.id, task.status === 'Done' ? 'To Do' : 'Done')}
                    className={`p-1.5 rounded-lg border-2 transition-all shrink-0 mt-0.5 ${
                      task.status === 'Done' 
                        ? 'bg-indigo-500 border-indigo-500 text-white' 
                        : 'border-slate-300 dark:border-slate-700 text-transparent hover:border-indigo-500'
                    }`}
                  >
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono uppercase ${
                        task.priority === 'Critical' 
                          ? 'bg-rose-500/10 text-rose-500' 
                          : task.priority === 'High' 
                            ? 'bg-amber-500/10 text-amber-500' 
                            : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-400">{task.category}</span>
                    </div>
                    <p className={`text-sm font-semibold transition-all ${
                      task.status === 'Done' 
                        ? 'line-through text-slate-404 dark:text-slate-505' 
                        : 'text-slate-800 dark:text-slate-100'
                    }`}>
                      {task.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <select 
                    value={task.status}
                    onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                    className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-202 focus:outline-none"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>

                  <button 
                    onClick={() => handleDeleteTask(task.id, task.title)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            ))}
          
          {tasks.length === 0 && (
            <div className="p-8 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-slate-505">
              <CheckSquare className="h-12 w-12 mx-auto text-slate-400 mb-3 animate-bounce" />
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200">No tasks listed in this node.</p>
              <p className="text-xs mt-1">Create high level sprints in the left controller form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}