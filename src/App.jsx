import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  })
  console.log(projectState)
  function handleStartAddProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: null,
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined,
      }

    })
  }

  function handleAddProject(projectData) {
    setProjectState(prev => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {
        ...prev,
        projects: [...prev.projects, newProject],
        selectedProjectId: undefined,
      }

    })
  }
  function handleSelectProject(id) {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: id
      }
    })
  }

  function handleDeleteProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter(project => project.id !== prev.selectedProjectId)
      }
    })
  }

  function handleAddTask(text) {
    setProjectState(prev => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId: prev.selectedProjectId,
        id: taskId
      }
      return {
        ...prev,
        tasks: [newTask, ...prev.tasks]
      }

    })
  }

  const selectedProjectTasks = projectState.tasks.filter(task => task.projectId === projectState.selectedProjectId)


  function handleClearTask(selectedTaskId) {
    setProjectState(prev => {
      return {
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== selectedTaskId)
      }
    })

  }


  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);


  let content = <SelectedProject
    project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    tasks={selectedProjectTasks}
    onClear={handleClearTask}
  />;

  if (projectState.selectedProjectId === undefined) {
    content = <NoProject onStartAddProject={handleStartAddProject} />
  } else if (projectState.selectedProjectId === null) {
    content = <NewProject onCancel={handleCancelAddProject} onAdd={handleAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
