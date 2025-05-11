"use client"

import { PlusCircle, Trash2 } from "lucide-react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { projects, selectedProjectId, selectProject, openCreateProject, deleteProject } = useStore()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="font-semibold">Projects</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={openCreateProject}>
                <PlusCircle className="h-5 w-5" />
                <span className="sr-only">Add Project</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Project</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {projects.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-4 text-center">
            <p className="text-sm text-muted-foreground">No projects yet. Create your first project to get started.</p>
            <Button variant="outline" className="mt-4" onClick={openCreateProject}>
              Create Project
            </Button>
          </div>
        ) : (
          <ul className="space-y-1">
            {projects.map((project) => (
              <li key={project.id} className="relative">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    selectedProjectId === project.id && "bg-accent text-accent-foreground",
                  )}
                  onClick={() => selectProject(project.id)}
                >
                  {project.name}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
