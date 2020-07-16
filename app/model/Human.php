<?php

class Human {
    /** @var int $id */
    private $id;
    /** @var string $status */
    private $status;
    /** @var int $days */
    private $days;

    public function __construct($x_coordinate, $y_coordinate, $status = UNINFECTED_HUMAN, $days = DAYS_OF_A_HEALTHY_PERSON) {
        $this->id = "$x_coordinate" . "$y_coordinate";
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
