import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import BoxCategorias, { categoriasLoad } from "../components/BoxCategorias";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import BoxProdutos, { produtosLoad } from "../components/BoxProdutos";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonMaterial from '@mui/material/Button';

import { categorysData } from "../config/mock";
import { avaliacao, checkPayment, generatePayment, listCategories, listProducts } from "../services";
import Input from '@mui/joy/Input';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Timer from "../components/Timer";
import { Checkbox, FormControlLabel, IconButton, Link, Rating, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
const Store = ({ navigation }) => {
    const [show, setShow] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [showDesc, setShowDesc] = useState(false);
    const [sendingCheck, setSendingCheck] = useState(false);
    const [loading, setLoading] = useState(true);
    const [categorys, setCategorys] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryPage, setCategoryPage] = useState(1);
    const [textInfos, setTextInfos] = useState('');
    const [email, setEmail] = useState(null);
    const [cupom, setCupom] = useState(null);
    const [estrelas, setEstrelas] = useState(1);
    const [nickname, setNickname] = useState(null);
    const [comentario, setComentario] = useState(null);
    const [confirmEmail, setConfirmEmail] = useState(false);
    const [saleData, setSaleData] = useState({
        sale_id: 0,
        payment_id: 0,
        price: 0,
        product_name: null,
        category_name: null,
        qrcode: null,
        qrcode_base64: null
    });

    const [productSale, setProductSale] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1);

    const [saleApproved, setSaleApproved] = useState(false);
    const [salePaymentId, setSalePaymentId] = useState(null);
    const [tutorial, setTutorial] = useState(null);
    const approved = useRef(null);
    const emailConfirmed = useRef(null);
    emailConfirmed.current = confirmEmail;
    approved.current = saleApproved;  // Update the boxed value on render
    const handleClose = () => setShow(false);
    const handleCloseDesc = () => setShowDesc(false);
    const handleShowDesc = (text) => {
        setTextInfos(text);
        setShowDesc(true);
    };
    const handleShow = (productId, quantity) => {
        setProductSale(productId);
        setProductQuantity(quantity);
        setSaleApproved(false);
        setConfirmEmail(false);
        setShow(true);
    };
    async function generateSale() {
        try {
            const data = { email: email, productId: productSale, amount: productQuantity, cupom: cupom }
            const get = await generatePayment(data);
            setSaleData(get.data);
            if(get.data.cupom == 'valided')
                enqueueSnackbar('Cupom aplicado com sucesso', { variant: 'success', autoHideDuration: 7000 });
            
            if(get.data.cupom == 'invalided')
                enqueueSnackbar('Cupom inválido/esgotado', { variant: 'error', autoHideDuration: 7000 });
                
            setConfirmEmail(true);
        } catch (error) {
            console.log(error);
        }
    }
    function transformSvgToUrl(svgData){
        const svg = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svg);

        return url;
        
    }

    async function sendAvaliacao(){
        const data = {nickname, description: comentario, stars: estrelas, paymentId: saleData.payment_id};

        try {
            const get = await avaliacao(data);
            enqueueSnackbar(get.data.message, { variant: get.data.type, autoHideDuration: 7000 });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const dataPayment = { paymentId: saleData.payment_id };

        async function checkSale() {
            if(sendingCheck)
                return;

            setSendingCheck(true);
            try {
                const get = await checkPayment(dataPayment);
                if (get.data.status == 'approved') {
                    setSaleApproved(true);
                    setSalePaymentId(get.data.saleHash);
                    setTutorial(get.data.tutorial);
                }
                setSendingCheck(false);
            } catch (error) {
                console.log(error);
            }
        }


        const interval = setInterval(function () {
            if (emailConfirmed.current)
                checkSale();

            if (approved.current) {
                clearInterval(interval); // Stop Interval 
            }
        }, 15000); // repeat every 2 second

    }, [confirmEmail])

    useEffect(() =>{

        async function getCategories() {
            try {
                const get = await listCategories({page: 1, pagination_limit: 30});
                setCategorys(get.data.data);
                if(get.data.data.length >0)
                setCategoryPage(get.data.data[0].id);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, [])

    useEffect(() => {
        setLoading(true);
        //setCategorys(categorysData);
        const data = { category: categoryPage };

        async function getProducts() {
            try {
                const get = await listProducts(data);
                setProducts(get.data.data);
 
            } catch (error) {
                console.log(error);
            }
        }

        getProducts();
        setLoading(false);

    }, [categoryPage])
    return ( 
        <>
        <div className="content-home">
           <Header />
           <Grid2 container spacing={2}
           style={{ paddingTop: '3rem' }}> {
           categorys.length <= 0 ? categoriasLoad : categorys.map((value, index) => (
           <BoxCategorias
           data={value}
           index={index}
           active={(categoryPage === value.id)}
           key={index}
           setPage={setCategoryPage}
           />
           ))
           }
           </Grid2>
           <Grid2 container spacing={2}
           style={
           { paddingTop: '1rem' }} > {
           loading ? produtosLoad : products.map((value, index) => (
           <BoxProdutos data={value}
              key={index}
              handleShowDesc={handleShowDesc}
              handleShow={handleShow}
              />
           ))
           }
           </Grid2>
           <Modal className="custom-modal"
              show={showDesc}
              onHide={handleCloseDesc} >
              <Modal.Body >
              <div dangerouslySetInnerHTML={{__html: textInfos}} />
              </Modal.Body>
           </Modal>
           <Modal className="custom-modal"
              show={show}
              onHide={handleClose} >
              <Modal.Body >
                 {
                 saleApproved ?
                 <Grid2 container spacing={2}
                    alignItems="center" >
                    <Grid2 xs={12}
                       sm={12}
                       md={8}>
                       <div style={
                       { fontSize: 12, paddingBottom: 10 }} > O seu pagamento foi recebido! 
        </div>
        <div className="mb-1"
        style={
        { fontSize: 14, fontWeight: 'bold' }} > Aproveite bem o seu Purity Cheat </div>
        <Button onClick={(e) => {
        e.preventDefault();
        window.open('api/get/download/?purchase=' + salePaymentId, '_blank');
        }}
        variant='success'
        size="sm"
        className="col-12 font-weight-bold text-uppercase mb-2" > Baixar chaves de uso </Button>
        <Button onClick={(e) => {
        e.preventDefault();
        window.open(tutorial, '_blank');
        }}
        colorScheme='blue'
        size="sm"
        className="col-12 font-weight-bold text-uppercase mb-2" > Assistir tutorial</Button>
        <div className="col-12 d-flex justify-content-center mb-2"
        style={
        { fontSize: 14, backgroundColor: '#26272E', textTransform: 'uppercase', borderRadius: 5, padding: 5 }} >
        Id de compra :
        <span style={
        { fontWeight: 200, paddingLeft: 3 }} > {salePaymentId} </span>
        <Tooltip title="Copiar">
        <IconButton style={{padding: 0}} onClick={() => navigator.clipboard.writeText(salePaymentId)}>
        <ContentCopyIcon style={{fontSize:18, marginLeft: 4, color: '#FFF'}}  />
        </IconButton>
        </Tooltip></div>
        </Grid2>
        <Grid2 xs={4}>
        <div style={
        { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: 160, height: 160, background: categorys.filter(x => x.id === categoryPage).map(value => ( 
        value.color)), backgroundSize: 'cover' }} >
        <div style={
        { paddingBottom: 30 }} >
        {categorys.filter(x => x.id === categoryPage).map(value => ( 
        <img src={transformSvgToUrl(value.image)} />))}
        </div>
        <Button 
           onClick={(e) => {
        e.preventDefault();
        window.open(categorys.filter(x => x.id === categoryPage).map(value => ( 
        value.link)), '_blank');
        }}
        variant="success"
        className="col-12 text-uppercase font-weight-bold p-2"
        style={
        { position: 'absolute', fontSize: 12, bottom: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 4, borderBottomLeftRadius: 4 }} > Baixar produto </Button>
        </div> 
        </Grid2>

        <Grid2 xs={12}>


        <Grid2 container spacing={2}
                    alignItems="center">
                                    <Grid2 style={{display: 'flex', alignItems: 'center', gap: 10}}>Avalie nosso produto: 
                                    <Rating
  name="simple-controlled"
  sx={{
    '& .MuiRating-iconEmpty': {
        color: '#FFF',
      }
  }}
  defaultValue={1}
  value={estrelas}
  onChange={(event, newValue) => {
    setEstrelas(newValue);
  }}
/></Grid2>
        <Grid2 xs={6}>
        <Input
        onChange={
        (event) => setNickname(event.target.value)}
        placeholder="Nickname"
        sx={
        {
        '& :focus': {
        border: '1px solid transparent'
        },
        '& :hover': {
        color: '#FFF'
        },
        '--Input-focusedHighlight': 'none',
        paddingLeft: 2,
        backgroundColor: '#26272E',
        border: 'none',
        color: '#FFF',
        fontFamily: 'Rubik',
        marginBottom: 2
        }
        } />
        </Grid2>
        <Grid2 xs={6}>
        <Input
        onChange={
        (event) => setComentario(event.target.value)}
        placeholder="Comentário"
        sx={
        {
        '& :focus': {
        border: '1px solid transparent'
        },
        '& :hover': {
        color: '#FFF'
        },
        '--Input-focusedHighlight': 'none',
        paddingLeft: 2,
        backgroundColor: '#26272E',
        border: 'none',
        color: '#FFF',
        fontFamily: 'Rubik',
        marginBottom: 2
        }
        } />
        </Grid2>
        <Grid2 xs={12}>
        <Button
        style={{float:'right'}}
        onClick={
        () => sendAvaliacao()}
       
        variant="success" > Enviar avaliação </Button>
        </Grid2>
        </Grid2>
         
        </Grid2>
        </Grid2> :
        (confirmEmail) ?
        <Grid2 container spacing={2}
           alignItems="center" >
        <Grid2 xs={12}
           sm={12}
           md={8}>
        <div style={
        { fontSize: 12, paddingBottom: 10 }} > Você está comprando... </div>
        <div style={
        { fontSize: 14, fontWeight: 'bold' }} > {saleData.category_name}({saleData.product_name} {productQuantity}
        x) </div>
        <div style={
        { fontSize: 14, paddingBottom: 30 }} > <b> Total a pagar: </b> <span>R${saleData.price}</span > </div>
        <div style={
        { fontSize: 19, color: '#349B23', fontWeight: 'bold' }} > <Timer delayResend={900} /></div>
        <div style={
        { fontSize: 12 }} > Escaneie o QRCode da lateral com o aplicativo do seu banco para realizar o pagamento(Tempo limite de
        <Timer delayResend={900} />)</div>
        </Grid2>
        <Grid2 xs={4}>
        <div style={
        { border: '1px solid #FFF', borderRadius: 5, width: 160, height: 160, background: "url('" + `data:image/jpeg;base64,${saleData.qrcode_base64}` + "')", backgroundSize: 'cover' }} >
        </div>
        </Grid2>
        <Grid2 xs={12}
           sm={12}
           md={12}>
        <Input size="sm"
        value={saleData.qrcode}
        placeholder="QrCode"
        sx={
        {
        '& :focus': {
        border: '1px solid transparent'
        },
        '& :hover': {
        color: '#FFF'
        },
        '--Input-focusedHighlight': 'none',
        '--Input-minHeight': 'auto',
        '--Input-paddingInline': '0px',
        '--Input-decoratorChildHeight': '40px',
        paddingLeft: 2,
        backgroundColor: '#26272E',
        border: 'none',
        color: '#FFF',
        fontFamily: 'Rubik'
        }
        }
        endDecorator={<ButtonMaterial
        startIcon={<ContentCopyIcon />}
        onClick={
        () => navigator.clipboard.writeText(saleData.qrcode)}
        sx={
        {
        fontWeight: '400',
        fontFamily: 'Rubik'
        }
        }
        style={
        { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        variant="contained"
        color="success" > Copiar </ButtonMaterial>}/>
        </Grid2> 
        
        </Grid2>
        
        :
        <>
        <div style={
        { fontWeight: 'bold', fontSize: '16px' }} > Confirme seus dados para continuar a comprar... </div> 
        <div style={
        { fontSize: 12, paddingBottom: 10 }} > Lembre-se de inserir um endereço de e-mail válido,
        afinal sua compra chegará nele! </div>
        <Input
        onChange={
        (event) => setEmail(event.target.value)}
        placeholder="Insira o seu e-mail aqui"
        sx={
        {
        '& :focus': {
        border: '1px solid transparent'
        },
        '& :hover': {
        color: '#FFF'
        },
        '--Input-focusedHighlight': 'none',
        paddingLeft: 2,
        backgroundColor: '#26272E',
        border: 'none',
        color: '#FFF',
        fontFamily: 'Rubik',
        marginBottom: 2
        }
        } />
              <Input
        onChange={
        (event) => setCupom(event.target.value)}
        placeholder="Cupom de desconto (Opcional)"
        sx={
        {
        '& :focus': {
        border: '1px solid transparent'
        },
        '& :hover': {
        color: '#FFF'
        },
        '--Input-focusedHighlight': 'none',
        paddingLeft: 2,
        backgroundColor: '#26272E',
        border: 'none',
        color: '#FFF',
        fontFamily: 'Rubik',
        marginBottom: 2
        }
        } />
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div><Checkbox defaultChecked /> Eu aceito os <Link href="/terms" target="_blank">termos de uso</Link> do site.</div>
        <Button
        
        onClick={
        () => generateSale()}
       
        variant="success" > Confirmar </Button></div>
        </>} 
        </Modal.Body>
        </Modal> 
        </div> 
        </>);
}

export default Store;