'use strict';


class Coordinates {
    constructor() {
        this.list_coordinates = {
            x: 0,
            y: 0
        };

        this.rover_coordinates = [];
    }

    set boundary_coordinates(arr) {
        this.list_coordinates = {
            x: arr[0] || 0,
            y: arr[1] || 0,
        };
    }

    get boundary_coordinates() {
        return this.list_coordinates;
    }

    set_boundary_coordinates(x, y) {
        return this.boundary_coordinates = [Math.round(x), Math.round(y)];
    }

    addRover(rover_Instance) {
        let
            roverState = rover_Instance.state;

        if (roverState.x > this.boundary_coordinates.x) {
            return new Error("Rover X position must be inside the plateau borders.");
        }

        if (roverState.y > this.boundary_coordinates.y) {
            return new Error("Rover Y position must be inside the plateau borders.");
        }

        return this.rover_coordinates.push(rover_Instance);
    }

    getCurrentRover() {
        return this.rover_coordinates[this.rover_coordinates.length - 1];
    }

}

module.exports = Coordinates;