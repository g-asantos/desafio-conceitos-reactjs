import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(() => {


    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Novo Repositório ${Date.now()}`
  })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`/repositories/${id}`)
    

    const deletedRepository = repositories.find(repository => repository.id === id);

   
    
    const removedRepositories = repositories.filter(repository => repository !== deletedRepository)

    

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
