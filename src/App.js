import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [repositories])


  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo Repositório ${Date.now()}`
  })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`/repositories/${id}`)
    

    const repositoriesIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoriesIndex < 0) {
    return response.status(400).json({ error: 'Repository not found' })
  }

    const copyRepositories = repositories

    const removedRepositories = copyRepositories.splice(repositoriesIndex, 1)


    setRepositories([...removedRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => {
      return (
        <div key={repository.id}>
        <li >{repository.title}</li>
        <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
        </button>
        </div>
      )
      
      
    }
      )}
          
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
