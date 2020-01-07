import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list';
  public todos: Todo[] = [];
  public title: string = 'Lista de Tarefas';
  public form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.load();
  }

  add() {
    // obter o title do HTML
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  alteraTexto() {
    this.title = 'Teste';
  }

  remove(todo: Todo) {
    // Obetem o index da minha lista todo
    const index = this.todos.indexOf(todo);

    if (index != -1) {
      //Remover item da minha lista, 
      //paasando o index e o numero de registros a ser deletado 
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    //Recebo o obj como referência e sem a necessidade de passar o index que necessita
    //ser alterado
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  //Persiste os dados no local storage
  save() {
    //JSON.stringify convert objeto JSON em string
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode ='list';
  }

  //Lê os dados salvos nos local storage
  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      //JSON.parse convert objeto string em JSON
      this.todos = JSON.parse(data);
    }
    else {
      this.todos = [];
    }
  }

  changeMode(mode: string){
    this.mode = mode;
  }


}
