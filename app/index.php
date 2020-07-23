<?php
require_once 'controller\WorldController.php';
require_once 'model\Human.php';
require_once 'defines.php';

$request = file_get_contents('php://input');
$data_json = json_decode($request);

if ($data_json->days > ONE_DAY) {
    $world = new WorldController(DEFAULT_ROWS, DEFAULT_COLUMNS);
    $world->create();
    $simulation = [];
    for ($day = 0; $day <= $data_json->days; $day++) {
        switch ($day) {
            case FIRST_DAY:
                $world->insertFirstInfected(rand(0, 9), rand(0, 9));
                break;
            default:
                $world->infectNextHuman();
        }
        array_push($simulation, $world->getResultForTheCurrentDay($day));
    }
    echo json_encode($simulation);
} else {
    echo json_encode(['message' => 'The day must be a number greater than 0!']);
    http_response_code(400);
}

