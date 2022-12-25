import './noteCreator.css';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { useParams } from "react-router-dom";

import NotesService from '../services/notes.service';

import { WithContext as ReactTags } from 'react-tag-input';

const MenuBarEditor = ({ editor }) => {
  if (!editor) return null

  return (
    <>
    <div className='d-flex flex-wrap barRow'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </button>
    </div>
    <div className='d-flex flex-wrap barRow'>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active paragraph-style' : 'paragraph-style'}
      >
        h6
      </button>
    </div>
    <div className='d-flex flex-wrap barRow'>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
    </div>
    <div className='d-flex flex-wrap barRow'>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
      >
        redo
      </button>
    </div>
    </>
  )
}

// Fill the title, editor and tags with the note data
const Tags = ({ tags, setTags }) => {
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  }

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  }

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  }

  return (
    <div className='tags'>
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
        inputFieldPosition='top'
      />
    </div>
  )
}

const Editor = () => {
  const [errorMessage, setErrorMessage] = React.useState('')

  const id = useParams().id

  const [title, setTitle] = React.useState('')
  const [tags, setTags] = React.useState([])

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  })

  React.useEffect(() => {
    NotesService.get(id).then((response) => {
      setTitle(response.data.title)
      editor.chain().focus().setContent(response.data.content).run()
      response.data.tags.forEach((tag) => {
        setTags((tags) => [...tags, { id: tag, text: tag }])
      })
    }).catch((error) => {
      setErrorMessage(error.response.data.message)
    })
  }, [id, editor])
  
  const saveNote = () => {
    NotesService.update(id, title, editor.getHTML(), tags.map((tag) => tag.text)).then(
      (response) => {
        console.log(response.data)
        if (response.status === 200) {
          window.location.href = `/notes/${id}`
        }
      },
      (error) => {
        setErrorMessage(error.response.data.message)
      }
    )
  }

  return (
    <>
      <div className='row'>
        <div className='col-8'>
          <div className='title'>
            <input
              type='text'
              className='form-control'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className='col-4'>
          <div className='config d-flex justify-content-end'>
            <button
              className='btn btn-outline-secondary'
            >
              config
            </button>
          </div>
        </div>
      </div>
      <MenuBarEditor editor={editor} />
      <EditorContent editor={editor} />
      <div className='row'>
        <div className='col-8'>
          <div className='tags'>
            <Tags tags={tags} setTags={setTags} />
          </div>
        </div>
        <div className='col-4'>
          <div className='d-flex justify-content-end'>
            <button
              className='btn btn-outline-secondary'
              onClick={() => saveNote()}
            >
              save
            </button>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className='alert alert-danger' role='alert'>
          {errorMessage}
        </div>
      )}
    </>
  )
}

export default Editor