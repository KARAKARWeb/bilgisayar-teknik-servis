'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link2, 
  Image as ImageIcon,
  Heading1,
  Heading2,
  Quote,
  Eye,
  EyeOff
} from 'lucide-react'

interface EditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function Editor({ content, onChange, placeholder = 'İçerik yazın...' }: EditorProps) {
  const [showPreview, setShowPreview] = useState(true)
  
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: null,
          target: null,
        },
      }),
      Image,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] p-4',
      },
    },
  })

  if (!editor) {
    return null
  }

  const addLink = () => {
    const url = window.prompt('URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const addImage = () => {
    const url = window.prompt('Resim URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">İçerik Editörü</h3>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showPreview ? 'Önizlemeyi Gizle' : 'Önizlemeyi Göster'}
        </button>
      </div>

      <div className={`grid gap-4 ${showPreview ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Editor */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="flex flex-wrap gap-1 border-b border-gray-200 p-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded p-2 hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
              title="Kalın"
            >
              <Bold className="h-4 w-4" />
            </button>
            
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`rounded p-2 hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
              title="İtalik"
            >
              <Italic className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`rounded p-2 hover:bg-gray-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
              title="Başlık 1"
            >
              <Heading1 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`rounded p-2 hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
              title="Başlık 2"
            >
              <Heading2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`rounded p-2 hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
              title="Liste"
            >
              <List className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`rounded p-2 hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
              title="Numaralı Liste"
            >
              <ListOrdered className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`rounded p-2 hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
              title="Alıntı"
            >
              <Quote className="h-4 w-4" />
            </button>

            <div className="mx-2 w-px bg-gray-300" />

            <button
              type="button"
              onClick={addLink}
              className={`rounded p-2 hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
              title="Link Ekle"
            >
              <Link2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={addImage}
              className="rounded p-2 hover:bg-gray-100"
              title="Resim Ekle"
            >
              <ImageIcon className="h-4 w-4" />
            </button>
          </div>

          <EditorContent editor={editor} />
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h4 className="mb-4 text-sm font-medium text-gray-700">Önizleme</h4>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
