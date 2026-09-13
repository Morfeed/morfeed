import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

import { Preview, Subsection } from "./section"

const progressExamples = [
  { label: "Scanning feed", value: 12 },
  { label: "Downloading local model", value: 64 },
  { label: "Classifying posts", value: 100 },
]

export function ProgressShowcase() {
  return (
    <Subsection className="grid gap-4 md:grid-cols-3">
      {progressExamples.map((example) => (
        <Preview key={example.label}>
          <Progress value={example.value} className="w-full">
            <ProgressLabel>{example.label}</ProgressLabel>
            <ProgressValue />
          </Progress>
        </Preview>
      ))}
    </Subsection>
  )
}
