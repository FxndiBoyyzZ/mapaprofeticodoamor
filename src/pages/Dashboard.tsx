import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDashboardAuth } from "@/hooks/useDashboardAuth";
import localAnalytics, { QuizEvent } from "@/lib/localAnalytics";
import { 
  calculateFunnelSteps, 
  calculateDailyMetrics, 
  calculateProfileDistribution 
} from "@/lib/dashboardUtils";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  RefreshCw, LogOut, TrendingUp, Users, CheckCircle, 
  ShoppingCart, DollarSign, Calendar 
} from "lucide-react";

const COLORS = ['#3F51B5', '#7E57C2', '#F2C94C', '#4facfe', '#f093fb'];

const Dashboard = () => {
  const { isAuthenticated, loading, logout } = useDashboardAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState<QuizEvent[]>([]);
  const [dateFilter, setDateFilter] = useState<'today' | '7days' | '30days'>('7days');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = () => {
    setIsRefreshing(true);
    
    const now = new Date();
    let startDate = new Date();
    
    if (dateFilter === 'today') {
      startDate.setHours(0, 0, 0, 0);
    } else if (dateFilter === '7days') {
      startDate.setDate(now.getDate() - 7);
    } else if (dateFilter === '30days') {
      startDate.setDate(now.getDate() - 30);
    }

    const filteredEvents = localAnalytics.getEvents({ startDate });
    setEvents(filteredEvents);
    
    setTimeout(() => setIsRefreshing(false), 300);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, dateFilter]);

  // Auto-refresh every 60s
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      loadData();
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated, dateFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }

  // Calculations
  const quizStarted = events.filter(e => e.event_name === 'quiz_start').length;
  const quizCompleted = events.filter(e => e.event_name === 'quiz_complete').length;
  const completionRate = quizStarted > 0 ? (quizCompleted / quizStarted) * 100 : 0;
  const checkoutClicks = events.filter(e => e.event_name === 'InitiateCheckout').length;
  const purchases = events.filter(e => e.event_name === 'Purchase').length;

  const funnelSteps = calculateFunnelSteps(events);
  const dailyMetrics = calculateDailyMetrics(events, dateFilter === '30days' ? 30 : 7);
  const tempoDistribution = calculateProfileDistribution(events, 'tempo_espiritual');
  const perfilDistribution = calculateProfileDistribution(events, 'perfil_amor');

  // Drop-off table data
  const dropOffData = funnelSteps
    .filter(step => step.dropped > 0)
    .sort((a, b) => b.dropRate - a.dropRate);

  const handleLogout = () => {
    logout();
    navigate("/dashboard/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Dashboard Analytics - Mapa Profético</title>
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-primary mb-1">📊 Dashboard Analytics</h1>
              <p className="text-sm text-text-muted">Mapa Profético Amoroso</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as any)}
                className="h-10 px-4 rounded-full border border-border bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="today">Hoje</option>
                <option value="7days">Últimos 7 dias</option>
                <option value="30days">Últimos 30 dias</option>
              </select>
              
              <Button
                onClick={loadData}
                variant="outline"
                size="sm"
                className="rounded-full"
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>

              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="rounded-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary opacity-20" />
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-text-muted mb-1">Iniciaram o Quiz</p>
            <h2 className="text-primary text-3xl font-bold">{quizStarted}</h2>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-lilac opacity-20" />
              <TrendingUp className="w-5 h-5 text-lilac" />
            </div>
            <p className="text-sm text-text-muted mb-1">Concluíram</p>
            <h2 className="text-lilac text-3xl font-bold">{quizCompleted}</h2>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-golden opacity-20" />
            </div>
            <p className="text-sm text-text-muted mb-1">Taxa de Finalização</p>
            <h2 className="text-golden text-3xl font-bold">{completionRate.toFixed(1)}%</h2>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8 text-primary opacity-20" />
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-text-muted mb-1">Cliques "Desbloquear"</p>
            <h2 className="text-primary text-3xl font-bold">{checkoutClicks}</h2>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-primary/5 to-lilac/5">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-primary opacity-20" />
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-text-muted mb-1">Conversões (Purchase)</p>
            <h2 className="text-primary text-3xl font-bold">{purchases}</h2>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Funnel Chart */}
          <Card className="p-6">
            <h3 className="text-primary-dark mb-4">Funil de Etapas do Quiz</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelSteps} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3F51B5" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-xs text-text-muted">
              Número de usuários em cada etapa do quiz
            </div>
          </Card>

          {/* Daily Metrics Line Chart */}
          <Card className="p-6">
            <h3 className="text-primary-dark mb-4">Evolução Temporal</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="quiz_start" stroke="#3F51B5" name="Iniciaram" strokeWidth={2} />
                <Line type="monotone" dataKey="quiz_complete" stroke="#7E57C2" name="Concluíram" strokeWidth={2} />
                <Line type="monotone" dataKey="initiate_checkout" stroke="#F2C94C" name="Checkout" strokeWidth={2} />
                <Line type="monotone" dataKey="purchase" stroke="#4facfe" name="Purchase" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Drop-off Table */}
        <Card className="p-6 mb-8">
          <h3 className="text-primary-dark mb-4">Abandono por Etapa</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-text-primary">Etapa</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">Abandonaram</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">% Abandono</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-text-primary">% Retenção</th>
                </tr>
              </thead>
              <tbody>
                {dropOffData.map((step, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm text-text-secondary">{step.name}</td>
                    <td className="py-3 px-4 text-sm text-right font-medium text-destructive">{step.dropped}</td>
                    <td className="py-3 px-4 text-sm text-right font-medium text-destructive">{step.dropRate}%</td>
                    <td className="py-3 px-4 text-sm text-right font-medium text-primary">{step.retention}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Profile Distribution Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-primary-dark mb-4">Distribuição: Tempo Espiritual</h3>
            {tempoDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={tempoDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name} (${(Number(percent) * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tempoDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-text-muted text-center py-8">Sem dados ainda</p>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-primary-dark mb-4">Distribuição: Perfil de Amor</h3>
            {perfilDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={perfilDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) => `${name} (${(Number(percent) * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {perfilDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-text-muted text-center py-8">Sem dados ainda</p>
            )}
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-text-muted">
            Última atualização: {new Date().toLocaleString('pt-BR')}
            {' • '}
            Total de eventos: {events.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
