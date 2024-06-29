
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function ModalAdmin(props: any) {
    const { isOpen, onOpen, onClose, onToggle} = useDisclosure();

    function closeModal() {
        props.setOpenModal(false);
        onClose();
    }

    useEffect(()=>{
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
                    <FormLabel>Cupom</FormLabel>
                    <Input
                        name="name"
                        placeholder='Nome do cupom'
                        value={(props.isEdit) ? (props.editRow.name) && props.editRow.name : props.addRow.name}
                        onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Categoria</FormLabel>
                    <Select name="products" 
                    placeholder='Selecione uma categoria' 
                    value={(props.isEdit) ? (props.editRow.products) && props.editRow.products : props.addRow.products}
                    onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd}>
                           <option value="0">Todos</option>
                           {props.categories.map((value: any) => (
                        <option value={value.id}>{value.name}</option>
                        ))}

                    </Select>
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Desconto (%)</FormLabel>
                    <Input name="discount" placeholder='5' type='number'
                    value={(props.isEdit) ? (props.editRow.discount) && props.editRow.discount : props.addRow.discount} 
                     onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Limite</FormLabel>
                    <Input name="limit" placeholder='100' type='number'
                    value={(props.isEdit) ? (props.editRow.limit) && props.editRow.limit : props.addRow.limit} 
                     onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
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