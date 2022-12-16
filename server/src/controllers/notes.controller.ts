// const config = require("../config/auth.config");
// import {db} from "../models";
// const Note = db.note;
// const User = db.user;

// export const create = (req: any, res: any) => {
//   const note = new Note({
//     title: req.body.title,
//     description: req.body.description,
//     content: req.body.content,
//     author: req.body.authorId,
//     collaborators: req.body.collaborators,
//     rating: req.body.rating,
//     tags: req.body.tags,
//     isPublic: req.body.isPublic,
//     sharedWith: req.body.sharedWith,
//   });

//   note.save((err: any, note: any) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     res.send({ message: "Note was created successfully!" });
//   });
// };

// export const findAllForUser = (req: any, res: any) => {
//   // The author can be the author, a collaborator, or a shared user
//   Note.find({
//     $or: [
//       {author: req.params.userId},
//       {collaborators: req.params.userId},
//       {sharedWith: {$elemMatch: {user: req.params.userId}}},
//     ],
//   })
//     .populate("author", "-password")
//     .populate("collaborators", "-password")
//     .populate("sharedWith.user", "-password")
//     .exec((err: any, notes: any) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       res.send(notes);
//     }
//   );
// };

// export const findPublicNotes = (req: any, res: any) => {
//   Note.find({isPublic: true})
//     .populate("author", "-password")
//     .populate("collaborators", "-password")
//     .populate("sharedWith.user", "-password")
//     .exec((err: any, notes: any) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       res.send(notes);
//     }
//   );
// };

// export const findOne = (req: any, res: any) => {
//   Note.findById(req.params.id)
//     .populate("author", "-password")
//     .populate("collaborators", "-password")
//     .populate("sharedWith.user", "-password")
//     .exec((err: any, note: any) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!note) {
//         return res.status(404).send({ message: "Note Not found." });
//       }

//       res.send(note);
//     }
//   );
// }

// export const update = (req: any, res: any) => {
//   Note.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title,
//       description: req.body.description,
//       content: req.body.content,
//       collaborators: req.body.collaborators,
//       rating: req.body.rating,
//       tags: req.body.tags,
//       isPublic: req.body.isPublic,
//       sharedWith: req.body.sharedWith,
//     },
//     { useFindAndModify: false }
//   )
//     .exec((err: any, note: any) => {
//       if (err) {
//         res.status(500).send({ message: err });
//         return;
//       }

//       if (!note) {
//         return res.status(404).send({ message: "Note Not found." });
//       }

//       res.send({ message: "Note was updated successfully!" });
//     }
//   );
// };

// export const remove = (req: any, res: any) => {
