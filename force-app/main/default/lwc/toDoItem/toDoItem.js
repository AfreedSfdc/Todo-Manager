import { LightningElement,api } from 'lwc';
import updateTodo from "@salesforce/apex/ToDoController.updateTodo";
import deleteTodo from "@salesforce/apex/ToDoController.deleteTodo";

export default class ToDoItem extends LightningElement {
    @api todoId;
    @api todoName;
    @api done = false;

    get containerClass(){
        return this.done ? "todo completed" : "todo upcoming";
    }

    get iconName(){
        return this.done ? "utility:check" : "utility:add";
    }

    updateHandler(){
        console.log('Update Block');
        const todo = {
            todoId : this.todoId,
            todoName : this.todoName,
            done : !this.done
        }

        updateTodo({payload:JSON.stringify(todo)})
        .then(response => {
            console.log('Updated Successfully.');
            const updateEvent = new CustomEvent('update');
            this.dispatchEvent(updateEvent);
        }).catch(error => {
            console.error('Error in update todo item=> ',error);
        });
    }

    deleteHandler(){
        console.log('Delete Block');
        deleteTodo({todoId:this.todoId})
        .then(response => {
            console.log('Todo item deleted Successfully.');
            const deleteEvent = new CustomEvent('delete');
            this.dispatchEvent(deleteEvent);
        }).catch(error => {
            console.error('Error in delete todo item=> ',error);
        });
    }
}