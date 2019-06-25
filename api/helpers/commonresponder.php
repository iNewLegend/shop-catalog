<?php
/**
 * @file: helpers/commonresponder.php
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @todo:  
 */

namespace Helpers;

class CommonError extends CommonEnum
{
    const __default = SELF::system_error;

    const item_not_found = 'item_not_found';

    const system_error = 'system_error';
}

class CommonResponder
{
    public static function addPagination(array &$target, int $currentPage, int $perPage, int $count)
    {
        $target['pagination']['current'] = $currentPage;
        $target['pagination']['total'] = $count;
        $target['pagination']['pages'] = ceil($count / $perPage);
        $target['pagination']['perPage'] = $perPage;
    }

    public static function errorMessage($message)
    {
        if ($message instanceof \Helpers\CommonError) {
            $message = $message->getValue();
        }

        return json_encode(['error' => true, 'message' => $message]);
    }
}