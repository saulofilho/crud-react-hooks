import React, { useState } from 'react';

const AddUserForm = props => {
    const initialFormState = { id: null, name: '', username: ''};
    const [ user, setUser] = useState(initialFormState);

    /*
    function to update the state within the form. 
    event always gets passed through to any on event in the DOM, so you'll see that as the parameter of the function.
    Object destructuring will allow us to easily get the name (key) and value from the form. 
    we'll set the user much like we did on the App component, 
    except this time we're using computed property names to dynamically set the name (using [name]) and value
    */
    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    };

    return (
        /*
        The last thing to take care of is actually submitting the form back to the App component. 
        As we passed the function down with props, we're going to use props to access the function. 
        I'm going to write an onSubmit function, and we'll prevent the default form submission from firing. 
        I added a small bit of validation to make sure empty values cannot be submitted, 
        and sent the user through to the add function 
        I'm using the setter to reset the form to its initial value after successful submission.
        */
        <form
            onSubmit={event => {
                event.preventDefault()
                if (!user.name || !user.username) return

                props.addUser(user)
                setUser(initialFormState)
            }}>
            <label>Name</label>
            <input type="text" name="name" value={user.name} onChange={handleInputChange} />
            <label>Username</label>
            <input type="text" name="username" value={user.username} onChange={handleInputChange} />
            <button>Add New User</button>
        </form>
    )
};

export default AddUserForm;