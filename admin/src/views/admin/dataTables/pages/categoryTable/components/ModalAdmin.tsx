
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, FormHelperText, Select } from '@chakra-ui/react';
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
                        placeholder='Nome'
                        value={(props.isEdit) ? (props.editRow.name) && props.editRow.name : props.addRow.name}
                        onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd}
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Ordem</FormLabel>
                    <Input name="ordem" placeholder='#FFF' value={(props.isEdit) ? (props.editRow.ordem) && props.editRow.ordem : props.addRow.ordem} onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Status</FormLabel>
                    <Select 
                    name="status" 
                    placeholder='Selecione um status' 
                    value={(props.isEdit) ? (props.editRow.status) && props.editRow.status : props.addRow.status}
                    onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd}>
                        <option value='1'>Ativo</option>
                        <option value='0'>Desativado</option>
                    </Select>
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Cor (Hexadecimal)</FormLabel>
                    <Input name="color" placeholder='#FFF' value={(props.isEdit) ? (props.editRow.color) && props.editRow.color : props.addRow.color} onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Icon (25x25)</FormLabel>
                    <Input name="icon" 
                    value={(props.isEdit) ? (props.editRow.icon) && props.editRow.icon : props.addRow.icon}
                    placeholder='<svg...' type='text' onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Imagem (100x70)</FormLabel>
                    <Input name="image" 
                    value={(props.isEdit) ? (props.editRow.image) && props.editRow.image : props.addRow.image}
                    placeholder='<svg...' type='text' onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Link download</FormLabel>
                    <Input name="link" 
                    value={(props.isEdit) ? (props.editRow.link) && props.editRow.link : props.addRow.link}
                    placeholder='https://' type='text' onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Link tutorial</FormLabel>
                    <Input name="tutorial" 
                    value={(props.isEdit) ? (props.editRow.tutorial) && props.editRow.tutorial : props.addRow.tutorial}
                    placeholder='https://' type='text' onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
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