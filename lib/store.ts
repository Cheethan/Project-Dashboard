"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import type { AppState, Task } from "./types"

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      projects: [],
      tasks: [],
      selectedProjectId: "",
      isCreateProjectOpen: false,
      isCreateTaskOpen: false,
      editingTask: null,

      // Project actions
      createProject: (name) => {
        const newProject = {
          id: uuidv4(),
          name,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          projects: [...state.projects, newProject],
          selectedProjectId: newProject.id,
          isCreateProjectOpen: false,
        }))
      },
      updateProject: (id, name) => {
        set((state) => ({
          projects: state.projects.map((project) => (project.id === id ? { ...project, name } : project)),
        }))
      },
      deleteProject: (id) => {
        set((state) => {
          const newProjects = state.projects.filter((project) => project.id !== id)
          const newTasks = state.tasks.filter((task) => task.projectId !== id)

          // Select a new project if the deleted one was selected
          let newSelectedId = state.selectedProjectId
          if (state.selectedProjectId === id) {
            newSelectedId = newProjects.length > 0 ? newProjects[0].id : ""
          }

          return {
            projects: newProjects,
            tasks: newTasks,
            selectedProjectId: newSelectedId,
          }
        })
      },
      selectProject: (id) => {
        set({ selectedProjectId: id })
      },
      openCreateProject: () => {
        set({ isCreateProjectOpen: true })
      },
      closeCreateProject: () => {
        set({ isCreateProjectOpen: false })
      },

      // Task actions
      createTask: (taskData) => {
        const newTask: Task = {
          id: uuidv4(),
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          projectId: taskData.projectId,
          createdAt: new Date().toISOString(),
          dueDate: taskData.dueDate,
        }
        set((state) => ({
          tasks: [...state.tasks, newTask],
          isCreateTaskOpen: false,
        }))
      },
      updateTask: (updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
          editingTask: null,
        }))
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },
      moveTask: (projectId, taskId, sourceStatus, destinationStatus, destinationIndex) => {
        set((state) => {
          const taskToMove = state.tasks.find((task) => task.id === taskId)
          if (!taskToMove) return state

          // Remove the task from its current position
          const remainingTasks = state.tasks.filter((task) => task.id !== taskId)

          // Get tasks in the destination column
          const tasksInDestination = state.tasks
            .filter((task) => task.projectId === projectId && task.status === destinationStatus && task.id !== taskId)
            .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1))

          // Insert the task at the new position
          const updatedTasks = [...remainingTasks]
          const updatedTask = {
            ...taskToMove,
            status: destinationStatus as "todo" | "inProgress" | "done",
          }

          // Find the correct position to insert the task
          const destinationTasks = [
            ...tasksInDestination.slice(0, destinationIndex),
            updatedTask,
            ...tasksInDestination.slice(destinationIndex),
          ]

          // Replace tasks in the destination column
          const finalTasks = updatedTasks.filter(
            (task) => !(task.projectId === projectId && task.status === destinationStatus),
          )

          return {
            tasks: [...finalTasks, ...destinationTasks],
          }
        })
      },
      getTasksByColumn: (projectId, status) => {
        return get()
          .tasks.filter((task) => task.projectId === projectId && task.status === status)
          .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1))
      },
      openCreateTask: () => {
        set({ isCreateTaskOpen: true })
      },
      closeCreateTask: () => {
        set({ isCreateTaskOpen: false })
      },
      startEditingTask: (task) => {
        set({ editingTask: task })
      },
      cancelEditingTask: () => {
        set({ editingTask: null })
      },

      // Persistence
      loadFromLocalStorage: () => {
        // This is handled by the persist middleware
        // This function exists to trigger a load from localStorage on component mount
      },
    }),
    {
      name: "kanban-storage",
    },
  ),
)
