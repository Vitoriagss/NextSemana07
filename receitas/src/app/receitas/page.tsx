"use client";

import RecipeCard from "@/src/components/RecipeCard";
import { Recipe } from "@/src/lib/data";
import { Plus } from "lucide-react";
import { useState } from "react";
import { recipes} from "@/src/lib/data";

export default function ReceitasPage() {
  return (
    <main className="flex-grow py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">Todas as receitas</h1>

        <div className="grid grid-cols-3 gap-8 mt-8">
          {recipes.map((recipe) => (
            <RecipeCard key = {recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </main>
  )
}