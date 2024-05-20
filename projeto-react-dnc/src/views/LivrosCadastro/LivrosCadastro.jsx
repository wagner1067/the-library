import { useState } from 'react';
import Header from '../../components/Header/Header';
import "./index.scss";
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { LivrosService } from '../../api/LivrosService';

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });

  async function createLivro() {
    const body = {
      titulo: livro.titulo,
      pagina: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora
    };

    if (livro.titulo && livro.num_paginas && livro.isbn && livro.editora) {
      await LivrosService.createLivro(body)
        .then((response) => {
          alert('Livro cadastrado com sucesso!');
          setLivro({
            titulo: '',
            num_paginas: '',
            isbn: '',
            editora: ''
          });
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data.message}`);
        });
    } else {
      alert('Todos os campos são obrigatórios!');
    }
  }

  return (
    <>
      <Header />
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario" onSubmit={(e) => { e.preventDefault(); createLivro(); }}>
            <div className='form-group'>
              <label>Título</label>
              <input type="text" id='titulo' value={livro.titulo} required onChange={(event) => { setLivro({ ...livro, titulo: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="number" id='num_paginas' value={livro.num_paginas} required onChange={(event) => { setLivro({ ...livro, num_paginas: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' value={livro.isbn} required onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' value={livro.editora} required onChange={(event) => { setLivro({ ...livro, editora: event.target.value }) }}></input>
            </div>
            <div className='form-group'>
              <button type="submit">Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LivrosCadastro;
