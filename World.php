<?php

class World {
    private $rows;
    private $columns;
    private $humanity = [];

    public function __construct(int $rows, int $cols) {
        $this->rows = $rows;
        $this->columns = $cols;
    }

    public function create() {
        for ($row = 0; $row < $this->rows; $row++) {
            for ($column = 0; $column < $this->columns; $column++) {
                $this->humanity[$row][$column] = new Human($row, $column);
            }
        }
    }

    public function insertFirstInfected(int $x_coordinate, int $y_coordinate) {
        /* @var Human $human */
        $infected_human_id = "$x_coordinate" . "$y_coordinate";
        $human = $this->findHuman($infected_human_id);
        if ($human !== null) {
            $human->setDays($human->getDays() + 1);
            $human->setStatus('infected');
        }
    }

    public function infectNextHuman() {
        /* @var Human $human */
        foreach ($this->humanity as $humans) {
            foreach ($humans as $human) {
                if ($human->getDays() == 3) {
                    $human->setStatus('cured');
                }
                if ($human->getStatus() == 'infected' && $human->getDays() > 0) {
                    $infected_human_id = str_split($human->getId());
                    $x = $infected_human_id[0];
                    $y = $infected_human_id[1];
                    $right = strval($x . ($y + 1));
                    $top = strval(($x - 1) . $y);
                    $left = strval($x . ($y - 1));
                    $bottom = strval(($x + 1) . $y);

                    if ($this->findHuman($right) !== null && $this->findHuman($right)->getStatus() == 'uninfected') {
                        $right_human = $this->findHuman($right);
                        $right_human->setStatus('infected');
                    } elseif ($this->findHuman($top) !== null && $this->findHuman($top)->getStatus() == 'uninfected') {
                        $top_human = $this->findHuman($top);
                        $top_human->setStatus('infected');
                    } elseif ($this->findHuman($left) !== null && $this->findHuman($left)->getStatus() == 'uninfected') {
                        $left_human = $this->findHuman($left);
                        $left_human->setStatus('infected');
                    } elseif ($this->findHuman($bottom) !== null && $this->findHuman($bottom)->getStatus() == 'uninfected') {
                        $bottom_human = $this->findHuman($bottom);
                        $bottom_human->setStatus('infected');
                    }
                }
            }
        }
        $this->increaseDays();
    }

    private function findHuman($id) {
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

    private function increaseDays () {
        /* @var Human $human */
        foreach ($this->humanity as $humans) {
            foreach ($humans as $human) {
                if ($human->getStatus() == 'infected') {
                    $human->setDays($human->getDays() + 1);
                }
            }
        }
    }

    public function view(int $day) {
        $humanity_response = [];
        foreach ($this->humanity as $row => $people_in_row) {
            $humanity_response[$day][$row] = [];
            foreach ($people_in_row as $human) {
                /* @var Human $human */
                switch ($human->getStatus()) {
                    case 'uninfected':
                        array_push($humanity_response[$day][$row], 'uninfected');
                        break;
                    case 'infected':
                        array_push($humanity_response[$day][$row], 'infected');
                        break;
                    case 'cured':
                        array_push($humanity_response[$day][$row], 'cured');
                        break;
                }
            }
        }
        return $humanity_response[$day];
    }
}
