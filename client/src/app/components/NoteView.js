import './noteView.css';

import React from "react";
import { useParams } from "react-router-dom";

import NotesService from "../services/notes.service";


const Note = () => {
  const { id } = useParams();
  const [note, setNote] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    NotesService.get(id).then((response) => {
      setNote({
        title: response.data.title,
        content: response.data.content,
        tags: response.data.tags,
        author: response.data.author,
      })
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.status === 404) {
        setErrorMessage({ status: 404, message: "Note not found" });
      } else if (error.response.status === 500) {
        setErrorMessage({ status: 500, message: "Internal server error" });
      } else if (error.response.status === 401) {
        setErrorMessage({ status: 401, message: "Unauthorized" });
      } else {
        setErrorMessage({ status: 400, message: "Bad request" });
      }
    });
  }
  , [id]);

  const EditButton = () => {
    if (note?.author === JSON.parse(localStorage.getItem("user")).id) {
      return (
        <div className="d-flex justify-content-end">
          <a href={`/notes/${id}/edit`} className="btn btn-dark m-3">
            Edit
          </a>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="container">
      {
        errorMessage? (
          <div className="alert alert-danger" role="alert">
            {errorMessage.message}
          </div>
        ) : (
          <div>
            <header className="jumbotron">
              <div className="tags mb-3">
                {note?.tags.map((tag) => {
                  return <span className="badge bg-secondary">{tag}</span>;
                }
                )}
              </div>
              <h1 className="title">{note?.title}</h1>
              <div className="container content">
                <div dangerouslySetInnerHTML={{ __html: note?.content }} />
              </div>
            </header>
            <EditButton />
          </div>
        )
      }
    </div>
  );
}

export default Note;