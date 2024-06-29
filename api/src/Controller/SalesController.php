<?php

namespace API\Controller;

use API\Service\Email;
use DateTime;
use Exception;
use MercadoPago;

/**
 * Classe respons�vel por tratar as requisi��es de categorias
 */
class SalesController extends AbstractController
{


    public function checkout()
    {
        $id = 0;
        if (isset($_GET['id']))
            $id = $_GET['id'];

        if (isset($_GET['data.id']))
            $id = $_GET['data.id'];

        if (isset($_POST['data']['id']))
            $id = $_POST['data']['id'];

        if ($id > 0) {
            $getSale = $this->getRepository()->getSaleByPayment($id);

            if ($getSale['status'] !== 'approved' && $getSale['status'] !== 'refunded' && $getSale['status'] !== 'cancelled') {
                $url = 'https://api.mercadopago.com/v1/payments/' . $id;
                $cUrl = $this->cUrlMercadoPago($url);

                if (json_decode($cUrl)->status == "approved") {
                    $getProduct = $this->getRepository()->getProduct($getSale['product_id']);
                    $keys = (array)json_decode($getProduct['keys']);
                    $amount = $getSale['amount'];
                    $sendKey = [];

                    if (count($keys) >= $amount) {

                        for ($i = 0; $i < $amount; $i++) {
                            $sendKey[] = $keys[$i];
                            unset($keys[$i]);
                        }

                        $this->getRepository()->updateProductKey(['id' => $getSale['product_id'], 'keys' => json_encode(array_values($keys))]);
                        $hashProduct = bin2hex(random_bytes(4) . $getSale['id']) . 'f';
                        $this->getRepository()->updateSale(['hash' => $hashProduct, 'status' => 'approved', 'id' => $id, 'keys' => json_encode(array_values($sendKey))]);
                        $mail = new Email();
                        $mail->addAddress($getSale['email']);
                        $content = $this->renderHtml('emails/checkout.php', [
                            'categoryName' => $getProduct['category_name'],
                            'productName' => $getProduct['name'],
                            'amount' => $amount,
                            'keys' => $sendKey
                        ]);
                        $mail->addContent("Compra confirmada: " . $getProduct['category_name'] . " (" . $getProduct['name'] . " " . $amount . "x)", $content);

                        $mail->send();
                    } else {
                        MercadoPago\SDK::setAccessToken($this->getTokenMercadoPago());
                        $refund = new MercadoPago\Refund();
                        $refund->setCustomHeader("Content-Type", "application/json");
                        $refund->setCustomHeader("X-Render-In-Process-Refunds", "true");
                        $refund->amount = $getSale['price'];
                        $refund->payment_id = $id;
                        $refund->save();
                        if ($refund->amount_refunded_to_payer > 0)
                            $this->getRepository()->updateSale(['hash' => 'reembolsado', 'status' => 'refunded', 'id' => $id, 'keys' => json_encode(array_values([]))]);
                    }
                } else if (json_decode($cUrl)->status == "cancelled")
                    $this->getRepository()->updateSale(['hash' => 'expirado', 'status' => 'cancelled', 'id' => $id, 'keys' => json_encode(array_values([]))]);
                else
                    echo json_decode($cUrl)->status;
            }
        }
    }

    public function checkPayment()
    {
        $request = $this->getRequest();

        $payment_id = filter_var($request->getBodyData('paymentId'), FILTER_SANITIZE_NUMBER_INT);
        $getSale = $this->getRepository()->getSaleByPayment($payment_id);
        $getProduct = $this->getRepository()->getProduct($getSale['product_id']);
        if ($payment_id > 0) {
            $return = [
                'id' => $getSale['id'],
                'saleHash' => $getSale['hash'],
                'tutorial' => $getProduct['tutorial'],
                'status' => $getSale['status']
            ];

            return $this->getResponseService()->jsonResponse($return);
        }
    }

    public function sale()
    {
        $request = $this->getRequest();
        $product_id = filter_var($request->getBodyData('productId'), FILTER_SANITIZE_NUMBER_INT);
        $amount = filter_var($request->getBodyData('amount'), FILTER_SANITIZE_NUMBER_INT);
        $email = filter_var($request->getBodyData('email'), FILTER_SANITIZE_STRING);
        date_default_timezone_set('America/Sao_Paulo');
        $getProduct = $this->getRepository()->getProduct($product_id);
        $dateTime = new DateTime();
        $dateTime->modify('+15 minutes');
        $expirePix = $dateTime->format("Y-m-d\TH:i:s.vP");
        $valor = $getProduct['value'] * $amount;

        MercadoPago\SDK::setAccessToken($this->getTokenMercadoPago());


        $payment = new MercadoPago\Payment();
        $payment->description = 'Pagamento Purity';
        $payment->transaction_amount = (float)$valor;
        $payment->payment_method_id = "pix";

        $payment->notification_url   = 'https://purityoficial.com/api/get/checkout/';
        $payment->external_reference = "2";
        $payment->date_of_expiration = $expirePix;
        $payment->payer = array(
            "email" => $email,
            "first_name" => "Purity",
            "address" =>  array(
                "zip_code" => "06233200",
                "street_name" => "Av. das Nações Unidas",
                "street_number" => "3003",
                "neighborhood" => "Bonfim",
                "city" => "Osasco",
                "federal_unit" => "SP"
            )
        );

        $payment->save();
        $data['product_id'] = $product_id;
        $data['amount'] = $amount;
        $data['email'] = $email;
        $data['payment_id'] = $payment->id;
        $data['price'] = $getProduct['value'] * $amount;
        $insert = $this->getRepository()->register($data);

        $return = [
            "category_id" => $getProduct['category_id'],
            "product_name" => $getProduct['name'],
            "category_name" => $getProduct['category_name'],
            "payment_id" => $payment->id,
            "price" => (float)$valor,
            "sale_id" => $insert,
            "qrcode" => $payment->point_of_interaction->transaction_data->qr_code,
            "qrcode_base64" => $payment->point_of_interaction->transaction_data->qr_code_base64
        ];
        return $this->getResponseService()->jsonResponse($return);
    }

    public function getSales()
    {
        $getSales = $this->getRepository()->listHome(1, 30, "WHERE s.`deleted` = '0' AND s.status = 'approved' ORDER BY RAND()");
        foreach($getSales['data'] as &$row){
            $explode = explode('@', $row['email']);
            $row['email'] = $explode[0];
        }
        return $this->getResponseService()->jsonResponse($getSales);
    }

    public function downloadKeys()
    {

        $hash = $_GET['purchase'];

        if ($hash)
            $getSales = $this->getRepository()->getSaleByHash($hash);
        else
            $getSales = false;

        if ($getSales) {
            $path = "./sales/PURITY-" . strtoupper($hash)  . ".txt";
            $keys = (array)json_decode($getSales['keys']);
            $file = fopen($path, "w+") or die("Unable to open file!");
            $setKey = "";
            foreach ($keys as $value) {
                $setKey .= $value . "\n";
            }
            fwrite($file, "Obrigado pela compra, sua(s) chave(s) de uso:\n" . $setKey . "");
            //fclose($file); // do not close the file
            rewind($file);   // reset file pointer so as output file from the beginning

            // `basename` and `filesize` accept path to file, not file descriptor
            header("Content-Disposition: attachment; filename=\"" . basename($path) . "\"");
            header("Content-Type: application/force-download");
            header("Content-Length: " . filesize($path));
            header("Connection: close");
            fpassthru($file);
            //exit();
        }
    }

    public function list()
    {
        $request = $this->getRequest();
        $page = filter_var($request->getBodyData('page'), FILTER_SANITIZE_NUMBER_INT);
        $paginationLimit = filter_var($request->getBodyData('pagination_limit'), FILTER_SANITIZE_NUMBER_INT);

        if (empty($page) || $page < 1)
            $page = 1;

        if (empty($paginationLimit) || $paginationLimit < 1)
            $paginationLimit = 20;

        $list = $this->getRepository()->list($page, $paginationLimit, "ORDER BY s.id DESC");

        foreach ($list['data'] as &$row) {
            $row['keys'] = (array)json_decode($row['keys']);
        }

        $return =
            [
                "current_page" => $page,
                "pagination_limit" => $paginationLimit,
                "total_equipments" => $list['total'],
                "total_pages" => ceil($list['total'] / $paginationLimit),
                "data" => $list['data']
            ];
        return $this->getResponseService()->jsonResponse($return);
    }

    public function delete()
    {
        $request = $this->getRequest();
        $id = filter_var($request->getBodyData('id'), FILTER_SANITIZE_NUMBER_INT);
        $update['deleted'] = ['value' => '1', 'param' => \PDO::PARAM_STR];

        if ($this->getRepository()->update($id, $update))
            $return = ['type' => 'success', 'message' => 'Registro deletado com sucesso!'];
        else
            $return = ['type' => 'error', 'message' => 'Não foi deletar esse registro!'];

        return $this->getResponseService()->jsonResponse($return);
    }
}
