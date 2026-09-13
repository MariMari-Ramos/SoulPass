import Atividade from "../../components/Atividade/Atividade";
import { useEffect, useState } from "react";

const atividades = [
  {
    id: 1,
    titulo: "Transporte público",
    descricao: "Viagem registrada utilizando transporte público.",
    pontos: 100,
  },
  {
    id: 2,
    titulo: "Bicicleta compartilhada",
    descricao: "Viagem registrada utilizando uma bicicleta compartilhada.",
    pontos: 150,
  },
  {
    id: 3,
    titulo: "Ação sustentável",
    descricao: "Atividade sustentável registrada na plataforma.",
    pontos: 200,
  },
];

function Feed() {
  const [pontos, setPontos] = useState(1000);
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="px-6 py-10 md:px-10 lg:px-16">
      <section className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Meu Feed</h1>

        <p className="mt-3 text-base text-white/80 md:text-lg">
          Acompanhe suas atividades e seus pontos no SoulPass.
        </p>
      </section>

      <section className="mx-auto mt-8 max-w-5xl">
        <div className="rounded-2xl bg-[#2d2d2d] p-6">
          <p className="text-sm text-white/70">Seu saldo</p>

          <p className="mt-2 text-3xl font-bold text-[#6bdcd6]">
            {pontos} pontos
          </p>
        </div>
      </section>

      {carregando ? (
        <p className="mt-10 text-center text-white">Carregando atividades...</p>
      ) : (
        <section className="mx-auto mt-10 max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-[#6bdcd6]">
            Suas atividades
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {atividades.map((atividade) => (
              <Atividade
                key={atividade.id}
                titulo={atividade.titulo}
                descricao={atividade.descricao}
                pontos={atividade.pontos}
                onRegistrar={() =>
                  setPontos((pontosAtuais) => pontosAtuais + atividade.pontos)
                }
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Feed;
