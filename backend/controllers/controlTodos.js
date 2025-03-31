import responder from "../utils/utils.js";
import Todo from "../models/TodoModel.js"
import User from "../models/UserModel.js"

const addTodo = async (req, res) => {
    try {
        let { date, title, description, userId} = req.body


        if (!date || !title || !description || !userId) {
            return responder(res, "All fields are required", null, 400, false);
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return responder(res, "User not found", null, 404, false);
        }

        // Create new Todo and link it to the user
        const newTodo = new Todo({ date, title, description, user: userId });
        const savedTodo = await newTodo.save();

        if (!savedTodo) {
            return responder(res, "Failed to save Todo", null, 500, false);
        }

        // Push the Todo ID to the user's `myTodos` array
        User.myTodos.push(savedTodo._id);
        await User.save();

        return responder(res, "Todo added successfully", savedTodo, 201, true);
    } catch (error) {
        console.error("Error adding todo:", error);
        return responder(res, error.message, null, 500, false);
    }
};


const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; 

        if (!id) {
            return responder(res, "Todo ID is required", null, 400, false);
        }

        
        const todo = await Todo.findOne({ _id: id, user: userId });
        if (!todo) {
            return responder(res, "Todo not found or not authorized to delete", null, 404, false);
        }

        
        await Todo.findByIdAndDelete(id);

      
        await User.findByIdAndUpdate(userId, { $pull: { myTodos: id } });

        return responder(res, "Todo deleted successfully", null, 200, true);
    } catch (error) {
        return responder(res, error.message, null, 500, false);
    }

}


const updateTodoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; 

        
        const todo = await Todo.findOne({ _id: id, user: userId });
        if (!todo) {
            return responder(res, "Todo not found or not authorized to update", null, 404, false);
        }

        
        todo.status = !todo.status; 
        await todo.save();

        return responder(res, "Todo status updated successfully", todo, 200, true);
    } catch (error) {
        return responder(res, error.message, null, 500, false);
    }

}


const getuserTodos = async (req, res) => {
    try {
        const userId = req.user.id; 

        const user = await User.findById(userId).populate("myTodos");

        if (!user) {
            return responder(res, "User not found", null, 404, false);
        }

        return responder(res, "User todos fetched successfully", user.myTodos, 200, true);
    } catch (error) {
        return responder(res, error.message, null, 500, false);}}





export { addTodo, deleteTodo ,updateTodoStatus, getuserTodos }