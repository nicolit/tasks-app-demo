import React, { FormEvent } from 'react';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import {Modal} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import styles from './card-form.module.css';

const TaskForm = ({isVisible, handleClose, addTask, updateTask, task, type}) => {
    const [description, setDescription] = React.useState('');
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
      if (task && task.description){
        setDescription(task.description);
      }
    }, [task]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (description !== '') {
        if (task && task.id){
          updateTask(task.id, description);
        } else {
          addTask(type, description);
        }
        
        setDescription('');
        setError(false);
      } else {
        setError(true);
      }
      handleClose();
    };
  
    const handleChange = (e) => {
      setDescription(e.target.value);
    };
  
    const renderText = () => {
      return(
      <form onSubmit={handleSubmit} className={styles.container}>
        <TextField
          label="Task"
          onChange={handleChange}
          value={description}
          error={error}
          placeholder="Fix bugs"
          multiline={true}
          rows={1}
          rowsMax={3}
          type="text"
          maxLength={500}
        />
      </form>
    );
      }

    return(
      <Modal show={isVisible} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{task ? "Update Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {renderText()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSubmit} type={'submit'}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
  };
  
  export default TaskForm;