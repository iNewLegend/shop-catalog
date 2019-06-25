<?php

namespace Core;

class Core
{
    /**
     * The controller instance
     *
     * @var \Core\Controller
     */
    private $controller;

    /**
     * Command to run core
     *
     * @var \Modules\Command
     */
    private $command;

    /**
     * Function __construct() : Create new core
     *
     * @param \Modules\Command
     * 
     * @throws Exception
     */
    public function __construct(\Modules\Command $cmd)
    {
        $this->command = $cmd;
        $this->controller = new \Core\Controller($cmd->getName());
    }

    /**
     * Function execute() Execute's command
     *
     * @return mixed
     */
    public function execute()
    {
        $cmd = $this->command;

        if (!$this->controller->isAvialable()) {
            throw new \Exception("controller: `{$cmd->getName()}` not found, in: " . __FILE__ . '(' . __LINE__ . ')');
        }

        if ($this->controller->load()) {
            if (!$this->controller->methodExists($cmd->getMethod())) {
                throw new \Exception("method: `{$cmd->getMethod()}` not found in controller: `{$cmd->getName()}` in: " . __FILE__ . '(' . __LINE__ . ')');
            }

            $r = $this->controller->callMethod($cmd->getMethod(), $cmd->getParameters());

            // json or echo 
            if (is_array($r) || is_object($r)) {
                header('Content-Type: application/json');

                echo json_encode($r);
            } else {
                echo $r;
            }

            return $r;
        }

        return false;
    }
}
