
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, Select, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Image } from '@chakra-ui/react'
import { AiFillCloseCircle } from 'react-icons/ai';
export default function ModalAdmin(props: any) {
    const { isOpen, onOpen, onClose, onToggle} = useDisclosure();
    const [url, setUrl] = useState(null);
    const [images, setImages] = useState([]);
    function addImage() {
        images.push(url);
        setUrl('');
        const data ={ target: {name: 'new_images', value: images}};
        (props.isEdit) ? props.handleChangeEdit(data) : props.handleChangeAdd(data);
    }

    function removeImage(index: any) {
        const newArray = images;
        setImages([...newArray.slice(0, index), ...newArray.slice(index, newArray.length-1)]);
        const data ={ target: {name: 'new_images', value: [...newArray.slice(0, index), ...newArray.slice(index, newArray.length-1)]}};
        (props.isEdit) ? props.handleChangeEdit(data) : props.handleChangeAdd(data);
    }

    function closeModal() {
        props.setOpenModal(false);
        onClose();
    }

    useEffect(()=>{
        (props.isEdit) ? setImages(props.editRow.new_images) : setImages([]);
        if(props.openModal)
            onToggle();
     }, [props.openModal]);

    return(
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{(props.isEdit) ? 'Editando' : 'Adicionando'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl>
                    <FormLabel>Nome</FormLabel>
                    <Input
                        name="name"
                        placeholder='Nome produto'
                        value={(props.isEdit) ? (props.editRow.name) && props.editRow.name : props.addRow.name}
                        onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Categoria</FormLabel>
                    <Select name="category_id" 
                    placeholder='Selecione uma categoria' 
                    value={(props.isEdit) ? (props.editRow.category_id) && props.editRow.category_id : props.addRow.category_id}
                    onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd}>
                           {props.categories.map((value: any) => (
                        <option value={value.id}>{value.name}</option>
                        ))}

                    </Select>
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Preço</FormLabel>
                    <Input name="value" placeholder='0.00' type='number'
                    value={(props.isEdit) ? (props.editRow.value) && props.editRow.value : props.addRow.value} 
                     onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                </FormControl>
                <div style={{display: 'flex', alignItems: 'flex-end', gap: 10}}>
                <FormControl mt={4}>
                    <FormLabel>Imagem (URL)</FormLabel>
                    <Input name="image" placeholder='https://' type='text'
                     value={url} 
                     onChange={(event) => setUrl(event.target.value)} />
                    
                </FormControl>
                <Button onClick={addImage} colorScheme='blue'>Adicionar</Button>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 3,  marginTop: 4}}>
                {images.map((value, i)=>(
                <div style={{position: 'relative', background: "rgb(65 23 110 / 70%)", borderRadius: 3, padding: 4}}>
                    <div onClick={() => removeImage(i)} style={{position: 'absolute', top: '-3px', right: '-2px', cursor: 'pointer'}}><AiFillCloseCircle style={{color: '#ea5454', zIndex: 999}}/></div>
                    <Image
                    boxSize='55px'
                    objectFit='cover'
                    src={value}
                    alt='Image'
                  />
                </div>
                ))}
                </div>
                <FormControl mt={4}>
                    <FormLabel>Chaves</FormLabel>
                    <Textarea
                    rows={5}
                    name="keys"
                    value={(props.isEdit) ? (props.editRow.keys) && props.editRow.keys : props.addRow.keys} 
                    onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd}
                    placeholder='Escreva...'
                    size='sm'
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Descrição</FormLabel>
                    <CKEditor
                    editor={ ClassicEditor }
                    data={(props.isEdit) ? (props.editRow.description) && props.editRow.description : props.addRow.description}
                    onReady={ editor => {
                        const data = editor.getData();
                        const eSend = {target: {name: 'description', value: data}};
                        (props.isEdit) ? props.handleChangeEdit(eSend) : props.handleChangeAdd(eSend)
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        const eSend = {target: {name: 'description', value: data}};
                        (props.isEdit) ? props.handleChangeEdit(eSend) : props.handleChangeAdd(eSend)
                    } }
                    
                />
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button variant='ghost' mr={3} onClick={closeModal}>
                    Fechar
                </Button>
                <Button onClick={() => (props.isEdit) ? props.confirmChanges() : props.confirmAdd()} colorScheme='blue'>{(props.isEdit) ? 'Salvar' : 'Adicionar'}</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    );
}