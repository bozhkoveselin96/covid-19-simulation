<?php

class Human {
    private $id;
    private $status;
    private $days;

    public function __construct($xCoordinate, $yCoordinate, $status = UNINFECTED_HUMAN, $days = DAYS_OF_A_HEALTHY_PERSON) {
        $this->id = "$xCoordinate" . "$yCoordinate";
        $this->status = $status;
        $this->days = $days;
    }

    public function getId(): string {
        return $this->id;
    }

    public function getStatus(): string {
        return $this->status;
    }

    public function setStatus(string $status): void {
        $this->status = $status;
    }

    public function getDays(): int {
        return $this->days;
    }

    public function setDays(int $days): void {
        $this->days = $days;
    }
}
