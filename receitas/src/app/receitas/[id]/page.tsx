import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

export default function ReceitaPage() {
  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto">
        <Link className="flex text-orange-500 hover:text-orange-700 mb-6" href="/receitas">
          <ChevronLeft />
          Voltar para receitas
        </Link>

        <section>
          {/* Imagem de capa da receita */}
          <div className="relative h-96 w-full">
            <Image
              src=" "
              fill
              alt="Titulo da receita"
            />
          </div>

          {/* Descrição da receita */}
          <div>
            {/* titulo e descrição */}
            <div>
              <h1>Titulo da receita</h1>
              <p>Descrição</p>
            </div>

            {/* Infos de preparo */}
            <div>
                {/* TODO: componentes info */}
            </div>

            {/* colunas */}
            <div>
              {/* coluna dos ingredientes */}
              <div>
            
              </div>

              {/* coluna do modo de preparo */}
              <div>
                {/* TODO: componentes de passo de preparo*/}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}