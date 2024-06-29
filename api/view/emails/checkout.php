<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,600,700&display=swap" />
    <title>Purity Checkout</title>
</head>
<body style="background: #14151a;padding:2rem 5rem!important;color:#FFF;">
    <div style="background:#484a55c9;border-radius:10px;padding:.25rem 2rem;color:#fff;margin: 1rem;padding-bottom: 2rem;">
        <h2>Compra efetuada</h2>
            <span>Sua compra foi confirmada com sucesso, você comprou <b><?= $categoryName ?> (<?= $productName ?> <?= $amount ?>x)</b>, sua(s) chave(s) de acesso estão logo abaixo, faça o download <a href="<?= $link ?>" target="_blank">clicando aqui</a>.</span>
            <br></br>
            <?php
            $i = 1;
            foreach ($keys as $key => $value) {
                echo $i."º <b>".$value . '</b><br></br>';
            } ?>
            <br></br>
            <div>Download: <a href="<?= $link ?>" target="_blank"><?= $link ?></a></div><br></br>
            <div>Tutorial: <a href="<?= $tutorial ?>" target="_blank"><?= $tutorial ?></a></div><br></br>
    </div>
        <div style="color:#FFF;text-align:center;">© Purity Cheats - 2023<br>
        <small>suporte@purity.com.br | +55 22 3040-2033</small></div>
</body>

</html>