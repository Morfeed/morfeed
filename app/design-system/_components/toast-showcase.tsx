"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

import { Preview, Subsection } from "./section"

function showLoadingToast() {
  const id = toast.add({ type: "loading", title: "Classifying 128 posts…" })
  window.setTimeout(() => {
    toast.update(id, {
      type: "success",
      title: "Scan complete",
      description: "17 posts flagged as likely AI-generated.",
    })
  }, 2000)
}

export function ToastShowcase() {
  return (
    <Subsection>
      <Preview>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              title: "Rule saved",
              description: "“Calm timeline” is now active on X and Reddit.",
            })
          }
        >
          Default
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "success",
              title: "Feed cleaned",
              description: "42 posts hidden on X in the last hour.",
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "info",
              title: "Selector update available",
              description: "YouTube changed its layout. Refresh to update.",
            })
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "warning",
              title: "Close to your API limit",
              description: "You've used 92% of this month's provider quota.",
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "error",
              title: "Local model unreachable",
              description: "Couldn't connect to Ollama at localhost:11434.",
            })
          }
        >
          Error
        </Button>
        <Button variant="outline" onClick={showLoadingToast}>
          Loading
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              title: "Post hidden",
              actionProps: {
                children: "Undo",
                onClick: () =>
                  toast.add({ type: "info", title: "Post restored" }),
              },
            })
          }
        >
          With action
        </Button>
      </Preview>
    </Subsection>
  )
}
