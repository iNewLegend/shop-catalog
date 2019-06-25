<?php
/**
 * @file: helpers/commonpdo.php
 * @author: Leonid Vinikov <czf.leo123@gmail.com>
 * @todo: 
 */

namespace Helpers;

class CommonPdo
{
    /**
     * Commonn \PDO method to get all data within table, with pages formula, etc.
     *
     * @param \PDO $db - PDO Handler
     * @param string $table - Table Name (NO SQL Injection Protection)
     * @param int $page - current page
     * @param int $perPage - max results per page
     * @param int $totalCount - reference
     * 
     * @return array
     * 
     * @todo Add Exceptions on invalid args. extend  like, and exted wheres add operators
     */
    public static function getAll(\PDO $db, string $table, int $page, int $perPage, &$totalCount)
    {
        $offset = $page > 0 ? ceil($page * $perPage) : 0;
        $limit = $perPage;

        /* Total Count */
        $stmt = $db->prepare("SELECT COUNT(*) FROM {$table} ");

        if (!$stmt->execute()) return [];

        $totalCount = $stmt->fetchColumn();

        if (!$totalCount) return [];

        $stmt = $db->prepare("SELECT * FROM {$table} LIMIT :limit OFFSET :offset");

        $stmt->bindValue(':limit', $limit, \PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, \PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        return [];
    }
}