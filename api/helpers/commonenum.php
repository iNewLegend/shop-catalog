<?php
/**
 * @file: helpers/commonenum.php
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @todo: 
 */

namespace Helpers;

abstract class CommonEnum
{
    final public function __construct($value)
    {
        $c = new \ReflectionClass($this);

        if(!in_array($value, $c->getConstants())) {
            throw IllegalArgumentException();
        }

        $this->value = $value;
    }

    final public function getValue()
    {
        return $this->value;
    }

    final public function __toString()
    {
        return (string) $this->getValue();
    }
    
}