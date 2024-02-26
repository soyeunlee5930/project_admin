import { React, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.scss';

const Editor = () => {
  const quillRef = useRef();
  const [content, setContent] = useState('');

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link', 'image'],
        ],
      },
    };
  }, []);

  return (
    <div className="editor">
      <button className="editorBtn">Value</button>
      <ReactQuill
        className="editorContainer"
        placeholder="상품에 대한 상세 설명을 작성하세요"
        theme="snow"
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
      />
    </div>
  );
};

export default Editor;
