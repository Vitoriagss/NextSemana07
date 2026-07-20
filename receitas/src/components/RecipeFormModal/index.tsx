import { useFieldArray, useForm } from "react-hook-form";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "../ui/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import {RecipeFormData,recipeSchema,} from "@/src/lib/formValidationSchemas/recipeSchema";

interface RecipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_VALUES: RecipeFormData = {
  title: "",
  category: "",
  description: "",
  imageURL: "",
  prepTime: "",
  cookTime: "",
  servings: 1,
  ingredients: [{ value: "" }],
  instructions: [{ value: "" }],
}

export default function RecipeFormModal({
  isOpen,
  onClose,
}: RecipeFormModalProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RecipeFormData>({
    resolver: yupResolver(recipeSchema),
    mode: "onSubmit",
    defaultValues: DEFAULT_VALUES
  });

  const {
    fields: ingredientFields,
    append: appendIngredients,
    remove: removeIngredients,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const onSubmit = (data: RecipeFormData) => {
    console.log(data);
    reset();
    onClose();
  };

  const inputStyle = "p-2 border border-zinc-200 rounded-md flex-grow";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white min-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova receita</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-2 gap-2">
            {/* Titulo */}
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Título</label>
              <input
                className={inputStyle}
                type="text"
                id="title"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-sm text-red-500">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Categoria */}
            <div className="flex flex-col gap-1">
              <label htmlFor="category">Categoria</label>
              <input
                className={inputStyle}
                type="text"
                id="category"
                {...register("category")}
              />
              {errors.category && (
                <span className="text-sm text-red-500">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Descrição</label>
            <textarea
              className={inputStyle}
              id="description"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* URL da imagem */}
          <div className="flex flex-col gap-1">
            <label htmlFor="imageUrl">URL da imagem</label>
            <input
              type="text"
              className={inputStyle}
              id="imageUrl"
              placeholder="/placeholder.svg"
              {...register("imageURL")}
            />
            {errors.imageURL && (
              <span className="text-sm text-red-500">
                {errors.imageURL.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Tempo de preparo */}
            <div className="flex flex-col gap-1">
              <label htmlFor="prepTime">Tempo de preparo</label>
              <input
                className={inputStyle}
                type="text"
                id="prepTime"
                placeholder="15 minutos"
                {...register("prepTime")}
              />
              {errors.prepTime && (
                <span className="text-sm text-red-500">
                  {errors.prepTime.message}
                </span>
              )}
            </div>

            {/* Tempo de cozimento */}
            <div className="flex flex-col gap-1">
              <label htmlFor="cookTime">Tempo de cozimento</label>
              <input
                className={inputStyle}
                type="text"
                id="cookTime"
                placeholder="30 minutos"
                {...register("cookTime")}
              />
              {errors.cookTime && (
                <span className="text-sm text-red-500">
                  {errors.cookTime.message}
                </span>
              )}
            </div>

            {/* Porções */}
            <div className="flex flex-col gap-1">
              <label htmlFor="servings">Porções</label>
              <input
                className={inputStyle}
                type="number"
                id="servings"
                defaultValue={1}
                {...register("servings")}
              />
              {errors.servings && (
                <span className="text-sm text-red-500">
                  {errors.servings.message}
                </span>
              )}
            </div>
          </div>

          {/* Lista de ingredients */}
          <div className="flex flex-col gap-1">
            <label htmlFor="ingredients">Ingredientes</label>
            <div className="flex flex-col gap-1">
              {/* conteúdo */}
              {ingredientFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 w-full">
                  <input
                    id="ingredients"
                    type="text"
                    className={inputStyle}
                    placeholder="Digite um ingrediente"
                    {...register(`ingredients.${index}.value`)}
                  />
                  {ingredientFields.length > 1 && (
                    <button
                      type="button"
                      className="bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium"
                      onClick={() => removeIngredients(index)}
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium w-fit"
                onClick={() => appendIngredients({ value: "" })}
              >
                Adicionar ingrediente
              </button>
            </div>
          </div>

          {/* Lista de instruções */}
          <div className="flex flex-col gap-1">
            <label htmlFor="instructions">Instruções</label>
            <div className="flex flex-col gap-1">
              {/* conteúdo */}
              {instructionFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 w-full">
                  <textarea
                    id="instructions"
                    className={inputStyle}
                    placeholder="Digite uma instrução"
                    {...register(`instructions.${index}.value`)}
                  />
                  {ingredientFields.length > 1 && (
                    <button
                      type="button"
                      className="bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium h-fit"
                      onClick={() => removeInstructions(index)}
                    >
                      Remover
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                className="bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium w-fit"
                onClick={() => appendInstructions({ value: "" })}
              >
                Adicionar instrução
              </button>
            </div>
          </div>

          <div className="flex gap-2 self-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-zinc-300 rounded-md hover:bg-gray-100 transition-colors px-4 py-2 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-black rounded-md text-white hover:bg-gray-800 transition-colors px-4 py-2 font-medium"
            >
              Criar receita
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}