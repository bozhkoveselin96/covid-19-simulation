<?php
require_once "World.php";
require_once "Human.php";

$request = file_get_contents('php://input');
$data_json = json_decode($request);

$world = new World(10,10);
$world->create();
$simulation = [];
for ($day = 0; $day <= $data_json->days; $day++) {
    switch ($day) {
        case 1:
            $world->insertFirstInfected(rand(0,9),rand(0,9));
            break;
        default:
            $world->infectNextHuman();
    }
    array_push($simulation, $world->view($day));
}
echo json_encode($simulation);


