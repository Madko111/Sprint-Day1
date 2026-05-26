import { useMemo, useState } from 'react';
import {
  ShieldCheck,
  Layers,
  Database,
  Lock,
  Sparkles,
  Users,
  CheckCircle2,
  Mail,
  Briefcase,
  Star,
  Cpu,
} from 'lucide-react';
import { supabase, hasSupabaseConfig } from './supabaseClient';
import { cn } from './lib/utils';

const roles = ['Operations', 'Support', 'Revenue', 'Engineering', 'Other'];

const features = [
  {
    title: 'Ops-ready templates',
    description: 'Launch approval flows, issue triage boards, and validation dashboards in minutes.',
    icon: Layers,
  },
  {
    title: 'Secure access control',
    description: 'Role-based permissions and audit trails built for internal tooling governance.',
    icon: ShieldCheck,
  },
  {
    title: 'Data connectors',
    description: 'Connect databases, APIs, and spreadsheets without writing glue code.',
    icon: Database,
  },
  {
    title: 'Workflow automation',
    description: 'Embed buttons, rules, and approvals directly into internal apps.',
    icon: Sparkles,
  },
  {
    title: 'Audit logging',
    description: 'Track every change and approve action across your team workspace.',
    icon: Lock,
  },
  {
    title: 'Fast deployment',
    description: 'Build and ship internal tools faster than custom dashboards or Retool rigs.',
    icon: Cpu,
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$99',
    description: 'Shared workspace for small ops teams.',
    bullets: ['1 workspace', 'Unlimited forms', 'Basic connectors', 'Email support'],
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$249',
    description: 'Best for scaling ops teams with governance.',
    bullets: ['3 workspaces', 'Role-based access', 'Audit logs', 'API connectors'],
    highlight: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    description: 'Enterprise-grade controls with SSO and onboarding.',
    bullets: ['Custom roles', 'SSO & provisioning', 'Dedicated support', 'Premium onboarding'],
    highlight: false,
  },
];

const faqs = [
  {
    question: 'Can Stacklet connect to our existing database or API?',
    answer:
      'Yes. Stacklet is designed for internal tools and supports database and API connectors so teams can build workflows over live operational data.',
  },
  {
    question: 'How is access controlled for internal apps?',
    answer:
      'You can assign roles, restrict access by team, and enforce audit logging for every action taken inside Stacklet apps.',
  },
  {
    question: 'Why is this cheaper than Retool?',
    answer:
      'Stacklet uses an operations-focused pricing model with fewer per-seat engineering fees and built-in governance for internal teams.',
  },
  {
    question: 'Do we need engineers to maintain Stacklet apps?',
    answer:
      'No. Non-technical operators can assemble workflows, forms, and dashboards using templates without writing code.',
  },
  {
    question: 'What happens if my email is already on the waitlist?',
    answer: 'The form will give a clear message so you know you are already signed up without exposing raw database errors.',
  },
];

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function App() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const isValid = useMemo(() => validateEmail(email), [email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) {
      setStatus('error');
      setMessage('Введите корректный email.');
      return;
    }

    if (!hasSupabaseConfig()) {
      setStatus('error');
      setMessage('Supabase configuration не настроена.');
      setButtonDisabled(true);
      setTimeout(() => setButtonDisabled(false), 3000);
      return;
    }

    setStatus('loading');
    setMessage('Отправка...');

    const { error } = await supabase!.from('waitlist').insert([
      { email: email.trim().toLowerCase(), role, company: company.trim() || null },
    ]);

    if (error) {
      const duplicate =
        error.code === '23505' ||
        error.details?.toLowerCase().includes('already exists') ||
        error.message?.toLowerCase().includes('duplicate');

      if (duplicate) {
        setStatus('error');
        setMessage('Вы уже в списке ожидания.');
      } else {
        setStatus('error');
        setMessage('Произошла ошибка. Попробуйте ещё раз.');
      }
      setButtonDisabled(true);
      setTimeout(() => setButtonDisabled(false), 3000);
      return;
    }

    setStatus('success');
    setMessage('Спасибо! Ваш адрес добавлен в список.');
    setEmail('');
    setCompany('');
    setRole(roles[0]);
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6 lg:px-8">
          <div className="text-xl font-bold tracking-tight">Stacklet</div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            Join waitlist
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero */}
        <section id="hero" className="relative py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-secondary/15 border border-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                No-code internal tooling
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                Build secure internal tools without engineering runway.
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
                Stacklet gives ops, support, and GTM teams a ready-made editor for approval flows, dashboards,
                and data entry tools — with connectors, governance, and audit logs built in.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#waitlist"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
                >
                  Join waitlist
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border-2 border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-muted hover:border-muted-foreground/20 transition-all"
                >
                  See features
                </a>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-border bg-card/50 backdrop-blur-sm p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-secondary font-semibold mb-2">Built for</div>
                  <h2 className="text-2xl font-bold text-foreground">Operations and revenue teams</h2>
                </div>
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Templates, role policies, connectors, and approvals to deploy internal tools in hours.
              </p>
              <div className="flex items-center gap-2 text-sm text-secondary font-medium">
                <CheckCircle2 className="h-5 w-5" />
                <span>Ops-ready governance out of the box</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20">
          <div className="space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-secondary/15 border border-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Everything your internal tool needs.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm p-6 shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15 border border-accent/20 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20">
          <div className="space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-secondary/15 border border-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Choose the plan that matches your ops stage.
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative rounded-xl border-2 bg-card/50 backdrop-blur-sm p-8 shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:-translate-y-1',
                  plan.highlight
                    ? 'border-accent shadow-accent/20 ring-2 ring-accent/30'
                    : 'border-border hover:border-primary/30'
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-accent border border-accent/30 px-3 py-1 text-xs font-semibold text-accent-foreground shadow-lg">
                      Most popular
                    </span>
                  </div>
                )}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <div className="text-4xl font-bold text-foreground">{plan.price}<span className="text-lg text-muted-foreground">/mo</span></div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.bullets.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#waitlist"
                    className={cn(
                      'inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all hover:scale-105',
                      plan.highlight
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30'
                        : 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/25 hover:bg-secondary/90'
                    )}
                  >
                    {plan.highlight ? 'Join Growth waitlist' : 'Join waitlist'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20">
          <div className="space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-secondary/15 border border-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Questions from teams evaluating internal tooling.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-xl border-2 border-border bg-card/50 backdrop-blur-sm p-6 shadow-lg shadow-black/5 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/30">
                <h3 className="mb-3 text-lg font-semibold text-foreground">{item.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="py-20">
          <div className="space-y-4 mb-12">
            <div className="inline-block rounded-lg bg-secondary/15 border border-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
              Waitlist
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              Get early access to Stacklet.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join the waitlist to help shape the first internal tooling workspace for ops teams.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="flex h-12 w-full rounded-lg border-2 border-input bg-card/50 backdrop-blur-sm px-12 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium text-foreground">
                  Role
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="flex h-12 w-full rounded-lg border-2 border-input bg-card/50 backdrop-blur-sm px-12 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {roles.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-foreground">
                  Company <span className="text-muted-foreground">(optional)</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp"
                    className="flex h-12 w-full rounded-lg border-2 border-input bg-card/50 backdrop-blur-sm px-12 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={buttonDisabled || status === 'loading'}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === 'loading' ? 'Sending...' : 'Join waitlist'}
              </button>

              {message && (
                <p className={cn('text-sm font-medium', status === 'success' ? 'text-secondary' : 'text-destructive')}>
                  {message}
                </p>
              )}
              {!hasSupabaseConfig() && (
                <p className="text-sm text-destructive">
                  Configure Supabase keys in <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">.env</code> to enable submissions.
                </p>
              )}
            </form>

            <div className="rounded-xl border-2 border-accent/30 bg-accent/10 backdrop-blur-sm p-6 space-y-4 shadow-lg shadow-accent/10">
              <div className="flex items-start gap-3">
                <Star className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Audit-ready waitlist</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every signup is stored in Supabase with an insert-only policy for secure onboarding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            Stacklet © 2026 — Built for operators who need internal tools without engineering queue.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
