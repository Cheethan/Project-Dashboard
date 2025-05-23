"use client"

import { useStore } from "@/lib/store"
import { TaskCard } from "@/components/task-card"
import { useDndContext } from "@/lib/dnd-context"

interface ColumnProps {
  id: string
  title: string
  projectId: string
}

export function Column({ id, title, projectId }: ColumnProps) {
  const { getTasksByColumn } = useStore()
  const { droppableProps, isDraggingOver } = useDndContext(id)
  const tasks = getTasksByColumn(projectId, id)

  return (
    <div className="flex h-full w-80 flex-shrink-0 flex-col rounded-lg border bg-card">
      <div className="border-b p-3">
        <h3 className="font-medium">{title}</h3>
        <div className="mt-1 text-xs text-muted-foreground">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </div>
      </div>
      <div
        {...droppableProps}
        className={`flex flex-1 flex-col gap-2 overflow-auto p-2 ${isDraggingOver ? "bg-accent/50" : ""}`}
      >
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
      </div>
    </div>
  )
}
