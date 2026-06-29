import { Candidate, CANDIDATES } from "./data/candidates";

export interface AppState {
  candidates: Candidate[];
  jobDescription: string;
  activeJobTitle: string;
}

const STORAGE_KEY = "talentgraph_state";

const DEFAULT_STATE: AppState = {
  candidates: CANDIDATES, // Fallback to original mock data if empty
  jobDescription: "We are looking for a Senior Frontend Engineer with 5+ years of experience in React, TypeScript, and Tailwind CSS...",
  activeJobTitle: "Senior Frontend Engineer"
};

export const stateStore = {
  get(): AppState {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error reading state from localStorage:", e);
    }
    return DEFAULT_STATE;
  },

  set(state: AppState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Error writing state to localStorage:", e);
    }
  },

  updateCandidates(candidates: Candidate[], jobDescription: string, activeJobTitle: string) {
    this.set({ candidates, jobDescription, activeJobTitle });
  },

  reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Error resetting state:", e);
    }
  }
};
