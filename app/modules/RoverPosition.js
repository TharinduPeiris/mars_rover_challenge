'use strict';

const positions = {
    'N': {left: 'W', right: 'E'},
    'W': {left: 'S', right: 'N'},
    'S': {left: 'E', right: 'W'},
    'E': {left: 'N', right: 'S'},
};

class RoverPosition {

    constructor(Plateau) {
        this.current_position = {
            x: 0,
            y: 0,
            direction: 'N'
        };
    }

    get state() {
        return this.current_position;
    }

    set plateau(plateau) {
        this.plateauReference = plateau;
    }

    get plateau() {
        return this.plateauReference;
    }

    setPositioningInstructions(x, y, direction) {

        return this.current_position = {
            x: Math.round(x),
            y: Math.round(y),
            direction: String(direction).toLocaleUpperCase(),

        };
    }

    setInstructions(d) {
        var parseInstructions = this.parseInstructions(d);

        parseInstructions.forEach(instruction => {
            this.dealWithInstruction(instruction);
        });

        return true;
    }

    dealWithInstruction(instruction) {
        switch (instruction) {
            case 'L':
                this.turnLeft();
                break;
            case 'R':
                this.turnRight();
                break;
            case 'M':
                this.move();
                break;
        }
    }

    getCurrentDirection() {
        return this.current_position.direction;
    }

    turnLeft() {
        this.setCurrentDirection(this.getPositionWhenTurnLeft());
    }

    turnRight() {
        this.setCurrentDirection(this.getPositionWhenTurnRight());
    }


    move() {
        let
            current_Direction = this.getCurrentDirection();

        switch (current_Direction) {
            case 'N':
                this.moveY(1);
                break;
            case 'S':
                this.moveY(-1);
                break;
            case 'E':
                this.moveX(1);
                break;
            case 'W':
                this.moveX(-1);
                break;
        }
    }

    moveX(a) {
        this.current_position.x += (parseInt(a) || 0);

        if (this.current_position.x < 0)
            this.current_position.x = 0;

        if (this.current_position.x > this.plateau.boundary_coordinates.x)
            this.current_position.x = this.plateau.boundary_coordinates.x;
    }

    moveY(a) {
        this.current_position.y += (parseInt(a) || 0);

        if (this.current_position.y < 0)
            this.current_position.y = 0;

        if (this.current_position.y > this.plateau.boundary_coordinates.y)
            this.current_position.y = this.plateau.boundary_coordinates.y;
    }

    setCurrentDirection(direction) {
        this.current_position.direction = direction;
    }

    getPositionWhenTurnLeft() {
        return positions[this.getCurrentDirection()].left;
    }

    getPositionWhenTurnRight() {
        return positions[this.getCurrentDirection()].right;
    }

    parseInstructions(d) {
        return (String(d || "").toLocaleUpperCase().match(/[a-zA-Z]+/gi) || []).join("").match(/L|R|M/gi) || [];
    }

    displayCurrentPosition() {
        let
            txt = " Rover is now in the position of: ";

        for (let z in this.current_position)
            txt += " " + this.current_position[z];

        return txt;
    }

};

module.exports = RoverPosition;
