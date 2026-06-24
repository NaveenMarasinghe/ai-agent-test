import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  MessageSquare,
  Activity,
  Bell,
  Sun,
  Moon,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Cpu,
  Database,
  Zap,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Search,
  Sparkles,
  User,
  Code,
  X,
  DollarSign,
  ArrowUpRight,
  Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';

import TaskBoard from './components/TaskBoard';
import TelemetryMetrics from './components/TelemetryMetrics';
import AiChat from './components/AiChat';

const INITIAL_TASKS = [
  { id: '1', title: 'Optimize system resource leaks', status: 'In Progress', priority: 'High', category: 'DevOps' },
  { id: '2', title: 'Train localized LLM on user documents', status: 'To Do', priority: 'Critical', category: 'AI Ops' },
  { id: '3', title: 'Design next-gen pipeline dashboard UI', status: 'Done', priority: 'Medium', category: 'Design' },
  { id: '4', title: 'Sync distributed DB cluster backups', status: 'To Do', priority: 'Medium', category: 'Database' },
  { id: '5', title: 'Audit client websocket subscription limits', status: 'In Progress', priority: 'Low', category: 'Security' }
];

const CHART_DATA_PRESETS = {
  live: [34, 45, 62, 55, 78, 89, 72, 85, 93, 81, 68, 75],
  weekly: [120, 145, 190, 165, 220, 290, 245, 310, 280, 340, 390, 420],
  monthly: [520, 680, 810, 740, 990, 1200, 1150, 1350, 1480, 1620, 1780, 1950]
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [chartPreset, setChartPreset] = useState('live');
  const [animatedChartData, setAnimatedChartData] = useState(CHART_DATA_PRESETS.live);
  const [cpuLoad, setCpuLoad] = useState(42);
  const [ramUsage, setRamUsage] = useState(64);
  const [networkSpeed, setNetworkSpeed] = useState(128.4);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskCategory, setNewTaskCategory] = useState('DevOps');
  const [taskFilter, setTaskFilter] = useState('All');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'system', text: 'Hello Commander! I am Aether AI, your localized workspace intelligence. Ask me to "optimize workflows", "create database backup plan", "check infrastructure health" or type anything you want assistance with.', timestamp: '10:00 AM' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [timerSeconds, setTimerSeconds] = useState(1500); 
  const [timerActive, setTimerActive] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState([
    'AetherShell v4.1.0-alpha loaded successfully.',
    'Type "help" for a list of active system commands.',
    ''
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [unreadAlerts, setUnreadAlerts] = useState(3);
  const [showAlertModal, setShowAlertModal] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(prev => {
        const shift = Math.floor(Math.random() * 11) - 5; 
        const next = prev + shift;
        return next > 95 ? 90 : next < 15 ? 20 : next;
      });
      setRamUsage(prev => {
        const shift = Math.floor(Math.random() * 5) - 2;
        const next = prev + shift;
        return next > 90 ? 88 : next < 40 ? 55 : next;
      });
      setNetworkSpeed(prev => {
        const shift = (Math.random() * 20) - 10;
        const next = Number((prev + shift).toFixed(1));
        return next > 450 ? 400 : next < 50 ? 80 : next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAnimatedChartData(CHART_DATA_PRESETS[chartPreset]);
  }, [chartPreset]);

  useEffect(() => {
    let timer = null;
    if (timerActive && timerSeconds > 0) {
      timer = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      addToast('Focus Session Finished!', 'success');
      confetti({ particleCount: 150, spread: 80 });
      setTimerActive(false);
      setTimerSeconds(1500);
    }
    return () => clearInterval(timer);
  }, [timerActive, timerSeconds]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      status: 'To Do',
      priority: newTaskPriority,
      category: newTaskCategory
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    addToast(`Task "${newTask.title}" listed on high alert workflow!`, 'success');
  };

  const handleUpdateTaskStatus = (id, newStatus) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        if (newStatus === 'Done') {
          confetti({ particleCount: 40, spread: 40, colors: ['#6366f1', '#10b981'] });
          addToast(`Task resolved! Operational standard met.`, 'success');
        }
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id, title) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    addToast(`Archived "${title}" successfully.`, 'error');
  };

  const handleSendChat = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, timestamp }]);
    setChatInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      let aiReply = '';
      const command = userMsg.toLowerCase();

      if (command.includes('optimize') || command.includes('workflow')) {
        aiReply = `⚙️ **Workflow Analysis**: Identified redundant caching loops in production nodes. Recommend immediately migrating to cluster Node-14 and terminating inactive WebSockets. Saving average latency of ~120ms.`;
      } else if (command.includes('backup') || command.includes('database')) {
        aiReply = `💾 **Backup Sequence Plan**: Generating multi-zone replication schemas... All transactional shards have been prepared for snapshot on AWS & Azure clusters simultaneously. Status is green.`;
      } else if (command.includes('health') || command.includes('status')) {
        aiReply = `📊 **Infrastructure Diagnostics**: CPU metrics: ${cpuLoad}%. RAM: ${ramUsage}%. Host network: ${networkSpeed} MB/s. Everything is well within nominal parameters. Clear skies ahead.`;
      } else if (command.includes('task') || command.includes('create')) {
        const randomTitle = 'Resolve AI Suggested Infrastructure Upgrade';
        const autoTask = {
          id: Date.now().toString(),
          title: randomTitle,
          status: 'To Do',
          priority: 'Critical',
          category: 'AI Ops'
        };
        setTasks(prev => [autoTask, ...prev]);
        aiReply = `📝 **Task Created Automatically!** Added: "${randomTitle}" as a Critical AI Ops category task. It is currently in your To Do queue.`;
      } else {
        aiReply = `I've analyzed your input: "${userMsg}". Let's run custom diagnostic tools to execute. Let me know if you would like me to list high priority action items, trigger deployment routines, or update task boards.`;
      }

      const aiTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatMessages(prev => [...prev, { sender: 'system', text: aiReply, timestamp: aiTimestamp }]);
      setIsAiTyping(false);
      
      confetti({ particleCount: 15, colors: ['#6366f1'] });
    }, 1200);
  };

  const handleQuickAction = (phrase) => {
    setChatInput(phrase);
    addToast(`Command "${phrase}" filled. Press enter to send!`, 'info');
  };

  const handleTerminalCommand = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    const lowerCmd = cmd.toLowerCase();
    let reply = '';

    if (lowerCmd === 'help') {
      reply = 'Available commands: sysinfo, tasks, clear, timer, benchmark, optimize';
    } else if (lowerCmd === 'sysinfo') {
      reply = `CPU Core: Intel Xeon Plt (Virt) // LOAD: ${cpuLoad}% // MEMORY: ${ramUsage}% // NET_SPEED: ${networkSpeed} MB/s // UPTIME: 324h 12m`;
    } else if (lowerCmd === 'tasks') {
      reply = `ACTIVE INSTANCES (${tasks.length}): ` + tasks.map(t => `[${t.priority}] ${t.title}`).join(' | ');
    } else if (lowerCmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (lowerCmd === 'timer') {
      setTimerActive(prev => !prev);
      reply = `Pomodoro toggle state: ${!timerActive ? 'ACTIVE (25m)' : 'PAUSED'}`;
    } else if (lowerCmd === 'benchmark') {
      reply = '⚡ Benchmarking CPU and Cluster limits... Node-A score: 24,902 // Node-B score: 21,495 (Optimal thread distribution)';
    } else if (lowerCmd === 'optimize') {
      reply = '🚀 Running garbage collector & task compaction routines. Freed 1.2GB RAM overhead virtual cache.';
      setRamUsage(prev => Math.max(45, prev - 12));
    } else {
      reply = `aethershell: command not found: "${cmd}". Type "help" for reference.`;
    }

    setTerminalHistory(prev => [...prev, `aether@host:~$ ${cmd}`, reply, '']);
    setTerminalInput('');
  };

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row transition-colors duration-200">
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 transform translate-y-0 transition-all duration-300 pointer-events-auto border ${
              t.type === 'success' 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : t.type === 'error' 
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                  : 'bg-brand-500/10 text-indigo-400 border-brand-500/30'
            }`}
          >
            {t.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : t.type === 'error' ? <AlertCircle className="h-5 w-5 shrink-0" /> : <Sparkles className="h-5 w-5 shrink-0" />}
            <div className="text-sm font-medium">{t.message}</div>
          </div>
        ))}
      </div>

      {showAlertModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowAlertModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-205"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-lg">
                <Bell className="h-6 w-6 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Security &amp; Operational Alerts</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Real-time notifications queued from local node clusters</p>
              </div>
            </div>

            <div className="space-y-3 my-4">
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 flex gap-3">
                <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-rose-900 dark:text-rose-300">Node Sync Latency Exceeded</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Backup cluster Node-14 reported database lag deviation over +240ms.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">2 minutes ago</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">Memory Footprint Warning</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Host RAM usage breached pre-set threshold at 81%. Local cluster scaling required.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">15 minutes ago</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-indigo-550 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">Auto-Scaling Resolved</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Successfully routed redundant traffic to US-East server group.</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => { setUnreadAlerts(0); addToast('Cleared all unread notifications', 'info'); setShowAlertModal(false); }}
                className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Mark All Read
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className="w-full md:w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center animate-pulse-slow">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight text-white">AETHERFLOW</h1>
                <p className="text-[10px] font-mono tracking-widest text-indigo-400">WORKSPACE v4.1</p>
              </div>
            </div>
          </div>

          <div className="p-4 mx-4 my-4 bg-slate-800/40 border border-slate-800 rounded-xl flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Welcome back,</p>
              <h4 className="text-sm font-bold text-slate-100">Chief Architect</h4>
            </div>
          </div>

          <nav className="px-4 py-3 space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-150 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="h-4.5 w-4.5" />
                <span>Dashboard Hub</span>
              </div>
              <ChevronRight className={`h-4 w-4 transform transition-transform ${activeTab === 'dashboard' ? 'rotate-90' : ''}`} />
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-150 ${
                activeTab === 'tasks'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckSquare className="h-4.5 w-4.5" />
                <span>Operational Tasks</span>
              </div>
              <span className="bg-slate-800 text-[10px] text-indigo-400 px-2 py-0.5 rounded-full border border-slate-700">{tasks.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-chat')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-150 ${
                activeTab === 'ai-chat'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4.5 w-4.5" />
                <span>Aether AI Assistant</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-150 ${
                activeTab === 'metrics'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Activity className="h-4.5 w-4.5" />
                <span>Performance &amp; Charts</span>
              </div>
              <ChevronRight className="h-4.5 w-4.5" />
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-150 ${
                activeTab === 'terminal'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Code className="h-4.5 w-4.5" />
                <span>Sandbox Shell</span>
              </div>
              <Terminal className="h-4.5 w-4.5 text-indigo-400" />
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Focus Timer</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                POMODORO
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xl font-mono font-bold text-white">{formatTimer(timerSeconds)}</div>
              <div className="flex gap-1.5">
                <button 
                  onClick={() => setTimerActive(!timerActive)} 
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title={timerActive ? 'Pause' : 'Start'}
                >
                  {timerActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 text-indigo-400" />}
                </button>
                <button 
                  onClick={() => { setTimerActive(false); setTimerSeconds(1500); addToast('Timer reset', 'info'); }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-950">
        <header className="border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 shadow-sm">
          <div className="relative w-full sm:max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 dark:text-slate-500">
              <Search className="h-4 w-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search workspace (tasks, resources, system logs)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-955 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setShowAlertModal(true)} 
              className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadAlerts > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
                  {unreadAlerts}
                </span>
              )}
            </button>

            <button
              onClick={() => { setDarkMode(!darkMode); addToast(`Theme toggled to ${!darkMode ? 'Dark' : 'Light'} Mode`, 'info'); }}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-indigo-600" />}
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold font-mono tracking-wider uppercase">SYSTEM OK</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            <div className="relative p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white overflow-hidden shadow-xl">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 bg-indigo-500/20 w-fit px-2.5 py-1 rounded-full text-[11px] font-bold text-indigo-300 tracking-wider uppercase">
                    <Sparkles className="h-3.5 w-3.5" /> Live Operational Node Grid
                  </div>
                  <h2 className="text-2xl font-black tracking-tight mb-2">Advanced Cluster Architecture Sandbox</h2>
                  <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                    Monitor critical telemetry streams, trigger customized database schemas, schedule background task cycles, and query simulated container systems directly through artificial intelligence.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button 
                    onClick={() => { setActiveTab('tasks'); addToast('Switched to Task Workspace.', 'info'); }}
                    className="px-4 py-2 text-xs font-bold bg-white text-slate-900 rounded-xl hover:bg-slate-100 transition-colors shadow-lg shadow-white/5"
                  >
                    Create Action Item
                  </button>
                  <button 
                    onClick={() => { setActiveTab('ai-chat'); addToast('Ask AI Optimization loaded.', 'info'); }}
                    className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-lg shadow-indigo-600/30"
                  >
                    Consult Aether AI
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Host CPU Workload</h3>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Main cluster cluster-0</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-lg">
                    {cpuLoad}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 progress-glow-cyan transition-all duration-700 ease-out"
                    style={{ width: `${cpuLoad}%` }}
                  ></div>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>Threads: 128 / 128</span>
                  <span>Core Temp: 49°C</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-505">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Buffer Memory Pool</h3>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Buffered RAM cache</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-lg">
                    {ramUsage}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 progress-glow-cyan transition-all duration-700 ease-out"
                    style={{ width: `${ramUsage}%` }}
                  ></div>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-505 dark:text-slate-400 font-mono">
                  <span>Active: 10.2 GB</span>
                  <span>Total: 16 GB DDR5</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Egress Pipeline Speed</h3>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Global proxy router</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                    {networkSpeed} MB/s
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 progress-glow-emerald transition-all duration-700 ease-out"
                    style={{ width: `${Math.min(100, (networkSpeed / 400) * 100)}%` }}
                  ></div>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-505 dark:text-slate-400 font-mono">
                  <span>Rx: {Number((networkSpeed * 0.45).toFixed(1))} MB/s</span>
                  <span>Tx: {Number((networkSpeed * 0.55).toFixed(1))} MB/s</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-indigo-505" />
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">System Operation Cycles</h3>
                      </div>
                      <p className="text-xs text-slate-505 dark:text-slate-400">Interactive cluster telemetry chart analyzer</p>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      {['live', 'weekly', 'monthly'].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => { setChartPreset(preset); addToast(`Chart timeframe updated to ${preset}`, 'info'); }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                            chartPreset === preset 
                              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                              : 'text-slate-500 dark:text-slate-404 hover:text-slate-800 dark:hover:text-slate-202'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-64 flex items-end justify-between relative mt-8">
                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chart-grad-dashboard" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d={`M 0 256 ${animatedChartData.map((d, i) => `L ${(i / (animatedChartData.length - 1)) * 500} ${256 - (d / Math.max(...animatedChartData)) * 180}`).join(' ')} L 500 256 Z`}
                        fill="url(#chart-grad-dashboard)"
                        className="transition-all duration-700 ease-out"
                      />
                      <path 
                        d={animatedChartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${(i / (animatedChartData.length - 1)) * 500} ${256 - (d / Math.max(...animatedChartData)) * 180}`).join(' ')}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="3.5"
                        className="transition-all duration-700 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="absolute left-0 bottom-0 right-0 h-[1px] bg-slate-200 dark:bg-slate-800"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-200 dark:bg-slate-800"></div>

                    {animatedChartData.map((d, i) => {
                      const maxVal = Math.max(...animatedChartData);
                      const xOffset = `${(i / (animatedChartData.length - 1)) * 100}%`;
                      const yOffset = `${(d / maxVal) * 100}%`;

                      return (
                        <div 
                          key={i} 
                          className="absolute group pointer-events-auto"
                          style={{ left: xOffset, bottom: yOffset, transform: 'translate(-50%, 50%)' }}
                        >
                          <div className="w-3 h-3 rounded-full bg-indigo-505 border-2 border-white dark:border-slate-900 group-hover:scale-150 transition-transform cursor-pointer shadow-lg shadow-indigo-500/50"></div>
                          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] font-mono py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-xl border border-slate-700">
                            {d} items
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4 text-xs">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-indigo-500 inline-block"></span>
                      <span className="text-slate-500 dark:text-slate-400">Operational Requests</span>
                    </div>
                    <div className="text-slate-900 dark:text-slate-100 font-bold font-mono">
                      Total: {animatedChartData.reduce((a, b) => a + b, 0)} Units
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-404 font-mono">Updated live via telemetry websocket</span>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-4.5 w-4.5 text-indigo-555" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Crucial Task Queues</h3>
                    </div>
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-555/10 px-2 py-0.5 rounded-full">
                      {tasks.filter(t => t.status !== 'Done').length} Urgent
                    </span>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {tasks.map(task => (
                      <div 
                        key={task.id} 
                        className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between gap-3 hover:border-indigo-500/30 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${
                              task.priority === 'Critical' 
                                ? 'bg-rose-500 animate-pulse' 
                                : task.priority === 'High' 
                                  ? 'bg-amber-500' 
                                  : 'bg-emerald-500'
                            }`}></span>
                            <span className="text-[11px] font-bold font-mono text-slate-400 uppercase">{task.category}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            task.status === 'Done' 
                              ? 'bg-emerald-500/10 text-emerald-400' 
                              : task.status === 'In Progress' 
                                ? 'bg-indigo-555/10 text-indigo-400' 
                                : 'bg-slate-400/10 text-slate-400'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 line-clamp-2">{task.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('tasks')}
                  className="mt-4 w-full text-center py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all"
                >
                  Open Full Task Manager
                </button>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">Interactive Sandbox Command Shortcuts</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button 
                  onClick={() => { 
                    addToast('Freed 1.2GB of RAM caching overhead.', 'success');
                    setRamUsage(prev => Math.max(45, prev - 15));
                    confetti({ particleCount: 30 });
                  }}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-left hover:border-indigo-500/40 transition-all group"
                >
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">Purge Cluster Cache</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Instantly recycle stagnant nodes</p>
                </button>
                
                <button 
                  onClick={() => { 
                    addToast('Backup pipeline initialized.', 'info');
                    setAnimatedChartData(CHART_DATA_PRESETS.weekly);
                  }}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-left hover:border-indigo-500/40 transition-all group"
                >
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">Sync Cloud DB</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Initiate cold backup schemas</p>
                </button>

                <button 
                  onClick={() => { 
                    addToast('Simulating network surge spike.', 'error');
                    setNetworkSpeed(389.2);
                  }}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-left hover:border-indigo-500/40 transition-all group"
                >
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">Load Test Host</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Simulate peak user request spike</p>
                </button>

                <button 
                  onClick={() => { 
                    addToast('Diagnostic reports exported to local workspace', 'success');
                    confetti({ particleCount: 50, spread: 60 });
                  }}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-left hover:border-indigo-500/40 transition-all group"
                >
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">Generate Audit Report</h4>
                  <p className="text-[10px] text-slate-505 dark:text-slate-400 mt-1">Publish dynamic PDF operational log</p>
                </button>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="p-6 flex-1 overflow-y-auto">
            <TaskBoard 
              tasks={tasks}
              taskFilter={taskFilter}
              setTaskFilter={setTaskFilter}
              searchQuery={searchQuery}
              handleAddTask={handleAddTask}
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              newTaskPriority={newTaskPriority}
              setNewTaskPriority={setNewTaskPriority}
              newTaskCategory={newTaskCategory}
              setNewTaskCategory={setNewTaskCategory}
              handleUpdateTaskStatus={handleUpdateTaskStatus}
              handleDeleteTask={handleDeleteTask}
            />
          </div>
        )}

        {activeTab === 'ai-chat' && (
          <div className="p-6 flex-1 flex flex-col justify-between overflow-hidden">
            <AiChat 
              chatMessages={chatMessages}
              isAiTyping={isAiTyping}
              chatInput={chatInput}
              setChatInput={setChatInput}
              handleSendChat={handleSendChat}
              handleQuickAction={handleQuickAction}
            />
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="p-6 flex-1 overflow-y-auto">
            <TelemetryMetrics 
              chartPreset={chartPreset}
              setChartPreset={setChartPreset}
              animatedChartData={animatedChartData}
              cpuLoad={cpuLoad}
              ramUsage={ramUsage}
              networkSpeed={networkSpeed}
              addToast={addToast}
            />
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="p-6 space-y-6 flex-1 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Sandbox Shell Prompt</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Simulated command console line interface. Directly script with your project structure.</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  ROOT STATUS: ESTABLISHED
                </span>
              </div>

              <div className="bg-slate-955 text-slate-200 p-6 rounded-2xl font-mono text-xs border border-slate-800 shadow-2xl space-y-2 h-[400px] overflow-y-auto">
                {terminalHistory.map((line, i) => (
                  <div key={i} className="min-h-[1rem] whitespace-pre-wrap">
                    {line.startsWith('aether@host:~$') ? (
                      <span className="text-indigo-400">{line}</span>
                    ) : line.startsWith('Available commands') ? (
                      <span className="text-cyan-400">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleTerminalCommand} className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-xs font-mono font-bold text-indigo-400 shrink-0 pl-2">aether@host:~$</span>
              <input 
                type="text"
                placeholder="Type help, sysinfo, clear, tasks, optimize, benchmark..."
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 text-xs bg-transparent text-white focus:outline-none font-mono"
              />
              <button 
                type="submit"
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-mono transition-colors shadow-md shadow-indigo-600/20 shrink-0"
              >
                EXECUTE
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}