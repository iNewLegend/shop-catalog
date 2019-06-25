<?php
/**
 * @file: modules/command.php
 * @author Leonid Vinikov <czf.leo123@gmail.com>
 */

namespace Modules;

class Command
{
    /**
     * Command name (aka controller)
     *
     * @var string
     */
    private $name = 'welcome';

    /**
     * Command method (function)
     *
     * @var string
     */
    private $method = 'index';

    /**
     * Command parameters
     *
     * @var array
     */
    private $params = [];

    /**
     * Does we have no parameters
     *
     * @var bool
     */
    private $noParameters = true;

    /**
     * Does we have no sub parameters
     *
     * @var bool
     */
    private $noSubParameters = true;

    /**
     * Function __construct() : Construct Command Module and parse $cmd
     *
     * @param string    $cmd
     * @param array     $params
     */
    public function __construct(string $cmd = '', array $params = [])
    {
        $this->setParameters($params);

        if (!empty($cmd)) {
            $this->parse($cmd);
        }

        $countParameters = count($this->getParameters());

        $this->noParameters = true;
        $this->noSubParameters = true;

        if ($countParameters) {
            $this->noParameters = false;
        }
        
        if ($countParameters > 1) {
            $this->noSubParameters = false;
        }
    }

    /**
     * Function parse() : Parse command from format eg: /name/methods/params
     *
     * @param string $cmd
     *
     * @return void
     */
    public function parse(string $cmd)
    {
        if (!empty($cmd) && is_string($cmd)) {
            // remove forward slash from the start & end

            $cmd = trim($cmd, '/');
            $cmd = rtrim($cmd, '/');

            // removes all illegal URL characters from a string
            $cmd = explode('/', $cmd);

            // set controller
            if (isset($cmd[0]) && !empty($cmd[0])) {
                // only abc for controller name
                $cmd[0] = preg_replace("/[^a-zA-Z]+/", "", $cmd[0]);

                $this->name = $cmd[0];
                unset($cmd[0]);
            }

            // set method
            if (isset($cmd[1])) {
                // only abc and digits for method name
                $cmd[1] = preg_replace("/[^a-zA-Z0-9]+/", "", $cmd[1]);

                $this->method = $cmd[1];
                unset($cmd[1]);
            }

            // set params
            if (!empty($cmd)) {

                foreach ($cmd as $key => $param) {
                    $cmd[$key] = filter_var($param, FILTER_SANITIZE_STRING);
                }

                $this->params = array_values($cmd);
            }
        }
    }

    /**
     * Function getName() : Get command name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Function setName() : Set command name
     *
     * @param string $name
     *
     * @return void
     */
    public function setName(string $name)
    {
        $this->name = $name;
    }

    /**
     * Function getMethod() : Get command method name
     *
     * @return string
     */
    public function getMethod()
    {
        return $this->method;
    }

    /**
     * Function setMethod() : Set method name
     *
     * @param string $method
     *
     * @return void
     */
    public function setMethod(string $method)
    {
        $this->method = $method;
    }

    /**
     * Function getParameters() : Get command parameters
     *
     * @return array
     */
    public function getParameters()
    {
        return $this->params;
    }

    /**
     * Function setParameters() : Set command parameters
     *
     * @param array $params
     *
     * @return void
     */
    public function setParameters($params)
    {
        $this->params = $params;
    }

    /**
     * Function isEmpty() : Check is empty command on $this->cmd
     *
     * @return bool
     */
    public function isEmpty()
    {
        return empty($this->cmd);
    }

    /**
     * Function __toString() : Return's command in JSON format
     *
     * @return string
     */
    public function __toString()
    {
        return json_encode([
            $this->name,
            $this->method,
            $this->params,
        ]);
    }

    /**
     * Function noParameters() : Return's command in JSON format
     *
     * @return bool
     */
    public function noParameters()
    {
        return $this->noParameters;
    }

    /**
     * Function noSubParameters() : Return's command in JSON format
     *
     * @return bool
     */
    public function noSubParameters()
    {
        return $this->noSubParameters;
    }
} // EOF modules/command.php