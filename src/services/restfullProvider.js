import http from "../http-common";

class restfullProvider {
    getAllRecipes() {
        return http.get('/recipes')
    }

    getRecipeById(id) {
        return http.get(`/recipe/${id}`)
    }

    updateRecipe() {
        return http.put()
    }

    deleteRecipe(id) {
        return http.delete(`/recipe/${id}`)
    }

    createRecipe(recipe) {
        return http.post('/recipes', recipe)
    }
}

export default new restfullProvider();