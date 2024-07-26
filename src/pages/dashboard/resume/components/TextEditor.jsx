import { useState } from 'react';
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  EditorProvider,
  Editor,
  Toolbar,
} from 'react-simple-wysiwyg';

const TextEditor = () => {
  const [value, setValue] = useState('');

  return (
    <EditorProvider>
      <Editor value={value} onChange={(e) => setValue(e.target.value)}>
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <BtnNumberedList />
          <BtnBulletList />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
};

export default TextEditor;
