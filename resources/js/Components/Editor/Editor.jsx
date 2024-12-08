import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
	DecoupledEditor,
	// FileLoader
} from 'ckeditor5';


import 'ckeditor5/ckeditor5.css';

import '../../../css/editor.css';
import { editorConfig } from './Config';
import useScreenSize from '@/Hooks/useScreenSize';

export default function Editor({htmlContent, onContentChange}) {
	const editorContainerRef = useRef(null);
	const editorMenuBarRef = useRef(null);
	const editorToolbarRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const [editor, setEditor] = useState(null);
	useEffect(() => {
		setIsLayoutReady(true);
		setEditor(htmlContent)
		return () => setIsLayoutReady(false);
	}, []);
	const { width, height } = useScreenSize();
    const smallScreen = width < 1024;


	return (
		<div>
			<div className="h-full main-containers">
				<div className="editor-container editor-container_document-editor editor-container_include-style" ref={editorContainerRef}>
					<div className="editor-container__menu-bar" ref={editorMenuBarRef}></div>
					<div className="editor-container__toolbar" ref={editorToolbarRef}></div>
					<div className="editor-container__editor-wrapper">
						<div className={!smallScreen && 'editor-container__editor'}>
							<div ref={editorRef}>
								{isLayoutReady && (
									<CKEditor
										onReady={editor => {
											editorToolbarRef.current.appendChild(editor.ui.view.toolbar.element);
											editorMenuBarRef.current.appendChild(editor.ui.view.menuBarView.element);
										}}
										onAfterDestroy={() => {
											Array.from(editorToolbarRef.current.children).forEach(child => child.remove());
											Array.from(editorMenuBarRef.current.children).forEach(child => child.remove());
										}}
										editor={DecoupledEditor}
										config={editorConfig}
										onChange={(event, editor) => {
											setEditor(editor.getData());
											onContentChange(editor.getData())
										}}
										data={editor}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
