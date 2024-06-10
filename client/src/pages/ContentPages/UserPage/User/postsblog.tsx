import  { useState, useEffect } from 'react';
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'setimmediate';
import { Input } from "@/components/ui/input";
import ButtonComponent from '@/components/ButtonComponent/Button'
export default function PostsBlog() {
  const note = {
    id: "9999",
    content: '<p>dasdasdasdasdasdasdasda</p>',
  };

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [rawHTML, setRawHTML] = useState(note.content);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    if (isMounted) {
      setEditorState(EditorState.createWithContent(state));
    }
  }, [note.id, isMounted]);

  const handleOnChange = (e :EditorState) => {
    if (isMounted) {
      setEditorState(e);
      setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
    }
  };

  useEffect(() => {
    if (isMounted) {
      setRawHTML(note.content);
    }
  }, [note.content, isMounted]);

  return (
    <div className="container mt-[60px] w-full">
      <div className=" mb-6 flex justify-between items-center">
        <div className='w-full] border-0'>
        <Input className="p-3 w-full border-0 text-[30px]" type="text" placeholder="Tiêu đề" />
        </div>
        <div>
        <ButtonComponent className='' style={{margin: '0', borderRadius:'10px'}}>Đăng bài</ButtonComponent>
        </div>
      </div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleOnChange}
        placeholder="Nhập mô tả vào đây"
      />
    </div>
  );
}
