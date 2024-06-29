
import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react';
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
                    <FormLabel>E-mail</FormLabel>
                    <Input name="email" type='email' placeholder='E-mail' value={(props.isEdit) ? (props.editRow.email) && props.editRow.email : props.addRow.email} onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Telefone</FormLabel>
                    <Input name="phone" placeholder='Telefone' value={(props.isEdit) ? (props.editRow.phone) && props.editRow.phone : props.addRow.phone} onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Senha {props.isEdit && '(opcional)'}</FormLabel>
                    <Input name="password" placeholder='Senha' type='password' onChange={(props.isEdit) ? props.handleChangeEdit : props.handleChangeAdd} />
                    {props.isEdit &&
                    <FormHelperText>
                        S&oacute; necess&aacute;rio preencher caso queira alterar a senha
                    </FormHelperText>}
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