import responder from "../utils/utils.js";
import Todo from "../models/TodoModel.js"

const addTodo = async (req, res) => {
    try {
        let { date, title, description, addedTime } = req.body;
        const reqBody = ["date", "title", "description", "addedTime"];

        for (const elem of reqBody) {
            if (!req.body[elem]) {
                return responder(res, `${elem} is required`, null, 401, false)
            }
        }

        const addedTodo = new Todo({
            date, title, description, addedTime
        })

        if (!addedTodo) {
            return responder(res, "some thing went wrong", null, 500, false);
        } else {
            let savedTodo = await addedTodo.save();
            return responder(res, "todo added successfully", savedTodo, 200, true);
        }

    } catch (error) {
        return responder(res, error.message, null, 500, false);
    }

}


const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return responder(res, "id is required", null, 401, false);
        }
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return responder(res, "todo not found", null, 404, false);
        } else {
            return responder(res, "todo deleted successfully", deletedTodo, 200, true);
        }
    } catch (error) {
        return responder(res, error.message, null, 500, false);
    }
}


const updateTodoStatus = async (req, res) => {
    let { id } = req.params;
    try {
        let todo = await Todo.findById(id);
        todo.status = !todo.status;
        await todo.save();
        return responder(res, "todo status updated successfully", todo, 200, true);
    } catch (error) {
        return responder(res, error.message, null, 500, false);
    }

}





export { addTodo, deleteTodo ,updateTodoStatus}