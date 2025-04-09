/**
 * ExperimentGraph.tsx
 * 
 * A component that renders a line chart visualization for experiment scores.
 * Uses Recharts for the chart implementation and displays experiment set scores over time.
 */

// Import UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Import chart components from Recharts
import { XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

// Import types
import { Experiment } from "../../../lib/types";

// Import custom chart components
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

/**
 * Props for the ExperimentGraph component
 */
interface ExperimentGraphProps {
  experiment: Experiment;
}

/**
 * ExperimentGraph component displays a line chart of experiment scores
 * @param {Experiment} experiment - The experiment data to visualize
 */
function ExperimentGraph({ experiment }: ExperimentGraphProps) {
  // Transform the experiment sets data into a format suitable for the chart
  // Each data point contains a name (Set X) and a score value
  const data = experiment.sets.map((set, index) => ({
    name: `Set ${index + 1}`,
    score: Number(set.score), // Ensure score is a number for the chart
  }));

  // Configure the chart appearance
  // This defines how the score data series should be styled
  const chartConfig = {
    score: {
      label: "Score",
      color: "#2563eb", // Blue color for the score line
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full mx-auto">
      {/* Card header with experiment name */}
      <CardHeader>
        <CardTitle>{experiment.name} Scores</CardTitle>
      </CardHeader>
      
      {/* Card content with fixed height for the chart */}
      <CardContent className="h-[400px]">
        {/* ChartContainer provides the context and styling for the chart */}
        <ChartContainer config={chartConfig} className="w-full h-full">
          {/* LineChart is the main chart component from Recharts */}
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            {/* Grid lines for better readability */}
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            
            {/* X-axis configuration - shows set names */}
            <XAxis dataKey="name" stroke="#888888" fontSize={12} />
            
            {/* Y-axis configuration - domain limited to 0-1 for score values */}
            <YAxis domain={[0, 1]} stroke="#888888" fontSize={12} />
            
            {/* Tooltip configuration for interactive data points */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            
            {/* Line configuration for the score data series */}
            <Line
              type="monotone" // Smooth line type
              dataKey="score" // Maps to the score property in data points
              stroke="#2563eb" // Blue line color
              strokeWidth={2} // Line thickness
              connectNulls // Connect across null/undefined values
              isAnimationActive={true} // Enable animations
              
              // Regular dot styling
              dot={{
                fill: "#2563eb", // Blue fill
                strokeWidth: 2, // Border thickness
                r: 4, // Radius
              }}
              
              // Active dot styling (when hovered)
              activeDot={{
                r: 6, // Larger radius when active
                fill: "#2563eb", // Blue fill
                stroke: "#ffffff", // White border
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ExperimentGraph;
