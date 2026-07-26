"use client";

import InfoPill from "@/src/components/InfoPill";
import PreparationStep from "@/src/components/PreparationStep";
import api from "@/src/lib/api";
import { Recipe } from "@/src/lib/data";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default function ReceitaPage({ params }: RecipePageProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${params.id}`);

        setRecipe(response.data);
      } catch (error) {
        console.error("Erro ao requisitar receita", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  if (loading) {
    return (
      <main className="flex-grow py-8">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <p>Carregando receita...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!recipe) {
    return notFound();
  }

  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto">
        <Link
          className="flex text-orange-500 hover:text-orange-700 mb-6"
          href="/receitas"
        >
          <ChevronLeft />
          Voltar para receitas
        </Link>

        <section className="rounded-lg overflow-hidden shadow-md">
          {/* Imagem de capa da receita */}
          <div className="relative h-96 w-full">
            <Image
              src={recipe.image}
              fill
              alt={recipe.title}
              className="object-cover"
            />
          </div>

          {/* Descrição da receita */}
          <div className="flex flex-col gap-6 p-6">
            {/* titulo e descrição */}
            <div>
              <h1 className="text-3xl font-bold">{recipe.title}</h1>
              <p>{recipe.description}</p>
            </div>

            {/* Infos de preparo */}
            <div className="flex gap-4">
              <InfoPill title="Preparo" info={recipe.prepTime} />
              <InfoPill title="Cozimento" info={recipe.cookTime} />
              <InfoPill title="Porções" info={recipe.servings} />
              <InfoPill title="Categoria" info={recipe.category} />
            </div>

            {/* colunas */}
            <div className="grid grid-cols-2">
              {/* coluna dos ingredientes */}
              <div>
                <h2 className="text-xl font-bold mb-4">Ingredientes</h2>
                <ul className="list-disc list-inside space-y-2">
                  {recipe.ingredients.map((ingredient) => (
                    <li
                      key={ingredient.value}
                      className="marker:text-orange-500"
                    >
                      {ingredient.value}
                    </li>
                  ))}
                </ul>
              </div>

              {/* coluna do modo de preparo */}
              <div>
                <h2 className="text-xl font-bold mb-4">Modo de Preparo</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <PreparationStep
                      key={instruction.value}
                      index={index + 1}
                      description={instruction.value}
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