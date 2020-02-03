import React, { useState, Fragment } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUsersForm';

const App = () => {
  //DATA
  const usersData = [
    { id: 1, name: 'Saulo', username: 'saulofilho' },
    { id: 2, name: 'Pablito', username: 'pablitoguacamole' },
    { id: 3, name: 'Rafa', username: 'rafafelix' }
  ];

  const initialFormState = { id: null, name: '', username: '' }

  //SETTING STATE
  const [users, setUsers] = useState(usersData)
  const [currentUser, setCurrentUser ] = useState(initialFormState)
  const [editing, setEditing] = useState(false)

  //CRUD operations
  /*
  ADD USER
  function will add new user to state
    setUsers is a function from useState
      use to update the user state
  */
  const addUser = user => {
    user.id = users.length + 1
    /*
      user object as parameter
        add them to the users array
      
      ...users code the previous users remain in the array
    */
    setUsers([...users, user])
  };

  //DELETE USER
  const deleteUser = id => {
    setEditing(false)
    setUsers(users.filter(user => user.id !== id ))
  };

  /*
  UPDATING A USER
  In class components, we would use the componentDidUpdate lifecycle method to achieve this, 
  but now we'll use an Effect Hook. 
  The Effect Hook is like componentDidMount and componentDidUpdate combined.
  */
  const updateUser = (id, updateUser) => {
    setEditing(false)
    setUsers(users.map(user => (user.id === id ? updateUser : user)))
  }
  

  const editRow = user => {
    setEditing(true)
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  return (
    <div className="container">
      <h1>
        CRUD App with React Hooks
      </h1>
      <div className="flex-row">
				<div className="flex-large">
					{editing ? (
						<Fragment>
							<h2>Edit user</h2>
							<EditUserForm
								editing={editing}
								setEditing={setEditing}
								currentUser={currentUser}
								updateUser={updateUser}
							/>
						</Fragment>
					) : (
						<Fragment>
							<h2>Add user</h2>
							<AddUserForm addUser={addUser} />
						</Fragment>
					)}
				</div>
				<div className="flex-large">
					<h2>View users</h2>
					<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
				</div>
			</div>
    </div>
  )
}

export default App;