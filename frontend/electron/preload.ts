import { ipcRenderer, contextBridge } from 'electron'

// Define the API type
type ElectronAPI = {
  isElectron: boolean;
  ipcRenderer: {
    on(channel: string, listener: (...args: any[]) => void): void;
    off(channel: string, ...args: any[]): void;
    send(channel: string, ...args: any[]): void;
    invoke(channel: string, ...args: any[]): Promise<any>;
  };
}

// Create the API object
const electronAPI: ElectronAPI = {
  isElectron: true,
  ipcRenderer: {
    on(...args: Parameters<typeof ipcRenderer.on>) {
      const [channel, listener] = args;
      return ipcRenderer.on(channel, (...args) => listener(...args));
    },
    off(...args: Parameters<typeof ipcRenderer.off>) {
      const [channel, ...omit] = args;
      return ipcRenderer.off(channel, ...omit);
    },
    send(...args: Parameters<typeof ipcRenderer.send>) {
      const [channel, ...omit] = args;
      return ipcRenderer.send(channel, ...omit);
    },
    invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
      const [channel, ...omit] = args;
      return ipcRenderer.invoke(channel, ...omit);
    }
  }
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electron', electronAPI);

// Log that preload script is loaded
console.log('Preload script loaded, Electron API exposed');