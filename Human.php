<?php

class Human {
    private $id;
    private $status;
    private $days;

    public function __construct($x_coordinate, $y_coordinate, $status = 'uninfected', $days = 0) {
        $this->id = "$x_coordinate" . "$y_coordinate";
        $this->status = $status;
        $this->days = $days;
    }

    public function getId(): string {
        return $this->id;
    }

    public function getStatus() {
        return $this->status;
    }

    public function setStatus(string $status) {
        $this->status = $status;
    }

    public function getDays(): int {
        return $this->days;
    }

    public function setDays(int $days) {
        $this->days = $days;
    }
}
