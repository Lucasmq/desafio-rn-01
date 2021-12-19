import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList, TaskUpdate } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(task => task.title === newTaskTitle);

    if(foundTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [
          {
            text: "Ok",
          }
        ]
      );

      return;
    }

    const newTask = {
      id : Number(new Date().getTime()),
      title : newTaskTitle,
      done : false
    } as Task;

    setTasks(oldTasks => [...oldTasks, newTask ]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const tasksUpdated = tasks.map(task => ({...task})); //copia o array, nao usa a referencia
    const foundTask = tasksUpdated.find(task => task.id === id);

    if(!foundTask)
      return;

    foundTask.done = !foundTask.done;
    setTasks(tasksUpdated);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover Tarefa",
      "Tem certeza que deseja remover essa tarefa?",
      [
        {
          text: "Sim",
          onPress: () =>  setTasks(oldTasks => [...oldTasks.filter(task => task.id !== id)])
        },
        {
          text: "Não",
          style: "cancel"
        }
      ]
    );
  }

  function handleEditTask({taskId, newTitle} : TaskUpdate) {
    const tasksUpdated = tasks.map(task => ({...task})); //copia o array, nao usa a referencia
    const foundTask = tasksUpdated.find(task => task.id === taskId);

    if(!foundTask)
      return;

    foundTask.title = newTitle;
    setTasks(tasksUpdated);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})