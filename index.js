'use strict';

const program = require('commander')
const Coordinates = require("./app/modules/Coordinates");
const RoverPosition = require("./app/modules/RoverPosition");
const inquirer = require("inquirer");

let coordinates = new Coordinates();

function helper_function_interact_with_cli(instruction_statement, warning) {
    let
        data_input = instructions[instruction_statement],
        ques = data_input.question(),
        reply = data_input.reply;

    if (warning) {
        console.log('\n');
        console.log("Warning: ", String(warning));
        console.log('\n');

    }

    helper_function_cli([{
        type: 'input',
        name: 'userInput',
        message: ques,
    }], reply);
}


function helper_function_cli(question, reply_type) {
    inquirer.prompt(question).then(reply_type);
}

let instructions = {
    define_initial_state: {
        question: function () {
            return "Give initial cordinates (X, Y):";
        },

        reply: function (user_input) {
            let
                data = user_input.userInput.trim().split(" ")

            if (data !== null && data !== '' && data.length === 2) {
                let
                    x = data[0],
                    y = data[1],
                    borders_Validation = coordinates.set_boundary_coordinates(x, y);

                if (borders_Validation.message)
                    helper_function_interact_with_cli('define_initial_state', borders_Validation.message);
                else
                    helper_function_interact_with_cli('derive_rover_position');
            }
        }
    },

    derive_rover_position: {
        question: function () {
            return "Directions to Rover (X, Y, Direction)";
        },

        reply: function (user_input) {
            let
                data = user_input.userInput.trim().split(" ")

            if (data !== null && data !== '' && data.length === 3) {
                let
                    x = data[0],
                    y = data[1],
                    direction = data[2],
                    rover = new RoverPosition(),
                    inValidRoverLanding = rover.setPositioningInstructions(x, y, direction);

                rover.plateau = coordinates;

                if (inValidRoverLanding.message) {
                    helper_function_interact_with_cli('derive_rover_position', inValidRoverLanding.message);
                } else {
                    let invalidRoverArea = coordinates.addRover(rover);

                    if (invalidRoverArea.message)
                        return helper_function_interact_with_cli("derive_rover_position", invalidRoverArea.message);

                    helper_function_interact_with_cli('instruct_rover');
                }
            }
        }
    },

    instruct_rover: {
        question: function () {
            return "Instruction to Rover";
        },

        reply: function (user_input) {
            let
                data = user_input.userInput.trim().split(" "),
                instruction = null

            if (data !== null) {
                instruction = data.join("").replace(" ", "");
            }

            if (instruction) {
                let
                    current_Rover = coordinates.getCurrentRover(),
                    invalidInstructions = current_Rover.setInstructions(instruction);

                if (invalidInstructions.message) {
                    helper_function_interact_with_cli('instructionsForCurrentRover', invalidInstructions.message);

                } else {
                    console.log("\n");
                    console.log(current_Rover.displayCurrentPosition());
                    console.log("\n");
                    helper_function_interact_with_cli('derive_rover_position');
                }
            }
        }
    }
}


console.log("\n");
console.log("****** THE MARS ROVER CLI PROGRAM ***** Press (ctrl+c) to Quit the Program ******")
console.log("\n");


program
    .command('run')
    .action(() => helper_function_interact_with_cli('define_initial_state'));

program
    .parse(process.argv);

