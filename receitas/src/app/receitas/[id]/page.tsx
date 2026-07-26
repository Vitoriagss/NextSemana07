import InfoPill from "@/src/components/InfoPill";
import PreparationStep from "@/src/components/PreparationStep";
import api from "@/src/lib/api";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface RecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReceitaPage({ params }: RecipePageProps) {
  const resolvedParams = await params;
  let recipe = null;

  try {
    //Busca a receita diretamente da API
    const response = await api.get(`/recipes/${resolvedParams.id}`);
    recipe = response.data;
  } catch (error) {
    // Se a API retornar 404, cai no notFound() do Next.js
    return notFound();
  }

  if (!recipe) {
    return notFound();
  }

  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto">
        <Link className="flex text-orange-500 hover:text-orange-700 mb-6" href="/receitas">
          <ChevronLeft />
          Voltar para receitas
        </Link>

        <section className="rounded-lg overflow-hidden shadow-md">
          {/* Imagem de capa da receita */}
          <div className="relative h-96 w-full">
            <Image
              src={recipe.image}
              fill
              alt={recipe.title || recipe.name}
              className="object-cover"
            />
          </div>

          {/* Descrição da receita */}
          <div className="flex flex-col gap-6 p-6">
            {/* Título e descrição */}
            <div>
              <h1 className="text-3xl font-bold">{recipe.title || recipe.name}</h1>
              <p>{recipe.description}</p>
            </div>

            {/* Infos de preparo */}
            <div className="flex gap-4">
              <InfoPill title="Preparo" info={recipe.prepTime} />
              <InfoPill title="Cozimento" info={recipe.cookTime} />
              <InfoPill title="Porções" info={recipe.servings} />
              <InfoPill title="Categoria" info={recipe.category} />
            </div>

            {/* Colunas */}
            <div className="grid grid-cols-2 gap-8">
              {/* Coluna dos ingredientes */}
              <div>
                <h2 className="text-xl font-bold mb-4">Ingredientes</h2>
                <ul className="list-disc list-inside space-y-2">
                  {recipe.ingredients?.map((ingredient: string) => (
                    <li key={ingredient} className="marker:text-orange-500">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coluna do modo de preparo */}
              <div>
                <h2 className="text-xl font-bold mb-4">Modo de Preparo</h2>
                <ol className="space-y-4">
                  {recipe.instructions?.map((instruction: string, index: number) => (
                    <PreparationStep
                      key={instruction}
                      index={index + 1}
                      description={instruction}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}