/**
 * App.tsx
 * 
 * Main application component for the AI Agent Prototype Dashboard.
 * This component serves as the entry point for the dashboard application,
 * displaying experiment results and visualizations.
 */

// Import styles and dependencies
import "./App.css";
import resultsData from "../../results.json";
import { Results } from "../../lib/types";
import { useState } from "react";
import ExperimentGraph from "./components/ExperimentGraph";

// Import UI components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function App() {
  // Cast the imported JSON data to our Results type
  const results = resultsData as Results;

  // State to track which experiment is currently selected
  // Initialize with the first experiment's name
  const [selectedExperiment, setSelectedExperiment] = useState<string>(
    results.experiments[0].name
  );

  // Find the currently selected experiment from the results data
  const currentExperiment = results.experiments.find(
    (experiment) => experiment.name === selectedExperiment
  );

  // Create a limited version of the experiment data for display
  // Only show the last 10 sets to avoid overwhelming the chart
  const limitedExperiment = currentExperiment
    ? {
        ...currentExperiment,
        sets: currentExperiment.sets.slice(-10),
      }
    : null;

  return (
    <div className="min-h-screen bg-background p-8 space-y-8">
      <div className="container mx-auto space-y-8">
        {/* Dashboard title */}
        <h1 className="text-4xl font-bold tracking-tight">
          Experiments Viewer
        </h1>

        {/* Experiment selector */}
        <div className="flex items-center space-x-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="experiment-select">Select Experiment</Label>
            <Select
              value={selectedExperiment}
              onValueChange={setSelectedExperiment}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an experiment" />
              </SelectTrigger>
              <SelectContent>
                {/* Map through all available experiments to create select options */}
                {results.experiments.map((experiment) => (
                  <SelectItem key={experiment.name} value={experiment.name}>
                    {experiment.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Render the experiment graph if an experiment is selected */}
        {limitedExperiment && (
          <ExperimentGraph experiment={limitedExperiment} />
        )}
      </div>
    </div>
  );
}

export default App;
