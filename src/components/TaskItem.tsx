import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TaskUpdate } from './TasksList'

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

interface TasksItemProps {
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, newTitle} : TaskUpdate) => void;
  index: number;
  id: number;
  done: boolean;
  title: string;
}

export function TaskItem({ toggleTaskDone, removeTask, editTask, index, id, done, title }: TasksItemProps) {
  const [newTitle, setNewTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true);
    // setNewTitle(newTitle)
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setNewTitle(title);
  }

  function handleSubmitEditing() {
    editTask({taskId: id, newTitle: newTitle});
    setIsEditing(false);
  }

  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
            <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            //TODO - use onPress (toggle task) prop
            onPress={() => toggleTaskDone(id)}
            >
            <View 
                testID={`marker-${index}`}
                style = {done ? styles.taskMarkerDone : styles.taskMarker }
                //TODO - use style prop 
            >
                { done && (
                <Icon 
                    name="check"
                    size={12}
                    color="#FFF"
                />
                )}
            </View>

            <TextInput 
                //TODO - use style prop
                ref={textInputRef}
                style = {done ? styles.taskTextDone : styles.taskText}
                value={newTitle}
                onChangeText={setNewTitle}
                editable={isEditing}
                onSubmitEditing={handleSubmitEditing}
            
            >
            </TextInput>
            </TouchableOpacity>
        </View>

        <View style={ styles.iconsContainer } >
            { isEditing ? (
                <TouchableOpacity
                onPress={handleCancelEditing}
                >
                <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                onPress={handleStartEditing}
                >
                <Image source={editIcon} />
                </TouchableOpacity>
            ) }
            <View 
                style={ styles.iconsDivider }
            />

            <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(id)}
            >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24
  },
  iconsDivider: {
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    width: 1,
    height: 24,
    marginHorizontal: 12,
  }
})