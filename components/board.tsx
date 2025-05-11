"use client"

import { PlusCircle } from "lucide-react"
import { useStore } from "@/lib/store"
import { Column } from "@/components/column"
import { Button } from "@/components/ui/button"

export function Board() {
  const { selectedProjectId, projects, openCreateTask } = useStore()

  const selectedProject = projects.find((project) => project.id === selectedProjectId)

  if (!selectedProject) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-semibold">No Project Selected</h2>
        <p className="mt-2 text-muted-foreground">
          Select a project from the sidebar or create a new one to get started.
        </p>
      </div>
    )
  }

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "inProgress", title: "In Progress" },
    { id: "done", title: "Done" },
  ]

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">{selectedProject.name} Board</h2>
        <Button onClick={openCreateTask}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      <div className="flex flex-1 gap-4 overflow-auto p-4">
        {columns.map((column) => (
          <Column key={column.id} id={column.id} title={column.title} projectId={selectedProjectId} />
        ))}
      </div>
    </div>
  )
}
