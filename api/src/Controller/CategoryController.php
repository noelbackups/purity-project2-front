<?php

namespace API\Controller;

class CategoryController extends AbstractController
{

    public function list()
    {

        $request = $this->getRequest();

        $page = filter_var($request->getBodyData('page'), FILTER_SANITIZE_NUMBER_INT);
        $paginationLimit = filter_var($request->getBodyData('pagination_limit'), FILTER_SANITIZE_NUMBER_INT);

        if (empty($page) || $page < 1)
            $page = 1;

        if (empty($paginationLimit) || $paginationLimit < 1)
            $paginationLimit = 20;

       
        $products = $this->getRepository()->list($page, $paginationLimit);

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

        $page = filter_var($request->getBodyData('page'), FILTER_SANITIZE_NUMBER_INT);
        $paginationLimit = filter_var($request->getBodyData('pagination_limit'), FILTER_SANITIZE_NUMBER_INT);

        if (empty($page) || $page < 1)
            $page = 1;

        if (empty($paginationLimit) || $paginationLimit < 1)
            $paginationLimit = 20;

       
        $products = $this->getRepository()->listAdmin($page, $paginationLimit);

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

    public function register()
    {
        $request = $this->getRequest();


        $name = filter_var($request->getBodyData('name'), FILTER_SANITIZE_EMAIL);
        $status = filter_var($request->getBodyData('status'), FILTER_SANITIZE_STRING);
        $color = filter_var($request->getBodyData('color'), FILTER_SANITIZE_STRING);
        $icon = filter_var($request->getBodyData('icon'), FILTER_SANITIZE_STRING);
        $image = filter_var($request->getBodyData('image'), FILTER_SANITIZE_STRING);
        $link = filter_var($request->getBodyData('link'), FILTER_SANITIZE_STRING);
        $tutorial = filter_var($request->getBodyData('tutorial'), FILTER_SANITIZE_STRING);
        if (empty($name) || empty($status) || empty($color) || empty($icon) || empty($image) || empty($link)) {
            $register = ["type" => 'error', "message" => "Preencha todos os campos!"];
        } else {
            $register = $this->getRepository()->register($name, $status, $color, $icon, $image, $link, $tutorial);
        }


        return $this->getResponseService()->jsonResponse($register);
    }

    public function edit()
    {
        $request = $this->getRequest();
        $id = filter_var($request->getBodyData('id'), FILTER_SANITIZE_NUMBER_INT);
        $data = $request->getBodyData('data');
        $update['name'] = ['value' => $data['name'], 'param' => \PDO::PARAM_STR];
        $update['status'] = ['value' => $data['status'], 'param' => \PDO::PARAM_STR];
        $update['color'] = ['value' => $data['color'], 'param' => \PDO::PARAM_STR];
        $update['icon'] = ['value' => $data['icon'], 'param' => \PDO::PARAM_STR];
        $update['image'] = ['value' => $data['image'], 'param' => \PDO::PARAM_STR];
        $update['link'] = ['value' => $data['link'], 'param' => \PDO::PARAM_STR];
        $update['tutorial'] = ['value' => $data['tutorial'], 'param' => \PDO::PARAM_STR];
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
