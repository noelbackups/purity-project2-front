<?php

use API\Controller\AdminController;
use API\Controller\CategoryController;
use API\Controller\ProductController;
use API\Controller\SalesController;

return array(
    'admin'  =>  array( // Module
        'auth'    =>  array( // Action
            'controller'    =>  AdminController::class,
            'action'        =>  'login'
        ),
        'listadmins'    =>  array( // Ação
            'controller'    =>  AdminController::class,
            'action'        =>  'list'
        ),
        'editadmin'    =>  array( // Ação
            'controller'    =>  AdminController::class,
            'action'        =>  'edit'
        ),
        'addadmin'    =>  array( // Ação
            'controller'    =>  AdminController::class,
            'action'        =>  'register'
        ),
        'deleteadmin'    =>  array( // Ação
            'controller'    =>  AdminController::class,
            'action'        =>  'delete'
        ),
        'checklogged'    =>  array( // Ação
            'controller'    =>  AdminController::class,
            'action'        =>  'checkLogged'
        ),
        'listsales'    =>  array( // Ação
            'controller'    =>  SalesController::class,
            'action'        =>  'list'
        ),
        'deletesale'    =>  array( // Ação
            'controller'    =>  SalesController::class,
            'action'        =>  'delete'
        ),
        'listproducts'    =>  array( // Ação
            'controller'    =>  ProductController::class,
            'action'        =>  'listAdmin'
        ),
        'editproduct'    =>  array( // Ação
            'controller'    =>  ProductController::class,
            'action'        =>  'edit'
        ),
        'addproduct'    =>  array( // Ação
            'controller'    =>  ProductController::class,
            'action'        =>  'register'
        ),
        'deleteproduct'    =>  array( // Ação
            'controller'    =>  ProductController::class,
            'action'        =>  'delete'
        ),
        'listcategories'    =>  array( // Ação
            'controller'    =>  CategoryController::class,
            'action'        =>  'listAdmin'
        ),
        'editcategories'    =>  array( // Ação
            'controller'    =>  CategoryController::class,
            'action'        =>  'edit'
        ),
        'deletecategories'    =>  array( // Ação
            'controller'    =>  CategoryController::class,
            'action'        =>  'delete'
        ),
        'addcategories'    =>  array( // Ação
            'controller'    =>  CategoryController::class,
            'action'        =>  'register'
        ),
    ),
    'get'  =>  array( // Module
        'categories'    =>  array( // Action
            'controller'    =>  CategoryController::class,
            'action'        =>  'list'
        ),
        'products'    =>  array( // Action
            'controller'    =>  ProductController::class,
            'action'        =>  'list'
        ),
        'sale'    =>  array( // Action
            'controller'    =>  SalesController::class,
            'action'        =>  'sale'
        ),
        'checkout'    =>  array( // Action
            'controller'    =>  SalesController::class,
            'action'        =>  'checkout'
        ),
        'checkpayment'    =>  array( // Action
            'controller'    =>  SalesController::class,
            'action'        =>  'checkPayment'
        ),
        'sales'    =>  array( // Action
            'controller'    =>  SalesController::class,
            'action'        =>  'getSales'
        ),
        'download'    =>  array( // Action
            'controller'    =>  SalesController::class,
            'action'        =>  'downloadKeys'
        ),

    ),
);
