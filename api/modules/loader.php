<?php
/**
 * @file    : modules/loader.php
 * @author  : Leonid Vinikov <czf.leo123@gmail.com>
 * @todo    :
 */

namespace Modules;

class Loader
{
    /**
     * The handler of the object
     *
     * @var object
     */
    protected $handler;

    /**
     * Object name
     *
     * @var string
     */
    private $name;
    
    /**
     * Object path
     *
     * @var string
     */
    private $path;

    /**
     * Is the object avialable
     *
     * @var boolean
     */
    private $avialable = false;

    /**
     * Is the object Loaded
     *
     * @var boolean
     */
    private $loaded = false;

    /**
     * Function __construct() : Create Loader
     *
     * @param string $name
     * @param string $path
     * @param string $fullName
     * @param boolean $autoLoad
     */
    public function __construct(string $name, string $path, string $fullName, bool $autoLoad = false)
    {
        $this->name = $name;
        $this->path = $path;
        $this->fullName = $fullName;

        if (file_exists($this->path)) {
            $this->avialable = true;
        }
    
        if ($autoLoad) {
            $this->load();
        }
    }

    /**
     * Function load() : Load's file
     *
     * @return void
     */
    public function load()
    {
        if ($this->isAvialable() && require_once($this->path)) {
            $this->handler = new $this->fullName;

            if ($this->handler) {
                return $this->loaded = true;
            }
        }

        return false;
    }

    /**
     * Function isAvialable() : is object avialable
     *
     * @return boolean
     */
    public function isAvialable()
    {
        return $this->avialable;
    }
    
    /**
     * Function isLoaded() : is object loaded
     *
     * @return boolean
     */
    public function isLoaded()
    {
        return $this->loaded;
    }
}