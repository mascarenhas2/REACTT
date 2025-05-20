import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/images/logo.png';
import useMensagem from '../../hooks/useMensagem';
import MensagemFeedback from '../MensagemFeedback';
import axios from 'axios';

function FormularioCadastro(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();
    const { mostrarMensagem, mensagem, tipoMensagem, visivel, fecharMensagem } = useMensagem();

    const cadastroUsuarios = async (event) => {
        try {
            const response = await axios.post('http://localhost:8080/usuarios', {nome, email, senha});
            mostrarMensagem (response.data.mensagem || 'Usuário cadastrado com sucesso!', 'sucesso');
            setNome('');
            setEmail('');
            setSenha('');
            
        } catch (error){
            let erroMsg = 'Erro ao conectar ao servidor. ';
            if(error.response && error.response.data){
                erroMsg += error.response.data.mensagem || 'Erro ao cadastrar usuário.';
                if (error.response.data.erros) {
                    erroMsg += ' ' + error.response.data.erros.join(', ');
                }
            }
        }
    }
    return(
        <div className="container">
            <div classname= "formulario-cadastro">
                <img src={logo} alt="Logo" className="logo" />
                <h1>Cadastro</h1>
                <form onSubmit={cadastroUsuarios}>
                    <input 
                        type="text" 
                        placeholder="Nome" 
                        value={nome} onChange={(e) => setNome(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    <button type="submit">Cadastrar</button>
                </form>
                <button onClick = {() => navigate('/usuarios')} className="link-usuarios">
                    Ver usuários cadastrados
                    </button>

                <MensagemFeedback
                    mensagem={mensagem}
                    tipoMensagem={tipoMensagem}
                    visivel={visivel}
                    fecharMensagem={fecharMensagem}
                    />
                    </div>
                </div>
    );
}

export default FormularioCadastro;