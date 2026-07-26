"use client";

import { Recipe } from "@/src/lib/data";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RecipeCard({ recipe, onEdit, onDelete }: RecipeCardProps) {

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onEdit();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDelete();
  };

  // Garante que o caminho da imagem sempre comece com '/' ou 'http'
  const imageSrc = recipe.image
    ? (recipe.image.startsWith("http") || recipe.image.startsWith("/")
        ? recipe.image
        : `/${recipe.image}`)
    : "/placeholder.png";

  return (
    <Link href={`/receitas/${recipe.id}`}>
      <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Imagem */}
        <div className="relative h-48 w-full">
          <Image 
            src={imageSrc} 
            fill 
            alt={recipe.title} 
            className="object-cover"
          />
        </div>

        <div className="flex flex-col p-4 gap-6">
          {/* Titulo e descrição */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold hover:text-orange-500 transition-colors">
              {recipe.title}
            </h3>
            <p className="text-gray-600 line-clamp-2">{recipe.description}</p>
          </div>

          {/* Categoria e ações */}
          <div className="flex items-center justify-between w-full">
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {recipe.category}
            </span>

            <div className="flex gap-2">
              {/* botão de editar */}
              <button 
                type="button" 
                onClick={handleEdit} 
                className="p-2 border border-gray-200 rounded hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <Edit size={16}/>
              </button>

              {/* botão de remover */}
              <button 
                type="button" 
                onClick={handleDelete} 
                className="p-2 border border-gray-200 rounded hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <Trash2 size={16}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}