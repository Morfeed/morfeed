import {
  ArrowLeftIcon,
  DownloadIcon,
  MinusIcon,
  MoreHorizontalIcon,
  PlusIcon,
  ServerIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

import { Preview, Subsection } from "./section"

export function ButtonGroupShowcase() {
  return (
    <Subsection className="grid gap-4 md:grid-cols-2">
      <Preview>
        <ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Back to feed">
              <ArrowLeftIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Hide</Button>
            <Button variant="outline">Blur</Button>
            <Button variant="outline">Keep</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline">Mute author</Button>
            <Button variant="outline" size="icon" aria-label="More actions">
              <MoreHorizontalIcon />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Preview>
      <Preview>
        <ButtonGroup orientation="vertical" aria-label="Threshold controls">
          <Button variant="outline" size="icon" aria-label="Raise threshold">
            <PlusIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Lower threshold">
            <MinusIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Today</Button>
          <Button variant="outline">7 days</Button>
          <Button variant="outline">30 days</Button>
        </ButtonGroup>
      </Preview>
      <Preview>
        <ButtonGroup className="w-full">
          <ButtonGroupText>
            <ServerIcon />
            http://
          </ButtonGroupText>
          <Input
            placeholder="localhost:11434"
            aria-label="Local model endpoint"
          />
          <Button variant="outline">Test</Button>
        </ButtonGroup>
      </Preview>
    </Subsection>
  )
}
