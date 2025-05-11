"use client"

import { Calendar, Edit, Trash2 } from "lucide-react"
import { useStore } from "@/lib/store"
import type { Task } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate, isOverdue } from "@/lib/utils"
import { useDndContext } from "@/lib/dnd-context"

interface TaskCardProps {
  task: Task
  index: number
}

export function TaskCard({ task, index }: TaskCardProps) {
  const { deleteTask, startEditingTask } = useStore()
  const { draggableProps } = useDndContext(task.id, index)

  const isTaskOverdue = task.dueDate ? isOverdue(task.dueDate) : false

  return (
    <Card {...draggableProps} className="shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-2">
        {task.description && <p className="text-xs text-muted-foreground">{task.description}</p>}
      </CardContent>
      <CardFooter className="flex items-center justify-between p-3 pt-0">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          <span>Created: {formatDate(task.createdAt)}</span>
        </div>
        {task.dueDate && (
          <div
            className={`ml-2 flex items-center text-xs ${isTaskOverdue ? "text-destructive" : "text-muted-foreground"}`}
          >
            <Calendar className="mr-1 h-3 w-3" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>
        )}
        <div className="ml-auto flex gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => startEditingTask(task)}>
            <Edit className="h-3 w-3" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => deleteTask(task.id)}>
            <Trash2 className="h-3 w-3" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
