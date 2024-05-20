import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './index.scss';
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { useParams } from 'react-router-dom';
import { LivrosService } from '../../api/LivrosService';

const LivrosEdicao = () => {
  let { livroId } = useParams();

  const [livro, setLivro] = useState({
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });

  useEffect(() => {
    async function fetchLivro() {
      try {
        const { data } = await LivrosService.getLivro(livroId);
        setLivro(data);
      } catch (error) {
        console.error('Erro ao buscar livro:', error);
      }
    }
    fetchLivro();
  }, [livroId]);

  async function editLivro(e) {
    e.preventDefault();
    const body = {
      titulo: livro.titulo,
      pagina: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora
    };

    if (livro.titulo && livro.num_paginas && livro.isbn && livro.editora) {
      try {
        const { data } = await LivrosService.updateLivro(livroId, body);
        alert('Livro atualizado com sucesso!');
      } catch (error) {
        alert(`Erro ao atualizar livro: ${error.response.data.message}`);
      }
    } else {
      alert('Todos os campos são obrigatórios!');
    }
  }

  return (
    <>
      <Header />
      <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario" onSubmit={editLivro}>
            <div className='form-group'>
              <label>Id</label>
              <input type="text" disabled value={livroId || ''} />
            </div>
            <div className='form-group'>
              <label>Título</label>
              <input type="text" required onChange={(event) => { setLivro({ ...livro, titulo: event.target.value }) }} value={livro.titulo || ''} />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="number" required onChange={(event) => { setLivro({ ...livro, num_paginas: event.target.value }) }} value={livro.num_paginas || ''} />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" required onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }) }} value={livro.isbn || ''} />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" required onChange={(event) => { setLivro({ ...livro, editora: event.target.value }) }} value={livro.editora || ''} />
            </div>
            <div className='form-group'>
              <button type="submit">Atualizar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LivrosEdicao;
