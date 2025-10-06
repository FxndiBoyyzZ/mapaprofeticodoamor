import { QuizEvent } from './localAnalytics';

export interface FunnelStep {
  name: string;
  count: number;
  percentage: number;
  retention: number;
  dropped: number;
  dropRate: number;
}

export interface DailyMetric {
  date: string;
  quiz_start: number;
  quiz_complete: number;
  initiate_checkout: number;
  purchase: number;
}

export const calculateFunnelSteps = (events: QuizEvent[]): FunnelStep[] => {
  const sessions = new Set<string>();
  const stepSessions: { [key: string]: Set<string> } = {
    started: new Set(),
    step1: new Set(),
    step2: new Set(),
    step3: new Set(),
    step4: new Set(),
    step5: new Set(),
    completed: new Set(),
  };

  events.forEach(event => {
    if (!event.session_id) return;

    if (event.event_name === 'quiz_start') {
      stepSessions.started.add(event.session_id);
    }
    if (event.event_name === 'quiz_step' && event.step) {
      if (event.step >= 1) stepSessions.step1.add(event.session_id);
      if (event.step >= 2) stepSessions.step2.add(event.session_id);
      if (event.step >= 3) stepSessions.step3.add(event.session_id);
      if (event.step >= 4) stepSessions.step4.add(event.session_id);
      if (event.step >= 5) stepSessions.step5.add(event.session_id);
    }
    if (event.event_name === 'quiz_complete') {
      stepSessions.completed.add(event.session_id);
    }
  });

  const total = stepSessions.started.size;
  const stepCounts = [
    { name: 'Iniciaram o Quiz', count: stepSessions.started.size },
    { name: 'Responderam Q1', count: stepSessions.step1.size },
    { name: 'Responderam Q2', count: stepSessions.step2.size },
    { name: 'Responderam Q3', count: stepSessions.step3.size },
    { name: 'Responderam Q4', count: stepSessions.step4.size },
    { name: 'Responderam Q5', count: stepSessions.step5.size },
    { name: 'Finalizaram', count: stepSessions.completed.size },
  ];

  return stepCounts.map((step, index) => {
    const previousCount = index > 0 ? stepCounts[index - 1].count : step.count;
    const retention = previousCount > 0 ? (step.count / previousCount) * 100 : 100;
    const percentage = total > 0 ? (step.count / total) * 100 : 0;
    const dropped = previousCount - step.count;
    const dropRate = previousCount > 0 ? (dropped / previousCount) * 100 : 0;

    return {
      name: step.name,
      count: step.count,
      percentage: Math.round(percentage * 10) / 10,
      retention: Math.round(retention * 10) / 10,
      dropped: Math.max(0, dropped),
      dropRate: Math.round(dropRate * 10) / 10,
    };
  });
};

export const calculateDailyMetrics = (events: QuizEvent[], days: number = 7): DailyMetric[] => {
  const now = Date.now();
  const startDate = now - (days * 24 * 60 * 60 * 1000);

  const metricsMap: { [date: string]: DailyMetric } = {};

  // Initialize all days
  for (let i = 0; i < days; i++) {
    const date = new Date(now - (i * 24 * 60 * 60 * 1000));
    const dateStr = date.toISOString().split('T')[0];
    metricsMap[dateStr] = {
      date: dateStr,
      quiz_start: 0,
      quiz_complete: 0,
      initiate_checkout: 0,
      purchase: 0,
    };
  }

  // Count events by day
  events.forEach(event => {
    if (event.timestamp < startDate) return;

    const date = new Date(event.timestamp);
    const dateStr = date.toISOString().split('T')[0];

    if (metricsMap[dateStr]) {
      if (event.event_name === 'quiz_start') metricsMap[dateStr].quiz_start++;
      if (event.event_name === 'quiz_complete') metricsMap[dateStr].quiz_complete++;
      if (event.event_name === 'InitiateCheckout') metricsMap[dateStr].initiate_checkout++;
      if (event.event_name === 'Purchase') metricsMap[dateStr].purchase++;
    }
  });

  return Object.values(metricsMap).reverse();
};

export const calculateProfileDistribution = (events: QuizEvent[], field: 'tempo_espiritual' | 'perfil_amor'): { name: string; value: number }[] => {
  const distribution: { [key: string]: number } = {};

  events
    .filter(e => e.event_name === 'quiz_complete' && e[field])
    .forEach(event => {
      const value = event[field]!;
      distribution[value] = (distribution[value] || 0) + 1;
    });

  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
};
