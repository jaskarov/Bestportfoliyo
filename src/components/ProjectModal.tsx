import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Activity,
  Sparkles,
  AlertTriangle,
  Stethoscope,
  Copy,
  RotateCcw,
  Calendar,
  SquareTerminal,
  FileCode2,
} from 'lucide-react';
import type { Project } from '../data/projects';
import { translateUI, type Language } from '../localization';

/* ---------------------------------- Shared JSON renderer ---------------------------------- */

const JsonValue = ({ value, indent }: { value: unknown; indent: number }) => {
  const pad = '  '.repeat(indent);
  const padClose = '  '.repeat(Math.max(0, indent - 1));

  if (value === null) return <span className="text-gray-500">null</span>;
  if (typeof value === 'boolean')
    return <span className="text-amber-400">{String(value)}</span>;
  if (typeof value === 'number')
    return <span className="text-amber-300">{String(value)}</span>;
  if (typeof value === 'string')
    return <span className="text-emerald-400">"{value}"</span>;

  if (Array.isArray(value)) {
    return (
      <span>
        [{'\n'}
        {value.map((v, i) => (
          <span key={i}>
            {pad}
            <JsonValue value={v} indent={indent + 1} />
            {i < value.length - 1 ? ',' : ''}
            {'\n'}
          </span>
        ))}
        {padClose}]
      </span>
    );
  }

  const entries = Object.entries(value as Record<string, unknown>);
  return (
    <span>
      {'{'}{'\n'}
      {entries.map(([k, v], i) => (
        <span key={k}>
          {pad}
          <span className="text-cyan-300">"{k}"</span>
          <span className="text-white/40">: </span>
          <JsonValue value={v} indent={indent + 1} />
          {i < entries.length - 1 ? ',' : ''}
          {'\n'}
        </span>
      ))}
      {padClose}{'}'}
    </span>
  );
};

/* ---------------------------------- API Explorer Demo ---------------------------------- */

interface Endpoint {
  method: 'GET' | 'POST' | 'PATCH';
  path: string;
  description: string;
  status: number;
  latency: string;
  response: Record<string, unknown>;
}

const apiEndpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/users',
    description: 'Fetch paginated user list',
    status: 200,
    latency: '47ms',
    response: {
      data: [
        { id: 1, name: 'Davron K.', role: 'admin', active: true },
        { id: 2, name: 'Malika R.', role: 'editor', active: true },
      ],
      meta: { total: 128, page: 1, per_page: 2 },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/auth/token',
    description: 'Issue JWT access token',
    status: 200,
    latency: '32ms',
    response: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…',
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'read:users write:users',
    },
  },
  {
    method: 'GET',
    path: '/api/v1/analytics/realtime',
    description: 'Live analytics snapshot',
    status: 200,
    latency: '89ms',
    response: {
      active_sessions: 341,
      requests_per_min: 1287,
      avg_latency_ms: 47,
      error_rate: 0.02,
      uptime: '99.98%',
    },
  },
];

const methodColors: Record<Endpoint['method'], string> = {
  GET: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  POST: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  PATCH: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/30',
};

const sandboxPresets = [
  {
    name: 'Fetch users',
    source: `// Try the SDK against the mock production API
const response = await api.get('/api/v1/users');

console.log(response.status);
console.log(response.data);`,
  },
  {
    name: 'Create auth token',
    source: `const response = await api.post('/api/v1/auth/token', {
  email: 'client@example.com',
  password: '••••••••'
});

console.log(response.data);`,
  },
  {
    name: 'Read live analytics',
    source: `const response = await api.get('/api/v1/analytics/realtime');

console.log({
  active: response.data.active_sessions,
  uptime: response.data.uptime
});`,
  },
];

const ApiExplorerDemo = () => {
  const [view, setView] = useState<'requests' | 'sandbox'>('requests');
  const [selected, setSelected] = useState<Endpoint | null>(null);
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle');
  const [lines, setLines] = useState(0);
  const [preset, setPreset] = useState(0);
  const [source, setSource] = useState(sandboxPresets[0].source);
  const [sandboxPhase, setSandboxPhase] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const totalRef = useRef(0);
  const runRef = useRef((_: Endpoint) => {});

  const run = (ep: Endpoint) => {
    setSelected(ep);
    setPhase('loading');
    setLines(0);
    const serialized = JSON.stringify(ep.response, null, 2);
    totalRef.current = serialized.split('\n').length;

    setTimeout(() => {
      setPhase('done');
      let current = 0;
      const timer = setInterval(() => {
        current += 2;
        setLines(current);
        if (current >= totalRef.current) clearInterval(timer);
      }, 40);
    }, 700);
  };

  runRef.current = run;

  // Auto-run the first request so the demo feels alive immediately.
  useEffect(() => {
    const timer = setTimeout(() => runRef.current(apiEndpoints[0]), 700);
    return () => clearTimeout(timer);
  }, []);

  const selectPreset = (index: number) => {
    setPreset(index);
    setSource(sandboxPresets[index].source);
    setSandboxPhase('idle');
    setTerminalOutput([]);
  };

  const executeSandbox = () => {
    setSandboxPhase('running');
    setTerminalOutput(['$ compiling secure sandbox…']);

    // This deliberately parses the supported SDK call instead of eval'ing
    // arbitrary code, keeping the production page safe from injected scripts.
    const call = source.match(/api\.(get|post|patch)\s*\(\s*['"]([^'"]+)['"]/i);
    setTimeout(() => {
      if (!call) {
        setSandboxPhase('error');
        setTerminalOutput([
          '$ compilation failed',
          'SandboxError: use api.get(), api.post(), or api.patch() with a supported route.',
          'Tip: choose a preset, edit it, then press Run code.',
        ]);
        return;
      }

      const method = call[1].toUpperCase();
      const path = call[2];
      const endpoint = apiEndpoints.find(
        (item) => item.method === method && item.path === path,
      );

      if (!endpoint) {
        setSandboxPhase('error');
        setTerminalOutput([
          '$ sandbox started',
          `→ ${method} ${path}`,
          '404 RouteNotFound',
          'Available routes are listed in the Request Builder tab.',
        ]);
        return;
      }

      setSandboxPhase('done');
      setTerminalOutput([
        '$ sandbox started (isolated runtime)',
        `→ ${method} ${path}`,
        `✓ ${endpoint.status} OK  ${endpoint.latency}`,
        '',
        JSON.stringify(endpoint.response, null, 2),
        '',
        'Process finished with exit code 0',
      ]);
    }, 850);
  };

  return (
    <div className="h-full">
      {/* Demo mode tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-black/30 border border-white/10 mb-4 w-full sm:w-fit">
        <button
          onClick={() => setView('requests')}
          className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
            view === 'requests'
              ? 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/25'
              : 'text-white/40 border border-transparent hover:text-white/70'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Request Builder
        </button>
        <button
          onClick={() => setView('sandbox')}
          className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
            view === 'sandbox'
              ? 'bg-cyan-400/10 text-cyan-300 border border-cyan-400/25'
              : 'text-white/40 border border-transparent hover:text-white/70'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          Code Sandbox
        </button>
      </div>

      {view === 'requests' ? (
        <div className="flex flex-col md:flex-row gap-4 min-h-[310px]">
          {/* Endpoint list */}
          <div className="md:w-56 shrink-0 space-y-2">
            {apiEndpoints.map((ep) => (
              <button
                key={ep.path}
                onClick={() => run(ep)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selected?.path === ep.path
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37]/40'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${methodColors[ep.method]}`}
                  >
                    {ep.method}
                  </span>
                </div>
                <p className="font-mono text-xs text-white/80 break-all">{ep.path}</p>
                <p className="text-[10px] text-white/40 mt-1">{ep.description}</p>
              </button>
            ))}
          </div>

          {/* Request console */}
          <div className="flex-1 rounded-xl bg-black/50 border border-white/10 overflow-hidden flex flex-col min-h-[280px]">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 text-xs text-white/40 font-mono">
                api-explorer — console
              </span>
            </div>

            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto">
              {phase === 'idle' && (
                <div className="h-full flex flex-col items-center justify-center text-white/30 gap-3">
                  <Play className="w-8 h-8" />
                  <p>Select an endpoint to execute a live request</p>
                </div>
              )}
              {phase === 'loading' && (
                <div className="space-y-2">
                  <p className="text-white/60">
                    <span className="text-[#D4AF37]">{selected?.method}</span>{' '}
                    {selected?.path}
                  </p>
                  <p className="text-white/40 flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-3 h-3 border-2 border-white/20 border-t-white/70 rounded-full"
                    />
                    Executing request…
                  </p>
                </div>
              )}
              {phase === 'done' && selected && (
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-white/60">
                      <span className="text-[#D4AF37]">{selected.method}</span> {selected.path}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                      {selected.status} OK
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 flex items-center gap-1">
                      <Activity className="w-3 h-3" /> {selected.latency}
                    </span>
                  </div>
                  <pre data-no-translate="true" className="whitespace-pre-wrap leading-relaxed">
                    {lines >= totalRef.current ? (
                      <JsonValue value={selected.response} indent={1} />
                    ) : (
                      <span className="text-white/70">
                        {JSON.stringify(selected.response, null, 2)
                          .split('\n')
                          .slice(0, lines)
                          .join('\n')}
                        <span className="animate-pulse text-[#D4AF37]">▍</span>
                      </span>
                    )}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid min-w-0 lg:grid-cols-[1.15fr,0.85fr] gap-4 min-h-[370px]">
          {/* Editable code area */}
          <div className="min-w-0 rounded-xl bg-[#09090B] border border-white/10 overflow-hidden flex flex-col">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/[0.025]">
              <div className="flex items-center gap-1.5 mr-auto">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-2 text-[10px] text-white/35 font-mono">sandbox.js</span>
              </div>
              <select
                value={preset}
                onChange={(event) => selectPreset(Number(event.target.value))}
                className="bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] text-white/60 focus:outline-none focus:border-cyan-400/40"
              >
                {sandboxPresets.map((item, index) => (
                  <option key={item.name} value={index} className="bg-[#121216]">
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                data-sound="success"
                onClick={executeSandbox}
                disabled={sandboxPhase === 'running'}
                className="px-3 py-1.5 rounded-lg bg-cyan-400 text-black text-[10px] font-bold flex items-center gap-1.5 hover:bg-cyan-300 disabled:opacity-50 transition-colors"
              >
                <Play className="w-3 h-3 fill-current" />
                {sandboxPhase === 'running' ? 'Running…' : 'Run code'}
              </button>
            </div>

            <div className="relative flex-1 min-h-[300px]">
              <div
                data-no-translate="true"
                className="absolute top-0 bottom-0 left-0 w-10 py-4 pr-2 text-right font-mono text-xs leading-6 text-white/15 border-r border-white/5 select-none"
              >
                {source.split('\n').map((_, index) => (
                  <div key={index}>{index + 1}</div>
                ))}
              </div>
              <textarea
                data-no-translate="true"
                value={source}
                onChange={(event) => setSource(event.target.value)}
                spellCheck={false}
                aria-label="Editable JavaScript sandbox"
                className="absolute inset-0 w-full h-full pl-14 pr-4 py-4 resize-none bg-transparent font-mono text-xs leading-6 text-white/80 caret-cyan-300 focus:outline-none selection:bg-cyan-400/20"
              />
            </div>
          </div>

          {/* Live terminal */}
          <div className="min-w-0 rounded-xl bg-black/60 border border-white/10 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.025]">
              <SquareTerminal className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-[10px] uppercase tracking-wider text-white/40">
                Live terminal
              </span>
              <span
                className={`ml-auto w-2 h-2 rounded-full ${
                  sandboxPhase === 'running'
                    ? 'bg-amber-400 animate-pulse'
                    : sandboxPhase === 'done'
                    ? 'bg-emerald-400'
                    : sandboxPhase === 'error'
                    ? 'bg-red-400'
                    : 'bg-white/20'
                }`}
              />
            </div>
            <pre
              data-no-translate="true"
              className="flex-1 p-4 font-mono text-[11px] leading-relaxed whitespace-pre-wrap overflow-auto text-white/65 min-h-[300px]"
            >
              {terminalOutput.length > 0 ? (
                terminalOutput.map((line, index) => (
                  <motion.span
                    key={`${line}-${index}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.045 }}
                    className={`block ${
                      line.startsWith('✓') || line.includes('exit code 0')
                        ? 'text-emerald-400'
                        : line.includes('Error') || line.startsWith('404')
                        ? 'text-red-400'
                        : line.startsWith('→')
                        ? 'text-cyan-300'
                        : ''
                    }`}
                  >
                    {line || ' '}
                  </motion.span>
                ))
              ) : (
                <span className="text-white/25">
                  {'// Edit the code, then press “Run code”\n// Supported SDK: api.get, api.post, api.patch'}
                </span>
              )}
              {sandboxPhase === 'running' && (
                <span className="inline-block text-cyan-300 animate-pulse">▍</span>
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------- Health AI Demo ---------------------------------- */

const symptomList = [
  'Fever',
  'Headache',
  'Fatigue',
  'Cough',
  'Chest Pain',
  'Dizziness',
  'Nausea',
  'Sore Throat',
];

interface Assessment {
  triage: string;
  triageColor: string;
  triageBg: string;
  conditions: { name: string; probability: number }[];
  recommendation: string;
}

const buildAssessment = (selected: string[]): Assessment => {
  const emergency = selected.some((s) => ['Chest Pain'].includes(s));
  const count = selected.length;

  if (emergency)
    return {
      triage: 'Urgent — See a Doctor Today',
      triageColor: 'text-red-400',
      triageBg: 'bg-red-400/10 border-red-400/30',
      conditions: [
        { name: 'Cardiovascular strain', probability: 62 },
        { name: 'Acute respiratory condition', probability: 21 },
        { name: 'Musculoskeletal issue', probability: 17 },
      ],
      recommendation:
        'Chest pain requires prompt evaluation. Visit the nearest clinic or emergency department.',
    };

  if (count >= 3)
    return {
      triage: 'Moderate — Consult Within 24h',
      triageColor: 'text-amber-400',
      triageBg: 'bg-amber-400/10 border-amber-400/30',
      conditions: [
        { name: 'Viral upper-respiratory infection', probability: 68 },
        { name: 'Seasonal flu', probability: 19 },
        { name: 'Stress-related fatigue', probability: 13 },
      ],
      recommendation:
        'Rest, hydrate, and monitor symptoms. Book a tele-consultation if symptoms persist beyond 48 hours.',
    };

  return {
    triage: 'Low — Self Care Recommended',
    triageColor: 'text-emerald-400',
    triageBg: 'bg-emerald-400/10 border-emerald-400/30',
    conditions: [
      { name: 'Mild viral infection', probability: 71 },
      { name: 'Sleep deficit / fatigue', probability: 18 },
      { name: 'Dehydration', probability: 11 },
    ],
    recommendation:
      'Symptoms appear mild. Rest, fluids, and OTC remedies should help. Re-check if they worsen.',
  };
};

const HealthAIDemo = ({ language }: { language: Language }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [phase, setPhase] = useState<'idle' | 'analyzing' | 'result'>('idle');
  const [result, setResult] = useState<Assessment | null>(null);

  const toggle = (s: string) =>
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const analyze = () => {
    if (selected.length === 0) return;
    setPhase('analyzing');
    setResult(null);
    setTimeout(() => {
      const assessment = buildAssessment(selected);
      setResult({
        ...assessment,
        triage: translateUI(assessment.triage, language),
        recommendation: translateUI(assessment.recommendation, language),
        conditions: assessment.conditions.map((condition) => ({
          ...condition,
          name: translateUI(condition.name, language),
        })),
      });
      setPhase('result');
    }, 1600);
  };

  const reset = () => {
    setSelected([]);
    setPhase('idle');
    setResult(null);
  };

  return (
    <div className="flex flex-col h-full">
      {phase !== 'result' ? (
        <>
          <p className="text-sm text-white/50 mb-4">
            Select patient symptoms, then run the AI triage engine:
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {symptomList.map((s) => (
              <button
                key={s}
                onClick={() => toggle(s)}
                className={`px-3 py-2 rounded-xl text-sm border transition-all ${
                  selected.includes(s)
                    ? 'bg-cyan-400/15 border-cyan-400/50 text-cyan-300'
                    : 'bg-white/[0.03] border-white/10 text-white/60 hover:border-white/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {phase === 'analyzing' ? (
            <div className="rounded-xl bg-cyan-400/5 border border-cyan-400/20 p-5 flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-6 h-6 rounded-full border-2 border-cyan-400/30 border-t-cyan-300 shrink-0"
              />
              <div>
                <p className="text-cyan-300 text-sm font-medium">
                  {language === 'UZ'
                    ? `${selected.length} ta alomat tahlil qilinmoqda…`
                    : language === 'RU'
                    ? `Анализируем симптомов: ${selected.length}…`
                    : `Analyzing ${selected.length} symptom${selected.length > 1 ? 's' : ''}…`}
                </p>
                <p className="text-white/40 text-xs mt-0.5">
                  Cross-referencing 40k+ clinical patterns
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={analyze}
              disabled={selected.length === 0}
              className="self-start px-6 py-3 rounded-xl bg-cyan-400 text-black font-semibold text-sm flex items-center gap-2 disabled:opacity-30 hover:bg-cyan-300 transition-colors"
            >
              <Stethoscope className="w-4 h-4" />
              Run AI Diagnosis
            </button>
          )}
        </>
      ) : (
        result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className={`rounded-xl border p-4 ${result.triageBg}`}>
              <p className={`font-semibold ${result.triageColor} flex items-center gap-2`}>
                <AlertTriangle className="w-4 h-4" />
                {result.triage}
              </p>
            </div>

            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
                Probable conditions
              </p>
              <div className="space-y-2">
                {result.conditions.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">{c.name}</span>
                      <span className="text-cyan-300 font-mono">{c.probability}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.probability}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="text-sm text-white/60 bg-white/[0.03] border border-white/10 rounded-xl p-4">
              {result.recommendation}
            </p>

            <button
              onClick={reset}
              className="flex items-center gap-2 text-sm text-white/50 hover:text-cyan-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Start new assessment
            </button>
          </motion.div>
        )
      )}
    </div>
  );
};

/* ---------------------------------- Marketing AI Demo ---------------------------------- */

type ContentType = 'social' | 'email' | 'product';

const contentBank: Record<ContentType, { label: string; output: string[] }> = {
  social: {
    label: 'Social Media Post',
    output: [
      'Your workflow deserves an upgrade. Meet automation that thinks ahead — built with AI, designed for humans. Tap the link to see what your team could be doing instead. #Productivity #AI',
      'We analyzed 10,000 tasks. The pattern? The best teams automate the boring stuff. Here are the 5 workflows worth automating this week — thread below.',
      'POV: It is 9:00 AM and your content calendar is already done. Not magic — just Marketing AI. Free trial in bio.',
    ],
  },
  email: {
    label: 'Email Subject Line',
    output: [
      'Your competitors already did this (you have 48 hours)',
      'A 10x content engine, explained in 90 seconds',
      '[First Name], your Q1 marketing plan just got easier',
    ],
  },
  product: {
    label: 'Product Description',
    output: [
      'Meet the studio that never sleeps. The Marketing AI Generator transforms a single sentence into an entire campaign — on-brand visuals, scroll-stopping copy, and platform-perfect formatting. Write less. Launch more.',
      'Crafted for teams that move fast: one brief in, dozens of publish-ready assets out. Every output learns from your brand voice, so tone stays unmistakably you.',
      'Stop staring at blank pages. From first draft to final export in under a minute — with analytics that close the loop on what actually converts.',
    ],
  },
};

const MarketingAIDemo = ({ language }: { language: Language }) => {
  const [type, setType] = useState<ContentType>('social');
  const [generating, setGenerating] = useState(false);
  const [shown, setShown] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = (t: ContentType = type) => {
    setGenerating(true);
    setShown('');
    const variantLabel = language === 'RU' ? 'Вариант' : 'Variant';
    const text = contentBank[t].output
      .map((variant, i) => `${variantLabel} ${i + 1} —\n${translateUI(variant, language)}`)
      .join('\n\n');
    let i = 0;
    const timer = setInterval(() => {
      i += 4;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        setGenerating(false);
      }
    }, 24);
  };

  const copy = () => {
    navigator.clipboard?.writeText(shown).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-2 mb-5">
        {(Object.keys(contentBank) as ContentType[]).map((k) => (
          <button
            key={k}
            onClick={() => {
              setType(k);
              setShown('');
              setGenerating(false);
            }}
            className={`px-4 py-2 rounded-xl text-sm border transition-all ${
              type === k
                ? 'bg-purple-500/15 border-purple-400/50 text-purple-300'
                : 'bg-white/[0.03] border-white/10 text-white/60 hover:border-white/30'
            }`}
          >
            {contentBank[k].label}
          </button>
        ))}
      </div>

      <div className="flex-1 rounded-xl bg-black/40 border border-white/10 p-4 font-mono text-xs leading-relaxed overflow-y-auto min-h-[220px] max-h-[300px]">
        {shown ? (
          <span className="whitespace-pre-wrap text-white/80">
            {shown}
            {generating && <span className="animate-pulse text-purple-300">▍</span>}
          </span>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-white/30 gap-3">
            <Sparkles className="w-8 h-8" />
            <p>Pick a content type and generate 3 AI variants</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => generate()}
          disabled={generating}
          className="px-6 py-3 rounded-xl bg-purple-500 text-white font-semibold text-sm flex items-center gap-2 disabled:opacity-40 hover:bg-purple-400 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          {generating ? 'Generating…' : 'Generate Variants'}
        </button>
        {shown && !generating && (
          <button
            onClick={copy}
            className="px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"
          >
            {copied ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  );
};

/* ---------------------------------- Modal ---------------------------------- */

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onBookCall: () => void;
  language: Language;
}

const demoComponents: Record<Project['id'], {
  title: string;
  disclaimer: string;
  render: (language: Language) => React.ReactNode;
}> = {
  'api-explorer': {
    title: 'Live Console Simulation',
    disclaimer: 'Interactive simulation of the production console',
    render: () => <ApiExplorerDemo />,
  },
  'health-ai': {
    title: 'AI Triage Simulation',
    disclaimer: 'Demo only — not medical advice',
    render: (language) => <HealthAIDemo language={language} />,
  },
  'marketing-ai': {
    title: 'Content Engine Simulation',
    disclaimer: 'Pre-generated output demonstrating real model behavior',
    render: (language) => <MarketingAIDemo language={language} />,
  },
};

export const ProjectModal = ({
  project,
  onClose,
  onBookCall,
  language,
}: ProjectModalProps) => {
  // Lock body scroll + escape key
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[calc(100vw-2rem)] lg:max-w-4xl max-h-[calc(100dvh-2rem)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-3xl bg-[#121216] border border-white/10 shadow-2xl"
            style={{ boxShadow: `0 0 120px ${project.color}25` }}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 px-6 md:px-8 py-5 border-b border-white/10 backdrop-blur-xl bg-[#121216]/90 flex items-start justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <project.icon className="w-6 h-6" style={{ color: project.color }} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ color: project.color }}>
                    {project.category}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Live Demo */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                        style={{ backgroundColor: project.color }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2.5 w-2.5"
                        style={{ backgroundColor: project.color }}
                      />
                    </span>
                    <h4 className="font-semibold text-white">
                      {demoComponents[project.id].title}
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-white/30">
                    {demoComponents[project.id].disclaimer}
                  </span>
                </div>
                <div
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-5"
                  style={{ boxShadow: `inset 0 0 60px ${project.color}08` }}
                >
                  {demoComponents[project.id].render(language)}
                </div>
              </div>

              {/* Overview + features */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Overview</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {project.longDescription}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-5">
                    {project.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl bg-white/[0.03] border border-white/10 p-3 text-center"
                      >
                        <p className="text-lg font-bold" style={{ color: project.color }}>
                          {s.value}
                        </p>
                        <p className="text-[10px] text-white/40 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Key Features</h4>
                  <ul className="space-y-2.5">
                    {project.features.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex items-start gap-2.5 text-sm text-white/60"
                      >
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: project.color }}
                        />
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ backgroundColor: `${project.color}15`, color: project.color }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Conversion actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookCall();
                  }}
                  className="flex-1 py-4 rounded-xl btn-primary text-black font-semibold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Discuss This Project
                </button>
                <a
                  href="#calculator"
                  onClick={onClose}
                  className="flex-1 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                  Estimate a Similar Build
                </a>
                <a
                  href={project.repo}
                  className="py-4 px-6 rounded-xl bg-white/[0.05] border border-white/10 text-white/70 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Repo
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
