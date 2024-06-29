// Chakra imports

import { Button } from '@chakra-ui/react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// Custom components
import Card from 'components/card/Card';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { editTerms, getTerms } from 'services';
export default function TermsBox(props: { [x: string]: any }) {
	const { ...rest } = props;
    const { enqueueSnackbar } = useSnackbar();

    const [text, setText] = useState(null);
	async function confirmChanges() {
		try {
			const data = { text: text }
			const post = await editTerms(data);
			const { type, message } = post.data;
			enqueueSnackbar(message, { variant: type, autoHideDuration: 7000 });

		} catch (e) {
			console.log(e)
		}
	}

    useEffect(()=>{
        async function loadTerms() {
            try {
                const post = await getTerms();
                setText(post.data.text);
                
            } catch (e) {
                console.log(e)
            }
        }
        loadTerms();
    }, [])
	return (
		<Card className="terms" flexDirection='column' w='100%' mb='0px' {...rest}>
			 <CKEditor
                    data={text}
                    editor={ ClassicEditor }
                    onReady={ editor => {
                        const data = editor.getData();
                        setText(data);
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setText(data);
                    } }
                    
                />
                <Card justifyContent='right' alignItems="center">
                <Button onClick={confirmChanges} colorScheme='green'>Salvar</Button>
                </Card>
                
		</Card>
	);
}
