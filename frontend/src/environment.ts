export const isElectron = (): boolean => {
    // Check if window.electron exists (this is exposed by your preload script)
    if ('electron' in window) {
      return true;
    }
    
    // Alternative checks if needed
    // Check if running in Electron's renderer process
    if (window && window.process && window.process.type === 'renderer') {
      return true;
    }
    
    return false;
  };