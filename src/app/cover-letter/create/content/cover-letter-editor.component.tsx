import React, { RefObject, useEffect, useRef } from 'react';
import styles from './generated-cover-letter.module.scss';


export type CoverLetterEditor = {
  onChange?: (value: string) => void,
  generatedContent: string,
  textareaRef: RefObject<HTMLTextAreaElement>
}

function createTypingEffect(i = 0, text: string, ref: HTMLTextAreaElement) {
  if (i < text.length) {
    ref.value = ref.value += text.charAt(i);
    ref.classList.add('.typing');
    i++;
    setTimeout(() => createTypingEffect(i, text, ref), Math.floor(Math.random()*16));
  } else {
    ref.classList.remove('.typing');
  }
}

export default function CoverLetterEditor({ onChange, generatedContent, textareaRef }: CoverLetterEditor) {

  useEffect(() => {
    if (!generatedContent || !textareaRef.current) {
      return;
    }
    let i = 0;
    textareaRef.current.readOnly = false;
    textareaRef.current.value = '';
    createTypingEffect(i, generatedContent, textareaRef.current);
  }, [generatedContent]);

  return (
    <>
      <textarea
        className={styles['cover-letter-content']}        
        placeholder="Generated cover letter"
        ref={textareaRef}
        readOnly>
      </textarea>
    </>
  )
}
