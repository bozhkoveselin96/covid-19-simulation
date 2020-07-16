<?php


class World {
    /** @var int $rows */
    private $rows;
    /** @var int $columns */
    private $columns;
    /** @var array $humanity */
    private $humanity = [];
    /** @var array $humanity_response */
    public $humanity_response = [];

    public function __construct(int $rows, int $cols) {
        $this->rows = $rows;
        $this->columns = $cols;
    }

    public function create(): void {
        for ($row = 0; $row < $this->rows; $row++) {
            for ($column = 0; $column < $this->columns; $column++) {
                $this->humanity[$row][$column] = new Human($row, $column);
            }
        }
    }

    public function insertFirstInfected(int $x_coordinate, int $y_coordinate): void {
        /* @var Human $human */
        $infected_human_id = "$x_coordinate" . "$y_coordinate";
        $human = $this->findHuman($infected_human_id);
        if ($human !== null) {
            $human->setDays($human->getDays() + ONE_DAY);
            $human->setStatus(INFECTED_HUMAN);
        }
    }

    public function infectNextHuman(): void {
        /* @var Human $human */
        foreach ($this->humanity as $humans) {
            foreach ($humans as $human) {
                if ($human->getDays() == NECESSARY_DAYS_FOR_RECOVERY) {
                    $human->setStatus(CURED_HUMAN);
                }
                if ($human->getStatus() == INFECTED_HUMAN && $human->getDays() > DAYS_OF_A_HEALTHY_PERSON) {
                    $infected_human_id = str_split($human->getId());
                    // Actually x and y are the coordinates of the infected person in the matrix(the world).
                    $x = $infected_human_id[0];
                    $y = $infected_human_id[1];
                    // On the right, top, left, and bottom are actually
                    // the identification numbers of the person on the right,
                    // the person on top, the person on the left,
                    // and the person below the infected person
                    $right = strval($x . ($y + 1));
                    $over = strval(($x - 1) . $y);
                    $left = strval($x . ($y - 1));
                    $under = strval(($x + 1) . $y);

                    if ($this->findHuman($right) !== null && $this->findHuman($right)->getStatus() == UNINFECTED_HUMAN) {
                        $right_human = $this->findHuman($right);
                        $right_human->setStatus(INFECTED_HUMAN);
                    } elseif ($this->findHuman($over) !== null && $this->findHuman($over)->getStatus() == UNINFECTED_HUMAN) {
                        $top_human = $this->findHuman($over);
                        $top_human->setStatus(INFECTED_HUMAN);
                    } elseif ($this->findHuman($left) !== null && $this->findHuman($left)->getStatus() == UNINFECTED_HUMAN) {
                        $left_human = $this->findHuman($left);
                        $left_human->setStatus(INFECTED_HUMAN);
                    } elseif ($this->findHuman($under) !== null && $this->findHuman($under)->getStatus() == UNINFECTED_HUMAN) {
                        $bottom_human = $this->findHuman($under);
                        $bottom_human->setStatus(INFECTED_HUMAN);
                    }
                }
            }
        }
        $this->increaseDays();
    }

    private function findHuman(string $id) {
        /* @var Human $human */
        foreach ($this->humanity as $humans) {
            foreach ($humans as $human) {
                if (strcmp($human->getId(), $id) == 0) {
                    return $human;
                }
            }
        }
        return null;
    }

    private function increaseDays (): void {
        /* @var Human $human */
        foreach ($this->humanity as $humans) {
            foreach ($humans as $human) {
                if ($human->getStatus() == INFECTED_HUMAN) {
                    $human->setDays($human->getDays() + ONE_DAY);
                }
            }
        }
    }

    public function getResultForTheCurrentDay(int $day): array {
        foreach ($this->humanity as $row => $people_in_row) {
            $this->humanity_response[$day][$row] = [];
            foreach ($people_in_row as $human) {
                /* @var Human $human */
                switch ($human->getStatus()) {
                    case UNINFECTED_HUMAN:
                        array_push($this->humanity_response[$day][$row], UNINFECTED_HUMAN);
                        break;
                    case INFECTED_HUMAN:
                        array_push($this->humanity_response[$day][$row], INFECTED_HUMAN);
                        break;
                    case CURED_HUMAN:
                        array_push($this->humanity_response[$day][$row], CURED_HUMAN);
                        break;
                }
            }
        }
        return $this->humanity_response[$day];
    }
}
