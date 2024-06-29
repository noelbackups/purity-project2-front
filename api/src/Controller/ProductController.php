<?php

namespace API\Controller;

class ProductController extends AbstractController
{

    public function list()
    {

        $request = $this->getRequest();

        $category = filter_var($request->getBodyData('category'), FILTER_SANITIZE_NUMBER_INT);
        $page = filter_var($request->getBodyData('page'), FILTER_SANITIZE_NUMBER_INT);
        $paginationLimit = filter_var($request->getBodyData('pagination_limit'), FILTER_SANITIZE_NUMBER_INT);

        if (empty($page) || $page < 1)
            $page = 1;

        if (empty($paginationLimit) || $paginationLimit < 1)
            $paginationLimit = 20;


        $products = $this->getRepository()->list($page, $paginationLimit, $category);

        $return =
            [
                "current_page" => $page,
                "pagination_limit" => $paginationLimit,
                "total_equipments" => $products['total'],
                "total_pages" => ceil($products['total'] / $paginationLimit),
                "data" => $products['data']
            ];


        return $this->getResponseService()->jsonResponse($return);
    }

    public function listAdmin()
    {

        $request = $this->getRequest();

        $category = filter_var($request->getBodyData('category'), FILTER_SANITIZE_NUMBER_INT);
        $page = filter_var($request->getBodyData('page'), FILTER_SANITIZE_NUMBER_INT);
        $paginationLimit = filter_var($request->getBodyData('pagination_limit'), FILTER_SANITIZE_NUMBER_INT);

        if (empty($page) || $page < 1)
            $page = 1;

        if (empty($paginationLimit) || $paginationLimit < 1)
            $paginationLimit = 20;


        $products = $this->getRepository()->listAdmin($page, $paginationLimit, $category);
        foreach ($products['data'] as &$value) {
            $value['keys'] = json_decode($value['keys']);
        }
        $return =
            [
                "current_page" => $page,
                "pagination_limit" => $paginationLimit,
                "total_equipments" => $products['total'],
                "total_pages" => ceil($products['total'] / $paginationLimit),
                "data" => $products['data']
            ];


        return $this->getResponseService()->jsonResponse($return);
    }

    public function edit()
    {
        $request = $this->getRequest();
        $id = filter_var($request->getBodyData('id'), FILTER_SANITIZE_NUMBER_INT);
        $data = $request->getBodyData('data');
        $keys = json_encode($data['keys']);
        $keys = explode('\n', $keys);
        $saveKeys = [];
        foreach($keys as $row){
            $saveKeys[] = str_replace('"', '', $row);
        }
        $update['name'] = ['value' => $data['name'], 'param' => \PDO::PARAM_STR];
        $update['category_id'] = ['value' => $data['category_id'], 'param' => \PDO::PARAM_INT];
        $update['value'] = ['value' => $data['value'], 'param' => \PDO::PARAM_STR];
        $update['image'] = ['value' => $data['image'], 'param' => \PDO::PARAM_STR];
        $update['keys'] = ['value' => json_encode(array_values($saveKeys)), 'param' => \PDO::PARAM_STR];
        if (!empty($data['password']))
            $update['password'] = ['value' => password_hash($data['password'], PASSWORD_ARGON2I), 'param' => \PDO::PARAM_STR];

        if ($this->getRepository()->update($id, $update))
            $return = ['type' => 'success', 'message' => 'Mudanças salvas com sucesso!'];
        else
            $return = ['type' => 'error', 'message' => 'Não foi possivel salvar as alterações'];

        return $this->getResponseService()->jsonResponse($return);
    }

    public function register()
    {
        $request = $this->getRequest();


        $name = filter_var($request->getBodyData('name'), FILTER_SANITIZE_EMAIL);
        $category_id = filter_var($request->getBodyData('category_id'), FILTER_SANITIZE_STRING);
        $value = filter_var($request->getBodyData('value'), FILTER_SANITIZE_STRING);
        $image = filter_var($request->getBodyData('image'), FILTER_SANITIZE_STRING);
        $keys = filter_var($request->getBodyData('keys'), FILTER_SANITIZE_STRING);
        $keys = json_encode($keys);
        $keys = explode('\n', $keys);
        $saveKeys = [];
        foreach($keys as $row){
            $saveKeys[] = str_replace('"', '', $row);
        }
        if (empty($name) || empty($category_id) || empty($value) || empty($image)) {
            $register = ["type" => 'error', "message" => "Preencha todos os campos!"];
        } else {
            $register = $this->getRepository()->register($name, $category_id, $value, json_encode(array_values($saveKeys)), $image);
           
        }


        return $this->getResponseService()->jsonResponse($register);
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
