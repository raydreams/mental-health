import axios from 'axios';
import { saveAs } from 'file-saver';

// Statistics Canada API configuration
const STATSCAN_API_URL = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://api.statcan.gc.ca/rest/getData');
const STATSCAN_FALLBACK_PROXY = 'https://thriving-semolina-cfa630.netlify.app/?destination=';
const STATSCAN_ALTERNATIVE_PROXY = 'https://thriving-semolina-cfa630.netlify.app/?destination=' + encodeURIComponent('https://api.statcan.gc.ca/rest/getData');
const STATSCAN_FALLBACK_URL = STATSCAN_FALLBACK_PROXY + 'https://api.statcan.gc.ca/rest/getData';

// WHO GHO API configuration
const WHO_API_URL = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://ghoapi.azureedge.net/api');
const WHO_FALLBACK_PROXY = 'https://thriving-semolina-cfa630.netlify.app/?destination=';
const WHO_ALTERNATIVE_PROXY = 'https://thriving-semolina-cfa630.netlify.app/?destination=' + encodeURIComponent('https://ghoapi.azureedge.net/api');
const WHO_FALLBACK_URL = WHO_FALLBACK_PROXY + 'https://ghoapi.azureedge.net/api';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Cache configuration
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const cache = new Map<string, { data: any; timestamp: number }>();

// Rate limiting for WHO API
const WHO_RATE_LIMIT = 50; // Reduced from 100 to 50 requests per minute
const WHO_RATE_WINDOW = 60000; // 1 minute in milliseconds
let whoRequestCount = 0;
let whoRequestReset = Date.now();

// Logging configuration
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

let currentLogLevel = LOG_LEVELS.INFO;

function log(level: number, message: string, data?: any) {
  if (level >= currentLogLevel) {
    const timestamp = new Date().toISOString();
    const levelName = Object.keys(LOG_LEVELS).find(key => LOG_LEVELS[key as keyof typeof LOG_LEVELS] === level);
    console.log(`[${timestamp}] [${levelName}] ${message}`, data || '');
  }
}

interface MentalHealthData {
  prevalence: number;
  economicImpact: number;
  earlyOnset: number;
  supportAvailability: string;
  trends: TrendData[];
  lastUpdated: string;
  dataQuality: DataQualityMetrics;
  aggregatedData: AggregatedData;
}

interface TrendData {
  year: string;
  cases: number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  movingAverage?: number;
  volatility?: number;
  seasonality?: number;
}

interface DataQualityMetrics {
  prevalence: QualityMetric;
  economicImpact: QualityMetric;
  earlyOnset: QualityMetric;
  overall: QualityMetric;
  completeness: number;
  timeliness: number;
  consistency: number;
}

interface QualityMetric {
  level: 'high' | 'medium' | 'low';
  confidence: number;
  lastVerified: string;
  source: string;
  issues?: string[];
}

interface AggregatedData {
  monthly: TrendData[];
  quarterly: TrendData[];
  yearly: TrendData[];
  custom?: {
    [key: string]: TrendData[];
  };
}

interface ValidationResult {
  isValid: boolean;
  value: number;
  quality: 'high' | 'medium' | 'low';
  message?: string;
}

function validateValue(value: number, type: 'prevalence' | 'economic' | 'earlyOnset'): ValidationResult {
  switch (type) {
    case 'prevalence':
      if (isNaN(value) || value < 0 || value > 100) {
        return { isValid: false, value: 20, quality: 'low', message: 'Invalid prevalence value' };
      }
      return { 
        isValid: true, 
        value: Math.round(value), 
        quality: value > 0 && value < 100 ? 'high' : 'medium' 
      };
    
    case 'economic':
      if (isNaN(value) || value < 0) {
        return { isValid: false, value: 51, quality: 'low', message: 'Invalid economic value' };
      }
      return { 
        isValid: true, 
        value: Math.round(value / 1000), 
        quality: value > 0 ? 'high' : 'medium' 
      };
    
    case 'earlyOnset':
      if (isNaN(value) || value < 0 || value > 100) {
        return { isValid: false, value: 75, quality: 'low', message: 'Invalid early onset value' };
      }
      return { 
        isValid: true, 
        value: Math.round(value), 
        quality: value > 0 && value < 100 ? 'high' : 'medium' 
      };
  }
}

function calculateMovingAverage(data: number[], windowSize: number = 3): number[] {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = data.slice(start, i + 1);
    const average = window.reduce((a, b) => a + b, 0) / window.length;
    result.push(average);
  }
  return result;
}

function calculateVolatility(data: number[]): number {
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const squaredDiffs = data.map(x => Math.pow(x - mean, 2));
  return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / data.length);
}

function detectSeasonality(data: number[]): number {
  // Simple seasonality detection using autocorrelation
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const normalizedData = data.map(x => x - mean);
  
  let seasonality = 0;
  for (let lag = 1; lag < Math.min(12, data.length / 2); lag++) {
    let correlation = 0;
    for (let i = lag; i < data.length; i++) {
      correlation += normalizedData[i] * normalizedData[i - lag];
    }
    seasonality = Math.max(seasonality, Math.abs(correlation));
  }
  
  return seasonality;
}

function aggregateData(observations: any[], period: 'monthly' | 'quarterly' | 'yearly'): TrendData[] {
  if (!observations || observations.length === 0) return [];

  const groupedData = observations.reduce((acc: Record<string, number[]>, obs: any) => {
    const date = new Date(obs.time);
    let key: string;
    
    switch (period) {
      case 'monthly':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      case 'quarterly':
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        key = `${date.getFullYear()}-Q${quarter}`;
        break;
      case 'yearly':
        key = date.getFullYear().toString();
        break;
    }

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(parseFloat(obs.v));
    return acc;
  }, {});

  return Object.entries(groupedData).map(([key, values]) => {
    const avgValue = values.reduce((a, b) => a + b, 0) / values.length;
    return {
      year: key,
      cases: Math.round(avgValue),
      volatility: calculateVolatility(values),
      seasonality: detectSeasonality(values)
    };
  });
}

function calculateDataQuality(data: any): DataQualityMetrics {
  const now = new Date();
  const completeness = calculateCompleteness(data);
  const timeliness = calculateTimeliness(data);
  const consistency = calculateConsistency(data);

  return {
    prevalence: {
      level: completeness > 0.9 ? 'high' : completeness > 0.7 ? 'medium' : 'low',
      confidence: completeness * 100,
      lastVerified: now.toISOString(),
      source: 'Statistics Canada',
      issues: completeness < 1 ? ['Some data points missing'] : undefined
    },
    economicImpact: {
      level: completeness > 0.9 ? 'high' : completeness > 0.7 ? 'medium' : 'low',
      confidence: completeness * 100,
      lastVerified: now.toISOString(),
      source: 'Statistics Canada',
      issues: completeness < 1 ? ['Some data points missing'] : undefined
    },
    earlyOnset: {
      level: completeness > 0.9 ? 'high' : completeness > 0.7 ? 'medium' : 'low',
      confidence: completeness * 100,
      lastVerified: now.toISOString(),
      source: 'WHO GHO',
      issues: completeness < 1 ? ['Some data points missing'] : undefined
    },
    overall: {
      level: (completeness + timeliness + consistency) / 3 > 0.9 ? 'high' : 
             (completeness + timeliness + consistency) / 3 > 0.7 ? 'medium' : 'low',
      confidence: ((completeness + timeliness + consistency) / 3) * 100,
      lastVerified: now.toISOString(),
      source: 'Multiple Sources',
      issues: []
    },
    completeness,
    timeliness,
    consistency
  };
}

function calculateCompleteness(data: any): number {
  // Calculate percentage of non-null values
  const totalFields = Object.keys(data).length;
  const nonNullFields = Object.values(data).filter(v => v !== null && v !== undefined).length;
  return nonNullFields / totalFields;
}

function calculateTimeliness(data: any): number {
  // Calculate how recent the data is
  const lastUpdate = new Date(data.lastUpdated);
  const now = new Date();
  const daysOld = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(0, 1 - (daysOld / 365)); // Degrade over a year
}

function calculateConsistency(data: any): number {
  // Check for consistency in trends
  const trends = data.trends;
  if (!trends || trends.length < 2) return 0.5;

  let consistency = 0;
  for (let i = 1; i < trends.length; i++) {
    if (trends[i].trend === trends[i-1].trend) {
      consistency += 1;
    }
  }
  return consistency / (trends.length - 1);
}

async function fetchWithRetry(url: string, params: any = {}, retryCount = 0): Promise<any> {
  try {
    log(LOG_LEVELS.DEBUG, `Attempting to fetch ${url}`, { params, retryCount });
    
    // Rate limiting for WHO API
    if (url.includes('ghoapi.azureedge.net')) {
      const now = Date.now();
      if (now > whoRequestReset) {
        whoRequestCount = 0;
        whoRequestReset = now + WHO_RATE_WINDOW;
        log(LOG_LEVELS.DEBUG, 'WHO API rate limit reset');
      }
      
      if (whoRequestCount >= WHO_RATE_LIMIT) {
        const waitTime = whoRequestReset - now;
        log(LOG_LEVELS.WARN, `WHO API rate limit reached. Waiting ${Math.ceil(waitTime/1000)} seconds`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        whoRequestCount = 0;
        whoRequestReset = Date.now() + WHO_RATE_WINDOW;
      }
      
      whoRequestCount++;
      log(LOG_LEVELS.DEBUG, `WHO API request count: ${whoRequestCount}/${WHO_RATE_LIMIT}`);
    }

    // Add only safe headers that browsers allow
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9'
    };

    // Add specific headers for Statistics Canada API
    if (url.includes('statcan.gc.ca')) {
      headers['Accept-Language'] = 'en-CA,en;q=0.9';
    }

    // Add specific headers for WHO API
    if (url.includes('ghoapi.azureedge.net')) {
      headers['Accept-Language'] = 'en-US,en;q=0.9';
    }

    // Increase timeout for WHO API
    const timeout = url.includes('ghoapi.azureedge.net') ? 30000 : 10000; // 30s for WHO, 10s for others
    const response = await axios.get(url, { 
      params,
      timeout,
      headers,
      withCredentials: false
    });

    log(LOG_LEVELS.INFO, `Successfully fetched ${url}`);
    return response.data;
  } catch (error: any) {
    log(LOG_LEVELS.ERROR, `Error fetching ${url}`, error);
    
    // Handle rate limit errors
    if (error.response?.status === 429 || error.message?.includes('rate limit')) {
      log(LOG_LEVELS.WARN, 'Rate limit error detected, trying Netlify proxy');
      const netlifyUrl = url.includes('statcan.gc.ca') 
        ? STATSCAN_FALLBACK_URL 
        : WHO_FALLBACK_URL;
      return fetchWithRetry(netlifyUrl, params, retryCount);
    }
    
    // Handle timeout errors specifically
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      log(LOG_LEVELS.WARN, `Timeout error for ${url}, trying Netlify proxy`);
      const netlifyUrl = url.includes('statcan.gc.ca') 
        ? STATSCAN_FALLBACK_URL 
        : WHO_FALLBACK_URL;
      return fetchWithRetry(netlifyUrl, params, retryCount);
    }
    
    // Check if it's a CORS error
    if (error.message?.includes('Access-Control-Allow-Headers') || 
        error.message?.includes('access control checks')) {
      log(LOG_LEVELS.WARN, 'CORS error detected, trying Netlify proxy');
      const netlifyUrl = url.includes('statcan.gc.ca') 
        ? STATSCAN_FALLBACK_URL 
        : WHO_FALLBACK_URL;
      return fetchWithRetry(netlifyUrl, params, retryCount);
    }
    
    // Handle network errors
    if (error.message?.includes('Network Error') || error.code === 'ERR_NETWORK') {
      log(LOG_LEVELS.WARN, `Network error for ${url}, trying Netlify proxy`);
      const netlifyUrl = url.includes('statcan.gc.ca') 
        ? STATSCAN_FALLBACK_URL 
        : WHO_FALLBACK_URL;
      return fetchWithRetry(netlifyUrl, params, retryCount);
    }
    
    if (retryCount < MAX_RETRIES) {
      log(LOG_LEVELS.WARN, `Retrying ${url} (attempt ${retryCount + 1}/${MAX_RETRIES})`);
      // Exponential backoff with jitter
      const delay = RETRY_DELAY * Math.pow(2, retryCount) * (0.5 + Math.random() * 0.5);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, params, retryCount + 1);
    }
    
    throw error;
  }
}

async function fetchWithFallback(url: string, params: any = {}): Promise<any> {
  try {
    return await fetchWithRetry(url, params);
  } catch (error) {
    log(LOG_LEVELS.WARN, `Primary proxy failed, trying fallback for ${url}`);
    
    // Try fallback proxy
    const fallbackUrl = url.includes('statcan.gc.ca') ? STATSCAN_FALLBACK_URL : WHO_FALLBACK_URL;
    try {
      return await fetchWithRetry(fallbackUrl, params);
    } catch (fallbackError) {
      log(LOG_LEVELS.ERROR, `Both primary and fallback proxies failed for ${url}`);
      throw fallbackError;
    }
  }
}

async function fetchWithCache(url: string, params: any = {}): Promise<any> {
  const cacheKey = `${url}-${JSON.stringify(params)}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    log(LOG_LEVELS.DEBUG, `Cache hit for ${url}`);
    return cached.data;
  }

  log(LOG_LEVELS.DEBUG, `Cache miss for ${url}, fetching fresh data`);
  const data = await fetchWithFallback(url, params);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}

export function exportData(data: MentalHealthData, format: 'csv' | 'json' = 'json'): void {
  if (format === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'mental-health-data.json');
  } else {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'mental-health-data.csv');
  }
}

function convertToCSV(data: MentalHealthData): string {
  const headers = ['Year', 'Cases', 'Change', 'Trend', 'Moving Average', 'Volatility', 'Seasonality'];
  const rows = data.trends.map(t => [
    t.year,
    t.cases,
    t.change || '',
    t.trend || '',
    t.movingAverage || '',
    t.volatility || '',
    t.seasonality || ''
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}

export async function fetchMentalHealthData(): Promise<MentalHealthData> {
  try {
    log(LOG_LEVELS.INFO, 'Starting mental health data fetch');
    
    // Fetch data from Statistics Canada with caching
    log(LOG_LEVELS.DEBUG, 'Fetching prevalence data from Statistics Canada');
    const prevalenceData = await fetchWithCache(`${STATSCAN_API_URL}/1310049401-eng`, {
      format: 'json',
      lang: 'en'
    });
    log(LOG_LEVELS.DEBUG, 'Prevalence data received', { 
      hasData: !!prevalenceData,
      dataLength: prevalenceData?.observations?.[0]?.observations?.length 
    });

    log(LOG_LEVELS.DEBUG, 'Fetching economic data from Statistics Canada');
    const economicData = await fetchWithCache(`${STATSCAN_API_URL}/3610043401-eng`, {
      format: 'json',
      lang: 'en'
    });
    log(LOG_LEVELS.DEBUG, 'Economic data received', { 
      hasData: !!economicData,
      dataLength: economicData?.observations?.[0]?.observations?.length 
    });

    // Fetch data from WHO GHO with caching
    log(LOG_LEVELS.DEBUG, 'Fetching WHO GHO data');
    const whoData = await fetchWithCache(`${WHO_API_URL}/Indicator`, {
      $filter: "IndicatorName eq 'Prevalence of mental disorders' and TimeDim eq 2023 and AgeGroup eq '15-24'"
    });
    log(LOG_LEVELS.DEBUG, 'WHO GHO data received', { 
      hasData: !!whoData,
      dataLength: whoData?.value?.length 
    });

    log(LOG_LEVELS.INFO, 'Successfully fetched all data sources');

    // Process and validate the data
    log(LOG_LEVELS.DEBUG, 'Processing prevalence data');
    const prevalenceResult = validateValue(
      parseFloat(prevalenceData?.observations?.[0]?.observations?.slice(-1)[0]?.v || '20'),
      'prevalence'
    );
    log(LOG_LEVELS.DEBUG, 'Prevalence validation result', prevalenceResult);

    log(LOG_LEVELS.DEBUG, 'Processing economic data');
    const economicResult = validateValue(
      parseFloat(economicData?.observations?.[0]?.observations?.slice(-1)[0]?.v || '51000'),
      'economic'
    );
    log(LOG_LEVELS.DEBUG, 'Economic validation result', economicResult);

    log(LOG_LEVELS.DEBUG, 'Processing WHO GHO data');
    const earlyOnsetResult = validateValue(
      parseFloat(whoData?.value?.[0]?.Value || '0.75') * 100,
      'earlyOnset'
    );
    log(LOG_LEVELS.DEBUG, 'Early onset validation result', earlyOnsetResult);

    // Process trends with advanced analysis
    log(LOG_LEVELS.DEBUG, 'Processing trends data');
    const observations = prevalenceData?.observations?.[0]?.observations || [];
    const cases = observations.map((obs: any) => parseFloat(obs.v));
    const movingAverages = calculateMovingAverage(cases);
    
    const trends = observations.slice(-5).map((obs: any, index: number, array: any[]) => {
      const currentValue = Math.round(parseFloat(obs.v));
      const previousValue = index > 0 ? Math.round(parseFloat(array[index - 1].v)) : null;
      
      let change: number | undefined;
      let trend: 'up' | 'down' | 'stable' | undefined;

      if (previousValue !== null) {
        change = ((currentValue - previousValue) / previousValue) * 100;
        if (Math.abs(change) < 1) {
          trend = 'stable';
        } else {
          trend = change > 0 ? 'up' : 'down';
        }
      }

      return {
        year: obs.time,
        cases: currentValue,
        change,
        trend,
        movingAverage: Math.round(movingAverages[index + movingAverages.length - 5]),
        volatility: calculateVolatility(cases.slice(Math.max(0, index - 2), index + 1)),
        seasonality: detectSeasonality(cases.slice(Math.max(0, index - 11), index + 1))
      };
    });
    log(LOG_LEVELS.DEBUG, 'Trends processed', { trendsCount: trends.length });

    // Calculate aggregated data
    log(LOG_LEVELS.DEBUG, 'Calculating aggregated data');
    const aggregatedData = {
      monthly: aggregateData(observations, 'monthly'),
      quarterly: aggregateData(observations, 'quarterly'),
      yearly: aggregateData(observations, 'yearly')
    };
    log(LOG_LEVELS.DEBUG, 'Aggregated data calculated', {
      monthlyCount: aggregatedData.monthly.length,
      quarterlyCount: aggregatedData.quarterly.length,
      yearlyCount: aggregatedData.yearly.length
    });

    const processedData: MentalHealthData = {
      prevalence: prevalenceResult.value,
      economicImpact: economicResult.value,
      earlyOnset: earlyOnsetResult.value,
      supportAvailability: "24/7",
      trends,
      lastUpdated: new Date().toISOString(),
      dataQuality: calculateDataQuality({
        prevalence: prevalenceResult,
        economicImpact: economicResult,
        earlyOnset: earlyOnsetResult,
        trends,
        lastUpdated: new Date().toISOString()
      }),
      aggregatedData
    };

    log(LOG_LEVELS.INFO, 'Mental health data processing completed successfully');
    return processedData;
  } catch (error: any) {
    log(LOG_LEVELS.ERROR, 'Error in fetchMentalHealthData', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Log specific error details
    if (error.response) {
      log(LOG_LEVELS.ERROR, 'API Error Response', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    }
    
    return {
      prevalence: 20,
      economicImpact: 51,
      earlyOnset: 75,
      supportAvailability: "24/7",
      trends: generateFallbackTrends(),
      lastUpdated: new Date().toISOString(),
      dataQuality: {
        prevalence: { level: 'low', confidence: 0, lastVerified: new Date().toISOString(), source: 'Fallback' },
        economicImpact: { level: 'low', confidence: 0, lastVerified: new Date().toISOString(), source: 'Fallback' },
        earlyOnset: { level: 'low', confidence: 0, lastVerified: new Date().toISOString(), source: 'Fallback' },
        overall: { level: 'low', confidence: 0, lastVerified: new Date().toISOString(), source: 'Fallback' },
        completeness: 0,
        timeliness: 0,
        consistency: 0
      },
      aggregatedData: {
        monthly: [],
        quarterly: [],
        yearly: []
      }
    };
  }
}

function generateFallbackTrends(): TrendData[] {
  return [
    { year: '2019', cases: 20 },
    { year: '2020', cases: 25, change: 25, trend: 'up', movingAverage: 22.5, volatility: 2.5, seasonality: 0.1 },
    { year: '2021', cases: 30, change: 20, trend: 'up', movingAverage: 25, volatility: 2.8, seasonality: 0.15 },
    { year: '2022', cases: 28, change: -6.7, trend: 'down', movingAverage: 27.7, volatility: 2.3, seasonality: 0.12 },
    { year: '2023', cases: 32, change: 14.3, trend: 'up', movingAverage: 30, volatility: 2.6, seasonality: 0.18 }
  ];
} 