import React from 'react';
import { TrendingUp, ArrowUpRight, DollarSign, Cpu, Database, Zap } from 'lucide-react';

export default function TelemetryMetrics({
  chartPreset,
  setChartPreset,
  animatedChartData,
  cpuLoad,
  ramUsage,
  networkSpeed,
  addToast
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Analytical Performance Dash</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">In-depth telemetry analysis charts and custom mock system database statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Containers</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">48 / 50</h3>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-2">
            <ArrowUpRight className="h-3 w-3" /> 98% efficiency status
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Saved Latency</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">1,420 ms</h3>
          <span className="text-[10px] text-indigo-500 font-bold flex items-center gap-1 mt-2">
            <ArrowUpRight className="h-3 w-3" /> Node cache layer active
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Proxy Requests</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">84.2 K</h3>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 mt-2">
            <ArrowUpRight className="h-3 w-3" /> +12% increase weekly
          </span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Overheads</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">$24.80</h3>
          <span className="text-[10px] text-slate-404 font-bold flex items-center gap-1 mt-2">
            <DollarSign className="h-3 w-3" /> Localized proxy server
          </span>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">System Operation Cycles</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Interactive cluster telemetry chart analyzer</p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {['live', 'weekly', 'monthly'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => { setChartPreset(preset); addToast(`Chart timeframe updated to ${preset}`, 'info'); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    chartPreset === preset 
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                      : 'text-slate-505 dark:text-slate-404 hover:text-slate-800 dark:hover:text-slate-200'
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
                <linearGradient id="chart-grad-metrics" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path 
                d={`M 0 256 ${animatedChartData.map((d, i) => `L ${(i / (animatedChartData.length - 1)) * 500} ${256 - (d / Math.max(...animatedChartData)) * 180}`).join(' ')} L 500 256 Z`}
                fill="url(#chart-grad-metrics)"
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
                  <div className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-900 group-hover:scale-150 transition-transform cursor-pointer shadow-lg shadow-indigo-500/50"></div>
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
          <span className="text-[10px] text-slate-400 font-mono">Updated live via telemetry websocket</span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Load Balance Factor</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Simulated micro-cluster network bandwidth routing distribution</p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">
            Avg: 74.2%
          </span>
        </div>

        <div className="h-48 flex items-end justify-between gap-2.5 pt-4">
          {[60, 45, 90, 80, 55, 75, 95, 40, 68, 85, 92, 70].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {val}%
              </div>
              <div 
                className="w-full rounded-t-lg bg-indigo-600 dark:bg-indigo-500 group-hover:bg-cyan-500 transition-all duration-300"
                style={{ height: `${val}%` }}
              ></div>
              <span className="text-[10px] font-mono text-slate-500">N{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}