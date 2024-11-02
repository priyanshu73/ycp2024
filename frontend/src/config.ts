// config.ts
interface AppConfig {
    isElectron: boolean;
    apiBaseUrl: string;
    // Add other configuration options as needed
  }
  
  // Check if running in Electron
  const isElectronEnvironment = (): boolean => {
    return window && window.process && window.process.type === 'renderer';
  };
  
  // Configuration for different environments
  const config: AppConfig = {
    isElectron: isElectronEnvironment(),
    apiBaseUrl: isElectronEnvironment() 
      ? 'http://localhost:8000'  // Local FastAPI server when running in Electron
      : 'http://localhost:8001'  // Web API endpoint when running as website
  };
  
  export const getConfig = (): AppConfig => config;