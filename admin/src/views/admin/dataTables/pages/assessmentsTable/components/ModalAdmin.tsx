
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

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
                <FormControl mt={4}>
                    <FormLabel>Imagem (URL)</FormLabel>
                    <Input name="value" placeholder='https://' type='text'
                    value={(props.isEdit) ? (props.editRow.image) && props.editRow.image : props.addRow.image} 
                     onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                </FormControl>
              
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