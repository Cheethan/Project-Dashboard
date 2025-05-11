"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { DndContext, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/core"
import { useStore } from "./store"

interface DndContextProps {
  children: React.ReactNode
}

const DndProviderContext = createContext<{
  isDragging: boolean
}>({
  isDragging: false,
})

export function DndProvider({ children }: DndContextProps) {
  const [isDragging, setIsDragging] = useState(false)
  const { moveTask, selectedProjectId } = useStore()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const taskId = active.id as string
    const sourceColumn = active.data.current?.column as string
    const destinationColumn = over.id as string

    if (sourceColumn !== destinationColumn) {
      moveTask(
        selectedProjectId,
        taskId,
        sourceColumn,
        destinationColumn,
        0, // We'll place it at the top of the new column for simplicity
      )
    }

    setIsDragging(false)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <DndProviderContext.Provider value={{ isDragging }}>{children}</DndProviderContext.Provider>
    </DndContext>
  )
}

export function useDndContext(id: string, index?: number) {
  const { isDragging } = useContext(DndProviderContext)

  // For columns (droppable)
  const { isOver, setNodeRef: setDroppableRef } = useDroppable({
    id,
  })

  // For tasks (draggable)
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging: isItemDragging,
  } = useDraggable({
    id,
    data: {
      index,
      column: id,
    },
  })

  const draggableStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isItemDragging ? 1 : undefined,
      }
    : undefined

  return {
    // For columns
    droppableProps: {
      ref: setDroppableRef,
    },
    isDraggingOver: isOver,

    // For tasks
    draggableProps: {
      ref: setDraggableRef,
      ...attributes,
      ...listeners,
      style: draggableStyle,
    },
    isDragging,
    isItemDragging,
  }
}
