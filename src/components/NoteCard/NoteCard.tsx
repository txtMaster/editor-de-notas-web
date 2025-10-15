import React from 'react'
import type { Note } from '../../types/Note';
import s from './NoteCard.module.css'
import type { OutCSS } from '../../types/OutCSS';

type Prop = OutCSS & {
    note: Note;
    onClick ?:React.MouseEventHandler<HTMLDivElement>;
}

export const NoteCard: React.FC<Prop> = ({note,onClick,className=""}) => {
  const {title,content} = note;
  return (
    <div className={`notecard ${s.root} ${className}`} onClick={onClick}>
        <div className={`title ${s.title}`}>{title}</div>
        <div className={`content ${s.content}`}>{content}</div>
    </div>
  )
}
