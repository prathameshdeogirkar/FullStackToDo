import responder from "../utils/utils.js";
import Todo from "../models/TodoModel.js"
import User from "../models/UserModel.js"

const addTodo = async (req, res) => {
    try {
        let { date, title, description, addedTime } = req.body;
        const userId = req.user.id; // Extract user ID from JWT

        if (!date || !title || !description || !addedTime) {
            return responder(res, "All fields are required", null, 400, false);
        }

        // Create new Todo
        const newTodo = new Todo({ date, title, description, addedTime, user: userId });
        const savedTodo = await newTodo.save();

        if (!savedTodo) {
            return responder(res, "Something went wrong", null, 500, false);
        }

        // Add Todo ID to User's myTodos array
        await User.findByIdAndUpdate(userId, { $push: { myTodos: savedTodo._id } });

        return responder(res, "Todo added successfully", savedTodo, 201, true);
    } catch (error) {
        return responder(res, error.message, null, 500, false);
    }


}


const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Get user ID from JWT

        if (!id) {
            return responder(res, "Todo ID is required", null, 400, false);
        }

        // Find Todo by ID and check if it belongs to the current user
        const todo = await Todo.findOne({ _id: id, user: userId });
        if (!todo) {
            return responder(res, "Todo not found or not authorized to delete", null, 404, false);
        }

        // Delete the Todo
        await Todo.findByIdAndDelete(id);

        // Remove the Todo ID from the user's myTodos array
        await User.findByIdAndUpdate(userId, { $pull: { myTodos: id } });

        return responder(res, "Todo deleted successfully", null, 200, true);
    } catch (error) {
        return responder(res, error.message, null, 500, false);
    }

}


const updateTodoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Get user ID from JWT

        // Find the Todo and check if it belongs to the current user
        const todo = await Todo.findOne({ _id: id, user: userId });
        if (!todo) {
            return responder(res, "Todo not found or not authorized to update", null, 404, false);
        }

        // Update the status of the Todo (or any other field)
        todo.status = !todo.status; // Toggle the status
        await todo.save();

        return responder(res, "Todo status updated successfully", todo, 200, true);
    } catch (error) {
        return responder(res, error.message, null, 500, false);
    }

}





export { addTodo, deleteTodo ,updateTodoStatus}