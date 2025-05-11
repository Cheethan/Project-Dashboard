export interface Project {
  id: string
  name: string
  createdAt: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "inProgress" | "done"
  projectId: string
  createdAt: string
  dueDate?: string
}

export interface AppState {
  projects: Project[]
  tasks: Task[]
  selectedProjectId: string
  isCreateProjectOpen: boolean
  isCreateTaskOpen: boolean
  editingTask: Task | null

  // Project actions
  createProject: (name: string) => void
  updateProject: (id: string, name: string) => void
  deleteProject: (id: string) => void
  selectProject: (id: string) => void
  openCreateProject: () => void
  closeCreateProject: () => void

  // Task actions
  createTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
  moveTask: (
    projectId: string,
    taskId: string,
    sourceStatus: string,
    destinationStatus: string,
    destinationIndex: number,
  ) => void
  getTasksByColumn: (projectId: string, status: string) => Task[]
  openCreateTask: () => void
  closeCreateTask: () => void
  startEditingTask: (task: Task) => void
  cancelEditingTask: () => void

  // Persistence
  loadFromLocalStorage: () => void
}
