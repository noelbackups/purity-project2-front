
import { Button, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody} from '@chakra-ui/react';
import { useRef, useEffect} from 'react';

export default function AlertDelete(props: any) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const closeAlert = (confirmDelete: boolean) => {
        props.setOpenAlert(false);
        onClose();
        if(confirmDelete)
            props.delete();
    }

    useEffect(()=>{
        if(props.openAlert)
            onOpen();
 }, [props.openAlert]);

    return (
      <>  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => closeAlert(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Excluir
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Tem certeza? Voc&ecirc; n&atilde;o pode desfazer esta a&ccedil;&atilde;o depois.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={()=> closeAlert(false)}>
                  Cancelar
                </Button>
                <Button colorScheme='red' onClick={()=> closeAlert(true)} ml={3}>
                  Excluir
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }