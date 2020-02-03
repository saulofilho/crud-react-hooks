import React, { useState, useEffect } from 'react';

const EditUserForm = props => {
    const [user, setUser] = useState(props.currentUser)

    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({...user, [name]: value })
    }

    /*
    This is where the Effect Hook comes into place. 
    We want to let the EditUserForm component know the props have changed, 
    which we would have done before with componentDidUpdate.

    Using the [props] array is similar to using componentDidUpdate. 
    If you're doing a one-time event like componentDidMount, 
    you can pass an empty array ([]) instead.
    */
   useEffect(() => {
       setUser(props.currentUser)
   }, [props])

    return (
        <form
            onSubmit={event => {
                event.preventDefault()

                props.updateUser(user.id, user)
            }}
            >
            <label>Name</label>
            <input 
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                />
                <label>Username</label>
                <input 
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                    />
                <button>Update User</button>
                <button
                    onClick={() => props.setEditing(false)}
                    className="button muted-button"
                    >
                        Cancel
                    </button>
        </form>   
    )
}

export default EditUserForm;