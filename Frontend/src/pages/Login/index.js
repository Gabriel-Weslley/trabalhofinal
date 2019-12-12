import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = new useState("")
  const [senha, setSenha] = new useState("")
  
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await api.post("/session",{
        email,
        senha
      });

      const {token} = response.data;
      console.log(token);
      if (token) {
        localStorage.setItem("Usuario/token", token);
      }
      history.push("/principal");
    } catch (erro) {
      alert("Erro na autenticação");
    }
  }
  return (
    <Container>
      <section>
        <form onSubmit={handleSubmit}>
          <p>Logar</p>
          <br />
          <input placeholder="Email ou Nome de Usuário" type="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <input placeholder="Senha" type="Password" value={senha} onChange={(event) => setSenha(event.target.value)} required />
          <br />
          <button className="botoes" type="submit"> Entrar </button>
          <br /><br />
          <Link to="./Cadastrar">
            <label>Crie sua conta</label>
          </Link>
          <br /><br />
          <Link to="./Recuperar">
            <label>Esqueçeu sua senha?</label>
          </Link>
        </form>
      </section>
    </Container>
  );
}
