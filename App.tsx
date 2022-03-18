import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

interface IToDo {
  text: string;
  completed: boolean;
}

export default function App() {
  const [value, setValue] = useState<string>("");
  const [toDoList, setToDoList] = useState<IToDo[]>([]);
  const [error, setError] = useState<Boolean>(false);

  const handleSubmit = (): void => {
    if (value.trim())
      setToDoList([...toDoList, { text: value, completed: false }]);
    else setError(true);
    setValue("");
  };

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDoList(newToDoList);
  }

  const toggleComplete = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].completed = !newToDoList[index].completed;
    setToDoList(newToDoList)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List </Text>
      <View style={styles.inputWrapper}> 
        <TextInput
        placeholder='Enter your task'
        value={value}
        onChangeText={e => {
          setValue(e);
          setError(false);
        }} 
        style={styles.inputBox}
        />
        <Button title='Add Task' onPress={handleSubmit} />
      </View>
      {error && (
      <Text style={styles.error}> Error: Input field is empty..</Text>
      )}
      <Text style={styles.subTitle}>Your Tasks: </Text>
      <StatusBar style="auto" />

      {toDoList.length === 0 && <Text>No tasks available</Text>}
      {toDoList.map((toDo: IToDo, index: number) => (
        <View style={styles.listItem} key={`${index}_${toDo.text}`}>
          <Text
            style={[
              styles.task,
              { textDecorationLine: toDo.completed ? "line-through" : "none" }
            ]}
          >
            {toDo.text}
          </Text>
          <Button
            title={toDo.completed ? "Completed" : "Complete"}
            onPress={() =>toggleComplete(index)}
          />
          <Button title="X" onPress={() => {
            removeItem(index);
          }} 
          color="crimson" 
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: "center",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputBox: {
    width: 200,
    borderColor: "purple",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "purple",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  addButton: {
    alignItems: "flex-end",
  },
  task: {
    width: 200,
  },
  error: {
    color: "red",
  },
});
