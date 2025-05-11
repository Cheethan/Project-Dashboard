"use client"

import { useEffect } from "react"
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
          <Board />
        </div>
        {isCreateProjectOpen && <CreateProjectDialog />}
        {isCreateTaskOpen && <CreateTaskDialog />}
        {editingTask && <EditTaskDialog />}
      </main>
    </ThemeProvider>
  )
}
