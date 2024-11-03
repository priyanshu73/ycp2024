import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

// Check if we're running in electron mode based on command
const isElectron = process.env.npm_lifecycle_event?.includes('electron');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    // Only include electron plugin if we're in electron mode
    ...(isElectron
      ? [
          electron({
            main: {
              entry: "electron/main.ts",
            },
            preload: {
              input: path.join(__dirname, "electron/preload.ts"),
            },
            renderer:
              process.env.NODE_ENV === "test"
                ? undefined
                : {},
          }),
        ]
      : []),
      
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});