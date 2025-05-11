/**
 * Kanban Task Board
 *
 * This application uses:
 * - React and TypeScript for the UI
 * - Zustand for state management
 * - react-beautiful-dnd for drag and drop
 * - npm as the package manager
 */
"use client"

import { useEffect } from "react"
import { DragDropContext, type DropResult } from "react-beautiful-dnd"
import { useStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Board } from "@/components/board"
import { CreateProjectDialog } from "@/components/create-project-dialog"
import { CreateTaskDialog } from "@/components/create-task-dialog"
import { EditTaskDialog } from "@/components/edit-task-dialog"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const {
    projects,
    selectedProjectId,
    moveTask,
    loadFromLocalStorage,
    isCreateProjectOpen,
    isCreateTaskOpen,
    editingTask,
  } = useStore()

  useEffect(() => {
    loadFromLocalStorage()
  }, [loadFromLocalStorage])

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    // Dropped outside the list
    if (!destination) return

    // Dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    moveTask(selectedProjectId, draggableId, source.droppableId, destination.droppableId, destination.index)
  }

  const selectedProject = projects.find((project) => project.id === selectedProjectId)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <main className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 items-center justify-between border-b px-4 lg:px-6">
            <h1 className="text-xl font-semibold">{selectedProject ? selectedProject.name : "Select a Project"}</h1>
            <ThemeToggle />
          </header>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Board />
          </DragDropContext>
        </div>
        {isCreateProjectOpen && <CreateProjectDialog />}
        {isCreateTaskOpen && <CreateTaskDialog />}
        {editingTask && <EditTaskDialog />}
      </main>
    </ThemeProvider>
  )
}
