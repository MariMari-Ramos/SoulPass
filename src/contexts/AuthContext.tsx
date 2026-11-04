import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Usuario } from "../types/api";
import {
  buscarUsuarioPorId,
  cadastrarUsuario,
  fazerLogin,
} from "../services/usuarioService";

interface AuthContextData {
  usuario: Usuario | null;
  carregando: boolean;
  login: (email: string, senha: string) => Promise<void>;
  cadastro: (dados: {
    nome: string;
    email: string;
    senha: string;
    cpf?: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarSessao() {
      const idSalvo = localStorage.getItem("idUsuario");

      if (!idSalvo) {
        setCarregando(false);
        return;
      }

      try {
        const usuarioSalvo = await buscarUsuarioPorId(Number(idSalvo));
        setUsuario(usuarioSalvo);
      } catch {
        localStorage.removeItem("idUsuario");
      } finally {
        setCarregando(false);
      }
    }

    carregarSessao();
  }, []);

  async function login(email: string, senha: string) {
    const usuarioAutenticado = await fazerLogin({ email, senha });

    setUsuario(usuarioAutenticado);
    localStorage.setItem("idUsuario", String(usuarioAutenticado.idUsuario));
  }

  async function cadastro(dados: {
    nome: string;
    email: string;
    senha: string;
    cpf?: string;
  }) {
    const novoUsuario = await cadastrarUsuario(dados);

    setUsuario(novoUsuario);
    localStorage.setItem("idUsuario", String(novoUsuario.idUsuario));
  }

  function logout() {
    setUsuario(null);
    localStorage.removeItem("idUsuario");
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        login,
        cadastro,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error(
      "useAuth deve ser utilizado dentro de um AuthProvider."
    );
  }

  return contexto;
}