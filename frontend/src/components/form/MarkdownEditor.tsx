// Requires custom import - see https://www.npmjs.com/package/react-markdown-editor-lite
// also requires a css file, but we're importing it in frontend/src/styles/globals.css
import dynamic from 'next/dynamic';
import { Form } from 'react-bootstrap';
import { FieldError, UseFormRegisterReturn, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

interface MarkdownEditorProps {
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  label: string;
  error?: FieldError;
}

// Getting MdEditor to work with react-hook-form takes a bit of work
// Some of the props we use are not compatible by default with the MdEditor component
// register: The 'onChange' function from 'register' is not compatible with the 'onChange' function from MdEditor, so we define it explicitly
// controlId: '_md' gets appended to the label, so we override with using 'htmlFor' and 'id'
// Form.Control.Feedback: set the className manually to 'is-invalid' if there is an error
//
export default function MarkdownEditor({ label, register, setValue, watch, error }: MarkdownEditorProps) {
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={register.name + '-input_md'}>{label}</Form.Label>
      <MdEditor
        {...register}
        id={register.name + '-input'}
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
        value={watch(register.name)}
        onChange={({ text }) => setValue(register.name, text, { shouldValidate: true, shouldDirty: true })}
        className={error ? 'is-invalid' : ''}
      />
      <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
    </Form.Group>
  );
}
