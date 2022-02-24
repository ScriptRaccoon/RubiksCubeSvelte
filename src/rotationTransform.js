export const rotationTransform = {};

rotationTransform.front = {
    "+": function (coord) {
        return {
            x: -coord.y,
            y: coord.x,
            z: coord.z,
        };
    },
    "-": function (coord) {
        return {
            x: coord.y,
            y: -coord.x,
            z: coord.z,
        };
    },
};

rotationTransform.top = {
    "-": function (coord) {
        return {
            x: -coord.z,
            y: coord.y,
            z: coord.x,
        };
    },
    "+": function (coord) {
        return {
            x: coord.z,
            y: coord.y,
            z: -coord.x,
        };
    },
};

rotationTransform.left = {
    "+": function (coord) {
        return {
            x: coord.x,
            y: -coord.z,
            z: coord.y,
        };
    },
    "-": function (coord) {
        return {
            x: coord.x,
            y: coord.z,
            z: -coord.y,
        };
    },
};

rotationTransform.back = rotationTransform.front;
rotationTransform.standing = rotationTransform.front;

rotationTransform.down = rotationTransform.top;
rotationTransform.equator = rotationTransform.top;

rotationTransform.right = rotationTransform.left;
rotationTransform.middle = rotationTransform.left;
