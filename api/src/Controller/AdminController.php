<?php

namespace API\Controller;

use API\Repository\{
    SalesRepository,
    ManufacturerRepository,
    ModelRepository
};
use API\Repository\Connection;

/**
 * Classe respons�vel por tratar as requisi��es para o endpoint de consulta de equipamentos
 */
class AdminController extends AbstractController
{

    public function login()
    {
        $request = $this->getRequest();


        $email = filter_var($request->getBodyData('email'), FILTER_SANITIZE_EMAIL);
        $password = filter_var($request->getBodyData('password'), FILTER_SANITIZE_STRING);

        $auth = $this->getRepository()->login($email, $password);

        return $this->getResponseService()->jsonResponse($auth);
    }

    public function register()
    {
        $request = $this->getRequest();


        $email = filter_var($request->getBodyData('email'), FILTER_SANITIZE_EMAIL);
        $password = filter_var($request->getBodyData('password'), FILTER_SANITIZE_STRING);
        $phone = filter_var($request->getBodyData('phone'), FILTER_SANITIZE_STRING);
        $name = filter_var($request->getBodyData('name'), FILTER_SANITIZE_STRING);

        if ($email == "" || empty($email) || $password == "" ||empty($password) || empty($phone) || $name == "" || empty($name)) {
            $auth = ["type" => 'error', "message" => "Preencha todos os campos!"];
        } else {
            $auth = $this->getRepository()->register($email, $password, $phone, $name);
            if ($auth['type'] == 'success')
                $auth = $this->getRepository()->login($email, $password);
        }


        return $this->getResponseService()->jsonResponse($auth);
    }

    public function checkLogged()
    {
        return $this->getResponseService()->jsonResponse(['auth' => 'valid']);
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

        $list = $this->getRepository()->list($page, $paginationLimit);
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

    public function edit()
    {
        $request = $this->getRequest();
        $id = filter_var($request->getBodyData('id'), FILTER_SANITIZE_NUMBER_INT);
        $data = $request->getBodyData('data');
        $update['name'] = ['value' => $data['name'], 'param' => \PDO::PARAM_STR];
        $update['email'] = ['value' => $data['email'], 'param' => \PDO::PARAM_STR];
        $update['phone'] = ['value' => $data['phone'], 'param' => \PDO::PARAM_STR];
        if (!empty($data['password']))
            $update['password'] = ['value' => password_hash($data['password'], PASSWORD_ARGON2I), 'param' => \PDO::PARAM_STR];

        if ($this->getRepository()->update($id, $update))
            $return = ['type' => 'success', 'message' => 'Mudanças salvas com sucesso!'];
        else
            $return = ['type' => 'error', 'message' => 'Não foi possivel salvar as alterações'];

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
