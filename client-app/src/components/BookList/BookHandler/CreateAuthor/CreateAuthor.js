import classes from "./CreateAuthor.module.css";
import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_AUTHOR = gql`
    mutation AddAuthor($name: String!, $age: Int!) {
        addAuthor(name: $name, age: $age) {
            _id
            name
        }
    }
`;

const CreateAuthor = (props) => {
    const [addAuthor, { data: newAuthor }] = useMutation(ADD_AUTHOR);
    const [authorName, setAuthorName] = useState("");
    const [age, setAge] = useState("");
    const createAuthor = () => {
        if (age && authorName) {
            addAuthor({ variables: { name: authorName, age: parseInt(age) } });
            setAuthorName("");
            setAge("");
        } else {
            alert("Unable to create author. Please complete all the fields.");
        }
    };
    useEffect(() => {
        if (newAuthor && newAuthor.addAuthor) {
            props.onAuthorCreated(newAuthor.addAuthor);
        }
    }, [newAuthor]);
    return (
        <div className={classes.CreateAuthor}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createAuthor();
                }}
            >
                <label htmlFor="aname">Author Name</label>
                <input
                    type="text"
                    id="aname"
                    name="Authorname"
                    placeholder="Author name.."
                    value={authorName}
                    onChange={(event) => {
                        setAuthorName(event.target.value);
                    }}
                />

                <label htmlFor="age">Age</label>
                <input
                    type="text"
                    id="age"
                    name="age"
                    placeholder="Age.."
                    value={age}
                    onChange={(event) => {
                        setAge(event.target.value);
                    }}
                />

                <input type="submit" value="Create" />
            </form>
        </div>
    );
};

export default CreateAuthor;
