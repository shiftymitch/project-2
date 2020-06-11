$(document).ready(function () {

    //! Input & Button Refs
    let recipeName = "";
    let recipeDesc = "";
    let ingQty = "";
    let ingMsr = "";
    let ingName = "";
    let instructions = "";
    let imgUploadBtn = $("input#img-upload");
    let recipeSubmit = $("button#recipe-submit");
    
    //! get input values, then submit
    recipeSubmit.on("click", () => {

        recipeName = $("input#recipe-name").val();
        recipeDesc = $("textarea#recipe-description").val();
        instructions = $("textarea#instructions").val();
        ingQty = $("input#ing-qty").val();
        ingMsr = $("select#ing-measurement").children("option:selected").val(),
        ingName = $("input#ing-name").val();

        if (recipeName === "" || recipeDesc === "" || ingQty === "" || ingName === "" || instructions === "") {
            return;
        } 

        addRecipe(recipeName, recipeDesc, instructions);
        addIngredients(ingQty, ingMsr, ingName);
        
    })

    //! send newRecipe & newIngredients on submit
    function addRecipe(title, description, instructions) {
        $.post("/api/add-recipe", {
            title: title,
            description: description,
            instructions: instructions
        })
        .then(() => {
            console.log("recipe added")
        })
    }
    
    function addIngredients(qty, measurement, ingredient) {
        $.post("/api/add-ingredient", {
            qty: qty,
            measurement: measurement,
            ingredient: ingredient
        })
        .then(() => {
            res.redirect(307, "/profile");
        })
        .catch();
    }
});