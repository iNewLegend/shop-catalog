<?php
/**
 * @file    : core/controller.php
 * @author  : Leonid Vinikov <czf.leo123@gmail.com>
 */

namespace Core;

class Controller extends \Modules\Loader
{
    const PATH = 'controllers/';
    const NAMESPACE = '\\Controllers\\';

    /**
     *  Function __construct() : Create Controller loader
     *
     * @param string $name
     * @param boolean $autoLoad
     */
    public function __construct(string $name, $autoLoad = false)
    {
        parent::__construct($name,
            self::PATH . $name . '.php',
            self::NAMESPACE . $name,
            $autoLoad
        );
    }

    /**
     * Function methodExists() : Check if the method exist in the controller.
     *
     * @param string $method
     * 
     * @return boolean
     */
    public function methodExists(string $method)
    {
        return method_exists($this->handler, $method);
    }

    /**
     * Function callMethod() : Call a specific method in controller
     *
     * @param string $method
     * @param array $params
     * 
     * @return mixed
     */
    public function callMethod(string $method, $params = [])
    {
        return call_user_func_array([$this->handler, $method], $params);
    }
}